import { Platform, PlatformCredentials, ImportOptions, SyncResult, InventoryUpdate } from './types';
import { ShopifyService } from './shopify';
import { WooCommerceService } from './woocommerce';

export class EcommerceManager {
  private platforms: Map<Platform, any> = new Map();

  async connectPlatform(platform: Platform, credentials: PlatformCredentials): Promise<void> {
    try {
      let service;
      
      switch (platform) {
        case 'shopify':
          service = new ShopifyService(credentials);
          break;
        case 'woocommerce':
          service = new WooCommerceService(credentials);
          break;
        // Add other platform implementations here
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      this.platforms.set(platform, service);
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      throw error;
    }
  }

  async importProducts(platform: Platform, options: ImportOptions = {}): Promise<SyncResult> {
    const service = this.platforms.get(platform);
    if (!service) {
      throw new Error(`Platform ${platform} not connected`);
    }

    try {
      return await service.importProducts(options);
    } catch (error) {
      console.error(`Error importing products from ${platform}:`, error);
      throw error;
    }
  }

  async updateInventory(platform: Platform, updates: InventoryUpdate[]): Promise<void> {
    const service = this.platforms.get(platform);
    if (!service) {
      throw new Error(`Platform ${platform} not connected`);
    }

    try {
      await service.updateInventory(updates);
    } catch (error) {
      console.error(`Error updating inventory on ${platform}:`, error);
      throw error;
    }
  }

  async syncInventory(platform: Platform, productId: string): Promise<void> {
    const service = this.platforms.get(platform);
    if (!service) {
      throw new Error(`Platform ${platform} not connected`);
    }

    try {
      await service.syncInventory(productId);
    } catch (error) {
      console.error(`Error syncing inventory from ${platform}:`, error);
      throw error;
    }
  }

  async syncAllPlatforms(productId: string): Promise<void> {
    const promises = Array.from(this.platforms.entries()).map(([platform, service]) =>
      service.syncInventory(productId).catch(error => {
        console.error(`Error syncing inventory from ${platform}:`, error);
        return null;
      })
    );

    await Promise.all(promises);
  }

  async handleWebhook(platform: Platform, topic: string, data: any): Promise<void> {
    const service = this.platforms.get(platform);
    if (!service) {
      throw new Error(`Platform ${platform} not connected`);
    }

    try {
      await service.webhookHandler(topic, data);
    } catch (error) {
      console.error(`Error handling webhook from ${platform}:`, error);
      throw error;
    }
  }

  getConnectedPlatforms(): Platform[] {
    return Array.from(this.platforms.keys());
  }

  isPlatformConnected(platform: Platform): boolean {
    return this.platforms.has(platform);
  }

  disconnectPlatform(platform: Platform): void {
    this.platforms.delete(platform);
  }
} 