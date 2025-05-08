'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { useEcommerce } from '../../lib/hooks/useEcommerce';
import PlatformConnector from './components/PlatformConnector';
import InventoryManager from './components/InventoryManager';
import SyncHistory from './components/SyncHistory';
import StripeConnect from './components/StripeConnect';
import {
  CircleStackIcon,
  ArrowPathIcon,
  ClockIcon,
  LinkIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function VendorDashboard() {
  const { loading } = useEcommerce();
  const tabs = [
    {
      name: 'Connect Platforms',
      icon: LinkIcon,
      component: PlatformConnector
    },
    {
      name: 'Inventory Management',
      icon: CircleStackIcon,
      component: InventoryManager
    },
    {
      name: 'Sync History',
      icon: ClockIcon,
      component: SyncHistory
    },
    {
      name: 'Payments',
      icon: CreditCardIcon,
      component: StripeConnect
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your inventory and payments across multiple platforms
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-yellow-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-yellow-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow text-yellow-700'
                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-yellow-600'
                )
              }
            >
              <div className="flex items-center justify-center space-x-2">
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </div>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-6">
          {tabs.map((tab) => (
            <Tab.Panel
              key={tab.name}
              className={classNames(
                'rounded-xl bg-white',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-yellow-400 focus:outline-none focus:ring-2'
              )}
            >
              <tab.component />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4">
            <ArrowPathIcon className="animate-spin h-8 w-8 text-yellow-600" />
          </div>
        </div>
      )}
    </div>
  );
} 