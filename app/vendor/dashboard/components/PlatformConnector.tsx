'use client';

import { useState } from 'react';
import { useEcommerce } from '../../../lib/hooks/useEcommerce';
import { Platform, PlatformCredentials } from '../../../lib/services/ecommerce/types';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const platformFields = {
  shopify: [
    { name: 'accessToken', label: 'Access Token', type: 'password' },
    { name: 'apiKey', label: 'API Key', type: 'password' },
    { name: 'storeName', label: 'Store Name', type: 'text' }
  ],
  woocommerce: [
    { name: 'apiKey', label: 'Consumer Key', type: 'password' },
    { name: 'apiSecret', label: 'Consumer Secret', type: 'password' },
    { name: 'storeUrl', label: 'Store URL', type: 'url' }
  ],
  bigcommerce: [
    { name: 'accessToken', label: 'Access Token', type: 'password' },
    { name: 'storeHash', label: 'Store Hash', type: 'text' }
  ],
  square: [
    { name: 'accessToken', label: 'Access Token', type: 'password' },
    { name: 'locationId', label: 'Location ID', type: 'text' }
  ]
};

export default function PlatformConnector() {
  const { connectPlatform, disconnectPlatform, isPlatformConnected, loading } = useEcommerce();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('shopify');
  const [credentials, setCredentials] = useState<PlatformCredentials>({
    apiKey: '',
    apiSecret: '',
    accessToken: '',
    storeUrl: '',
    storeName: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);
    setSuccess(null);
    
    try {
      await connectPlatform(selectedPlatform, credentials);
      setSuccess(`Successfully connected to ${selectedPlatform}`);
      setCredentials({
        apiKey: '',
        apiSecret: '',
        accessToken: '',
        storeUrl: '',
        storeName: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect platform');
    }
  };

  const handleDisconnect = (platform: Platform) => {
    try {
      disconnectPlatform(platform);
      setSuccess(`Successfully disconnected ${platform}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect platform');
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Connect New Platform</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.keys(platformFields).map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform as Platform)}
              className={`
                p-4 rounded-lg border-2 flex items-center justify-between
                ${selectedPlatform === platform
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center">
                <img
                  src={`/images/${platform}-logo.png`}
                  alt={`${platform} logo`}
                  className="h-8 w-8 mr-3"
                />
                <span className="font-medium capitalize">{platform}</span>
              </div>
              {isPlatformConnected(platform as Platform) && (
                <span className="text-green-600 text-sm">Connected</span>
              )}
            </button>
          ))}
        </div>

        {/* Credentials Form */}
        <div className="space-y-4">
          {platformFields[selectedPlatform].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={credentials[field.name as keyof PlatformCredentials] || ''}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    [field.name]: e.target.value
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
              />
            </div>
          ))}
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

        {/* Connect Button */}
        <div className="mt-6">
          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Connecting...' : 'Connect Platform'}
          </button>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Platforms</h3>
        <div className="space-y-4">
          {Object.keys(platformFields).map((platform) => (
            isPlatformConnected(platform as Platform) && (
              <div
                key={platform}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={`/images/${platform}-logo.png`}
                    alt={`${platform} logo`}
                    className="h-8 w-8 mr-3"
                  />
                  <div>
                    <p className="font-medium capitalize">{platform}</p>
                    <p className="text-sm text-gray-500">Connected</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(platform as Platform)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Disconnect
                </button>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
} 