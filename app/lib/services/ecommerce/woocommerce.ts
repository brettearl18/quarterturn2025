import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Product, ProductVariant, PlatformCredentials, ImportOptions, SyncResult, InventoryUpdate } from './types';

export class WooCommerceService {
  private client: WooCommerceRestApi;

  constructor(credentials: PlatformCredentials) {
    if (!credentials.storeUrl || !credentials.apiKey || !credentials.apiSecret) {
      throw new Error('WooCommerce credentials must include storeUrl, apiKey, and apiSecret');
    }

    this.client = new WooCommerceRestApi({
      url: credentials.storeUrl,
      consumerKey: credentials.apiKey,
      consumerSecret: credentials.apiSecret,
      version: 'wc/v3'
    });
  }

  async importProducts(options: ImportOptions = {}): Promise<SyncResult> {
    const result: SyncResult = {
      success: true,
      productsImported: 0,
      productsUpdated: 0,
      errors: []
    };

    try {
      const response = await this.client.get('products', {
        per_page: 100,
        status: 'publish'
      });

      const products = response.data;
      
      for (const wooProduct of products) {
        try {
          const product: Product = {
            id: wooProduct.id.toString(),
            title: wooProduct.name,
            description: wooProduct.description,
            vendor: wooProduct.attributes.find(attr => attr.name === 'Brand')?.options[0] || '',
            price: parseFloat(wooProduct.price),
            compareAtPrice: wooProduct.regular_price 
              ? parseFloat(wooProduct.regular_price)
              : undefined,
            images: wooProduct.images.map(img => img.src),
            variants: wooProduct.variations.length > 0
              ? await this.getVariants(wooProduct.id)
              : [{
                  id: wooProduct.id.toString(),
                  sku: wooProduct.sku,
                  price: parseFloat(wooProduct.price),
                  compareAtPrice: wooProduct.regular_price 
                    ? parseFloat(wooProduct.regular_price)
                    : undefined,
                  inventory: wooProduct.stock_quantity || 0,
                  title: wooProduct.name
                }],
            categories: wooProduct.categories.map(cat => cat.name),
            tags: wooProduct.tags.map(tag => tag.name),
            weight: wooProduct.weight ? parseFloat(wooProduct.weight) : undefined,
            dimensions: wooProduct.dimensions.length
              ? {
                  length: parseFloat(wooProduct.dimensions.length),
                  width: parseFloat(wooProduct.dimensions.width),
                  height: parseFloat(wooProduct.dimensions.height),
                  unit: 'cm'
                }
              : undefined
          };

          // Here you would save the product to your database
          // await saveProductToDatabase(product);
          
          result.productsImported++;
        } catch (error) {
          result.errors?.push({
            productId: wooProduct.id,
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

  private async getVariants(productId: number): Promise<ProductVariant[]> {
    const response = await this.client.get(`products/${productId}/variations`);
    return response.data.map((variant: any) => ({
      id: variant.id.toString(),
      sku: variant.sku,
      price: parseFloat(variant.price),
      compareAtPrice: variant.regular_price 
        ? parseFloat(variant.regular_price)
        : undefined,
      inventory: variant.stock_quantity || 0,
      title: variant.attributes.map((attr: any) => attr.option).join(' / '),
      options: variant.attributes.reduce((acc: any, attr: any) => ({
        ...acc,
        [attr.name]: attr.option
      }), {})
    }));
  }

  async updateInventory(updates: InventoryUpdate[]): Promise<void> {
    for (const update of updates) {
      try {
        await this.client.put(`products/${update.variantId}`, {
          stock_quantity: update.quantity
        });
      } catch (error) {
        console.error(`Error updating inventory for variant ${update.variantId}:`, error);
        throw error;
      }
    }
  }

  async syncInventory(productId: string): Promise<void> {
    try {
      const response = await this.client.get(`products/${productId}`);
      const product = response.data;

      if (product.variations.length > 0) {
        const variants = await this.getVariants(parseInt(productId));
        
        // Here you would update your local database with the new inventory levels
        for (const variant of variants) {
          // await updateLocalInventory({
          //   variantId: variant.id,
          //   quantity: variant.inventory
          // });
        }
      } else {
        // await updateLocalInventory({
        //   variantId: productId,
        //   quantity: product.stock_quantity || 0
        // });
      }
    } catch (error) {
      console.error(`Error syncing inventory for product ${productId}:`, error);
      throw error;
    }
  }

  async webhookHandler(topic: string, data: any): Promise<void> {
    switch (topic) {
      case 'product.created':
      case 'product.updated':
        // Handle product updates
        break;
      case 'product.deleted':
        // Handle product deletion
        break;
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }
  }
} 