'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface SyncEvent {
  id: string;
  timestamp: Date;
  platform: string;
  type: 'sync' | 'update';
  status: 'success' | 'error';
  details: {
    productsAffected?: number;
    variantsUpdated?: number;
    errorMessage?: string;
    changes?: Array<{
      sku: string;
      oldQuantity: number;
      newQuantity: number;
    }>;
  };
}

// Mock data - in a real app, this would come from your backend
const mockSyncEvents: SyncEvent[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    platform: 'Shopify',
    type: 'sync',
    status: 'success',
    details: {
      productsAffected: 15,
      variantsUpdated: 25
    }
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    platform: 'WooCommerce',
    type: 'update',
    status: 'success',
    details: {
      productsAffected: 1,
      variantsUpdated: 2,
      changes: [
        { sku: 'BAR-001', oldQuantity: 10, newQuantity: 15 },
        { sku: 'BAR-002', oldQuantity: 5, newQuantity: 8 }
      ]
    }
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    platform: 'Shopify',
    type: 'update',
    status: 'error',
    details: {
      errorMessage: 'API rate limit exceeded'
    }
  }
];

export default function SyncHistory() {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [syncEvents] = useState<SyncEvent[]>(mockSyncEvents);

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const getStatusIcon = (status: 'success' | 'error') => {
    if (status === 'success') {
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    }
    return <XCircleIcon className="h-5 w-5 text-red-500" />;
  };

  const getEventTypeIcon = (type: 'sync' | 'update') => {
    if (type === 'sync') {
      return <ArrowPathIcon className="h-5 w-5 text-gray-500" />;
    }
    return <ArrowPathIcon className="h-5 w-5 text-gray-500 transform rotate-90" />;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Sync History</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your recent inventory synchronization activities
          </p>
        </div>

        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {syncEvents.map((event) => (
              <li key={event.id} className="hover:bg-gray-50">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getEventTypeIcon(event.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {event.platform} {event.type === 'sync' ? 'Sync' : 'Update'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(event.timestamp, 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {getStatusIcon(event.status)}
                      <button
                        onClick={() => toggleEventExpansion(event.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {expandedEvents.has(event.id) ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedEvents.has(event.id) && (
                    <div className="mt-4 bg-gray-50 rounded-md p-4">
                      {event.status === 'success' ? (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            Products affected: {event.details.productsAffected}
                          </p>
                          <p className="text-sm text-gray-600">
                            Variants updated: {event.details.variantsUpdated}
                          </p>
                          {event.details.changes && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-900 mb-2">
                                Changes:
                              </p>
                              <div className="space-y-1">
                                {event.details.changes.map((change) => (
                                  <p
                                    key={change.sku}
                                    className="text-sm text-gray-600"
                                  >
                                    {change.sku}: {change.oldQuantity} →{' '}
                                    {change.newQuantity}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-red-600">
                          Error: {event.details.errorMessage}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 