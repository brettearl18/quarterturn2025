'use client';

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Try to fetch a document from Firestore
        const querySnapshot = await getDocs(collection(db, 'products'));
        setConnectionStatus('connected');
      } catch (err) {
        setConnectionStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Status</h2>
      <div className="space-y-2">
        <p>Status: 
          <span className={`ml-2 font-semibold ${
            connectionStatus === 'connected' ? 'text-green-500' :
            connectionStatus === 'error' ? 'text-red-500' :
            'text-yellow-500'
          }`}>
            {connectionStatus.toUpperCase()}
          </span>
        </p>
        {error && (
          <p className="text-red-500">Error: {error}</p>
        )}
      </div>
    </div>
  );
} 