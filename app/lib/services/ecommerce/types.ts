export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  title: string;
  options?: Record<string, string>;
  barcode?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  attributes: {
    [key: string]: string; // e.g., { color: 'red', size: 'large' }
  };
  inventory_policy: 'continue' | 'deny'; // Whether to allow sales when out of stock
  low_stock_alert: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  vendor: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants: ProductVariant[];
  categories: string[];
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  stockAlert: number; // Threshold for low stock notification
  barcode?: string;
  weight?: number;
  weightUnit?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  vendor_id: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryUpdate {
  variantId: string;
  quantity: number;
  locationId?: string;
}

export interface InventoryLocation {
  id: string;
  name: string;
  address: string;
  type: 'warehouse' | 'store' | 'fulfillment_center';
  is_default: boolean;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  variant_id: string;
  from_location_id?: string;
  to_location_id: string;
  quantity: number;
  type: 'receive' | 'transfer' | 'adjust' | 'sale';
  reference: string; // Order ID, Transfer ID, etc.
  notes?: string;
  created_at: string;
  created_by: string;
}

export interface StockCount {
  id: string;
  location_id: string;
  status: 'draft' | 'in_progress' | 'completed';
  started_at: string;
  completed_at?: string;
  counted_by: string;
  items: {
    product_id: string;
    variant_id: string;
    expected_quantity: number;
    actual_quantity: number;
    notes?: string;
  }[];
}

export type Platform = 'shopify' | 'woocommerce' | 'magento' | 'custom';

export interface PlatformCredentials {
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  storeUrl?: string;
  storeName?: string;
  storeHash?: string;
  locationId?: string;
}

export interface ImportOptions {
  includeImages: boolean;
  includeVariants: boolean;
  includeInventory: boolean;
  syncInventory: boolean;
}

export interface ImportResult {
  productsImported: number;
  productsUpdated: number;
  errors: Array<{
    productId: string;
    error: string;
  }>;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  position: number;
} 