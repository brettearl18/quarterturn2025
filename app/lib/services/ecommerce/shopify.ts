import { Shopify } from '@shopify/shopify-api';
import { Product, ProductVariant, PlatformCredentials, ImportOptions, SyncResult, InventoryUpdate } from './types';

export class ShopifyService {
  private client: Shopify;
  private accessToken: string;
  private shop: string;

  constructor(credentials: PlatformCredentials) {
    if (!credentials.accessToken || !credentials.storeName) {
      throw new Error('Shopify credentials must include accessToken and storeName');
    }

    this.accessToken = credentials.accessToken;
    this.shop = `${credentials.storeName}.myshopify.com`;
    
    this.client = new Shopify({
      apiKey: credentials.apiKey,
      apiSecretKey: credentials.apiSecret || '',
      scopes: ['read_products', 'write_products', 'read_inventory', 'write_inventory'],
      hostName: this.shop,
      apiVersion: '2024-01',
      isEmbeddedApp: false,
    });
  }

  private async getShopifyClient() {
    const session = new Shopify.Session.CustomSession(this.shop, this.accessToken);
    return new Shopify.Clients.Rest(this.shop, this.accessToken);
  }

  async importProducts(options: ImportOptions = {}): Promise<SyncResult> {
    const client = await this.getShopifyClient();
    const result: SyncResult = {
      success: true,
      productsImported: 0,
      productsUpdated: 0,
      errors: []
    };

    try {
      const response = await client.get({
        path: 'products',
        query: {
          limit: 250,
          status: 'active'
        }
      });

      const products = response.body.products;
      
      for (const shopifyProduct of products) {
        try {
          const product: Product = {
            id: shopifyProduct.id.toString(),
            title: shopifyProduct.title,
            description: shopifyProduct.body_html,
            vendor: shopifyProduct.vendor,
            price: parseFloat(shopifyProduct.variants[0].price),
            compareAtPrice: shopifyProduct.variants[0].compare_at_price 
              ? parseFloat(shopifyProduct.variants[0].compare_at_price)
              : undefined,
            images: shopifyProduct.images.map(img => img.src),
            variants: shopifyProduct.variants.map(variant => ({
              id: variant.id.toString(),
              sku: variant.sku,
              price: parseFloat(variant.price),
              compareAtPrice: variant.compare_at_price 
                ? parseFloat(variant.compare_at_price)
                : undefined,
              inventory: variant.inventory_quantity,
              title: variant.title,
              options: variant.option_values
            })),
            categories: shopifyProduct.product_type ? [shopifyProduct.product_type] : [],
            tags: shopifyProduct.tags.split(',').map(tag => tag.trim()),
            weight: shopifyProduct.variants[0].weight,
            weightUnit: shopifyProduct.variants[0].weight_unit,
          };

          // Here you would save the product to your database
          // await saveProductToDatabase(product);
          
          result.productsImported++;
        } catch (error) {
          result.errors?.push({
            productId: shopifyProduct.id,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    } catch (error) {
      result.success = false;
      throw error;
    }

    return result;
  }

  async updateInventory(updates: InventoryUpdate[]): Promise<void> {
    const client = await this.getShopifyClient();
    
    for (const update of updates) {
      try {
        await client.post({
          path: `inventory_levels/set`,
          data: {
            inventory_item_id: update.variantId,
            location_id: update.locationId,
            available: update.quantity
          }
        });
      } catch (error) {
        console.error(`Error updating inventory for variant ${update.variantId}:`, error);
        throw error;
      }
    }
  }

  async syncInventory(productId: string): Promise<void> {
    const client = await this.getShopifyClient();
    
    try {
      const response = await client.get({
        path: `products/${productId}`,
        query: { fields: 'variants' }
      });

      const variants = response.body.product.variants;
      
      // Here you would update your local database with the new inventory levels
      for (const variant of variants) {
        // await updateLocalInventory({
        //   variantId: variant.id,
        //   quantity: variant.inventory_quantity
        // });
      }
    } catch (error) {
      console.error(`Error syncing inventory for product ${productId}:`, error);
      throw error;
    }
  }

  async webhookHandler(topic: string, data: any): Promise<void> {
    switch (topic) {
      case 'products/create':
      case 'products/update':
        // Handle product updates
        break;
      case 'inventory_levels/update':
        // Handle inventory updates
        break;
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }
  }
} 