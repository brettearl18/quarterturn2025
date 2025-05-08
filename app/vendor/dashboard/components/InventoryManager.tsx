'use client';

import { useState, useEffect } from 'react';
import { useEcommerce } from '../../../lib/hooks/useEcommerce';
import { Platform, Product, ProductVariant } from '../../../lib/services/ecommerce/types';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface InventoryUpdate {
  productId: string;
  variantId: string;
  platform: Platform;
  quantity: number;
}

export default function InventoryManager() {
  const { getConnectedPlatforms, syncInventory, updateInventory, loading } = useEcommerce();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | ''>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<InventoryUpdate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const connectedPlatforms = getConnectedPlatforms();

  // In a real app, this would fetch products from your database
  useEffect(() => {
    // Mock data for demonstration
    setProducts([
      {
        id: '1',
        title: 'Professional Olympic Barbell',
        description: 'Competition grade barbell',
        vendor: 'QuarterTurn Pro',
        price: 299.99,
        images: ['barbell.jpg'],
        variants: [
          {
            id: '1-1',
            sku: 'BAR-001',
            price: 299.99,
            inventory: 15,
            title: 'Standard'
          },
          {
            id: '1-2',
            sku: 'BAR-002',
            price: 349.99,
            inventory: 8,
            title: 'Chrome'
          }
        ],
        categories: ['Strength'],
        tags: ['barbell', 'olympic']
      }
    ]);
  }, []);

  const handleQuantityChange = (
    productId: string,
    variantId: string,
    platform: Platform,
    newQuantity: number
  ) => {
    setPendingUpdates((prev) => {
      const existingUpdateIndex = prev.findIndex(
        (update) =>
          update.productId === productId &&
          update.variantId === variantId &&
          update.platform === platform
      );

      if (existingUpdateIndex >= 0) {
        const newUpdates = [...prev];
        newUpdates[existingUpdateIndex].quantity = newQuantity;
        return newUpdates;
      }

      return [
        ...prev,
        {
          productId,
          variantId,
          platform,
          quantity: newQuantity
        }
      ];
    });
  };

  const handleSync = async () => {
    if (!selectedPlatform) return;

    setError(null);
    setSuccess(null);

    try {
      // In a real app, you would sync with the selected platform
      await Promise.all(
        products.map((product) =>
          syncInventory(selectedPlatform, product.id)
        )
      );
      setSuccess('Successfully synced inventory');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync inventory');
    }
  };

  const handleUpdateInventory = async () => {
    setError(null);
    setSuccess(null);

    try {
      // Group updates by platform
      const updatesByPlatform = pendingUpdates.reduce((acc, update) => {
        if (!acc[update.platform]) {
          acc[update.platform] = [];
        }
        acc[update.platform].push({
          variantId: update.variantId,
          quantity: update.quantity
        });
        return acc;
      }, {} as Record<Platform, { variantId: string; quantity: number }[]>);

      // Update each platform
      await Promise.all(
        Object.entries(updatesByPlatform).map(([platform, updates]) =>
          updateInventory(platform as Platform, updates)
        )
      );

      setPendingUpdates([]);
      setSuccess('Successfully updated inventory');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update inventory');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.variants.some((variant) =>
      variant.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                placeholder="Search by name or SKU"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sync Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
            >
              <option value="">Select a platform</option>
              {connectedPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSync}
              disabled={!selectedPlatform || loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5" />
              ) : (
                'Sync Inventory'
              )}
            </button>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center">
            <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 rounded-md flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-green-700">{success}</span>
          </div>
        )}
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variant
                </th>
                {connectedPlatforms.map((platform) => (
                  <th
                    key={platform}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {platform}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) =>
                product.variants.map((variant) => (
                  <tr key={`${product.id}-${variant.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {variant.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {variant.title}
                    </td>
                    {connectedPlatforms.map((platform) => (
                      <td
                        key={`${variant.id}-${platform}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        <input
                          type="number"
                          min="0"
                          value={
                            pendingUpdates.find(
                              (update) =>
                                update.productId === product.id &&
                                update.variantId === variant.id &&
                                update.platform === platform
                            )?.quantity ?? variant.inventory
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              variant.id,
                              platform,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Button */}
      {pendingUpdates.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleUpdateInventory}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {loading ? (
              <ArrowPathIcon className="animate-spin h-5 w-5" />
            ) : (
              `Update ${pendingUpdates.length} Changes`
            )}
          </button>
        </div>
      )}
    </div>
  );
} 