'use client';

import { useState } from 'react';
import { useEcommerce } from '../../../lib/hooks/useEcommerce';
import { Platform, ImportOptions } from '../../../lib/services/ecommerce/types';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function ProductSync() {
  const { importProducts, getConnectedPlatforms, loading } = useEcommerce();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | ''>('');
  const [syncOptions, setSyncOptions] = useState<ImportOptions>({
    includeImages: true,
    includeVariants: true,
    includeInventory: true,
    syncInventory: false
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [syncResults, setSyncResults] = useState<{
    platform: Platform;
    imported: number;
    updated: number;
    errors: Array<{ productId: string; error: string }>;
  } | null>(null);

  const connectedPlatforms = getConnectedPlatforms();

  const handleSync = async () => {
    if (!selectedPlatform) return;

    setError(null);
    setSuccess(null);
    setSyncResults(null);

    try {
      const result = await importProducts(selectedPlatform, syncOptions);
      
      setSyncResults({
        platform: selectedPlatform,
        imported: result.productsImported,
        updated: result.productsUpdated,
        errors: result.errors || []
      });

      setSuccess(`Successfully synced products from ${selectedPlatform}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync products');
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Products</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
            >
              <option value="">Select a platform</option>
              {connectedPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sync Options */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-gray-900">Sync Options</h4>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={syncOptions.includeImages}
                  onChange={(e) =>
                    setSyncOptions((prev) => ({
                      ...prev,
                      includeImages: e.target.checked
                    }))
                  }
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Include Images</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={syncOptions.includeVariants}
                  onChange={(e) =>
                    setSyncOptions((prev) => ({
                      ...prev,
                      includeVariants: e.target.checked
                    }))
                  }
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Include Variants</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={syncOptions.includeInventory}
                  onChange={(e) =>
                    setSyncOptions((prev) => ({
                      ...prev,
                      includeInventory: e.target.checked
                    }))
                  }
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Include Inventory</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={syncOptions.syncInventory}
                  onChange={(e) =>
                    setSyncOptions((prev) => ({
                      ...prev,
                      syncInventory: e.target.checked
                    }))
                  }
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Keep Inventory in Sync</span>
              </label>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="p-4 bg-red-50 rounded-md flex items-center">
              <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 rounded-md flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}

          {/* Sync Button */}
          <button
            onClick={handleSync}
            disabled={!selectedPlatform || loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <ArrowPathIcon className="animate-spin h-5 w-5" />
            ) : (
              'Start Sync'
            )}
          </button>
        </div>
      </div>

      {/* Sync Results */}
      {syncResults && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Results</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Platform</p>
                <p className="text-lg font-medium capitalize">{syncResults.platform}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Products Imported</p>
                <p className="text-lg font-medium">{syncResults.imported}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Products Updated</p>
                <p className="text-lg font-medium">{syncResults.updated}</p>
              </div>
            </div>

            {syncResults.errors.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Errors</h4>
                <div className="space-y-2">
                  {syncResults.errors.map((error, index) => (
                    <div
                      key={index}
                      className="bg-red-50 p-3 rounded-md text-sm text-red-700"
                    >
                      <p className="font-medium">Product ID: {error.productId}</p>
                      <p>{error.error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 