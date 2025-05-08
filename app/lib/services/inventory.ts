import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import {
  Product,
  ProductVariant,
  InventoryLocation,
  InventoryMovement,
  StockCount
} from './ecommerce/types';

export class InventoryService {
  static async getProductStock(productId: string, variantId: string, locationId?: string) {
    const q = query(
      collection(db, 'inventory'),
      where('product_id', '==', productId),
      where('variant_id', '==', variantId)
    );

    if (locationId) {
      q.where('location_id', '==', locationId);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async updateStock(
    productId: string,
    variantId: string,
    locationId: string,
    quantity: number,
    type: 'set' | 'adjust' = 'set'
  ) {
    const batch = writeBatch(db);

    // Update inventory level
    const inventoryRef = doc(db, 'inventory', `${productId}-${variantId}-${locationId}`);
    const inventoryDoc = await getDoc(inventoryRef);

    if (type === 'adjust') {
      const currentQuantity = inventoryDoc.exists() ? inventoryDoc.data().quantity : 0;
      quantity = currentQuantity + quantity;
    }

    batch.set(inventoryRef, {
      product_id: productId,
      variant_id: variantId,
      location_id: locationId,
      quantity,
      updated_at: serverTimestamp()
    }, { merge: true });

    // Create inventory movement record
    const movementRef = collection(db, 'inventory_movements');
    batch.set(doc(movementRef), {
      product_id: productId,
      variant_id: variantId,
      to_location_id: locationId,
      quantity,
      type: 'adjust',
      reference: 'manual_update',
      created_at: serverTimestamp()
    });

    await batch.commit();
  }

  static async bulkUpdateStock(updates: {
    sku: string;
    quantity: number;
    location: string;
    notes?: string;
  }[]) {
    const batch = writeBatch(db);
    const errors: any[] = [];

    for (const update of updates) {
      try {
        // Find product variant by SKU
        const variantQuery = query(
          collection(db, 'product_variants'),
          where('sku', '==', update.sku)
        );
        const variantSnapshot = await getDocs(variantQuery);
        
        if (variantSnapshot.empty) {
          errors.push({ sku: update.sku, error: 'SKU not found' });
          continue;
        }

        const variant = variantSnapshot.docs[0];
        const variantData = variant.data();

        // Update inventory level
        const inventoryRef = doc(
          db,
          'inventory',
          `${variantData.product_id}-${variant.id}-${update.location}`
        );

        batch.set(inventoryRef, {
          product_id: variantData.product_id,
          variant_id: variant.id,
          location_id: update.location,
          quantity: update.quantity,
          updated_at: serverTimestamp()
        }, { merge: true });

        // Create inventory movement record
        const movementRef = collection(db, 'inventory_movements');
        batch.set(doc(movementRef), {
          product_id: variantData.product_id,
          variant_id: variant.id,
          to_location_id: update.location,
          quantity: update.quantity,
          type: 'adjust',
          reference: 'bulk_update',
          notes: update.notes,
          created_at: serverTimestamp()
        });
      } catch (error) {
        errors.push({ sku: update.sku, error: error.message });
      }
    }

    if (errors.length === updates.length) {
      throw new Error('All updates failed');
    }

    await batch.commit();
    return errors;
  }

  static async createStockCount(locationId: string, userId: string) {
    // Get all products in location
    const inventoryQuery = query(
      collection(db, 'inventory'),
      where('location_id', '==', locationId)
    );
    const inventory = await getDocs(inventoryQuery);

    const items = inventory.docs.map(doc => ({
      product_id: doc.data().product_id,
      variant_id: doc.data().variant_id,
      expected_quantity: doc.data().quantity,
      actual_quantity: 0
    }));

    return await addDoc(collection(db, 'stock_counts'), {
      location_id: locationId,
      status: 'draft',
      started_at: serverTimestamp(),
      counted_by: userId,
      items
    });
  }

  static async updateStockCount(countId: string, items: {
    product_id: string;
    variant_id: string;
    actual_quantity: number;
    notes?: string;
  }[]) {
    const countRef = doc(db, 'stock_counts', countId);
    const count = await getDoc(countRef);

    if (!count.exists()) {
      throw new Error('Stock count not found');
    }

    const countData = count.data();
    if (countData.status === 'completed') {
      throw new Error('Cannot update completed stock count');
    }

    await updateDoc(countRef, {
      items: items,
      status: 'in_progress',
      updated_at: serverTimestamp()
    });
  }

  static async completeStockCount(countId: string) {
    const batch = writeBatch(db);
    const countRef = doc(db, 'stock_counts', countId);
    const count = await getDoc(countRef);

    if (!count.exists()) {
      throw new Error('Stock count not found');
    }

    const countData = count.data();
    if (countData.status === 'completed') {
      throw new Error('Stock count already completed');
    }

    // Update inventory levels based on count
    for (const item of countData.items) {
      const inventoryRef = doc(
        db,
        'inventory',
        `${item.product_id}-${item.variant_id}-${countData.location_id}`
      );

      batch.set(inventoryRef, {
        product_id: item.product_id,
        variant_id: item.variant_id,
        location_id: countData.location_id,
        quantity: item.actual_quantity,
        updated_at: serverTimestamp()
      }, { merge: true });

      // Create inventory movement record
      const movementRef = collection(db, 'inventory_movements');
      const adjustment = item.actual_quantity - item.expected_quantity;

      if (adjustment !== 0) {
        batch.set(doc(movementRef), {
          product_id: item.product_id,
          variant_id: item.variant_id,
          to_location_id: countData.location_id,
          quantity: adjustment,
          type: 'adjust',
          reference: `stock_count_${countId}`,
          notes: item.notes,
          created_at: serverTimestamp()
        });
      }
    }

    // Mark stock count as completed
    batch.update(countRef, {
      status: 'completed',
      completed_at: serverTimestamp()
    });

    await batch.commit();
  }
} 