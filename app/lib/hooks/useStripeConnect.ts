import { useState, useCallback } from 'react';
import { StripeConnectAccount } from '../services/stripe';

interface UseStripeConnectReturn {
  loading: boolean;
  error: string | null;
  account: StripeConnectAccount | null;
  createAccount: (email: string, businessName: string) => Promise<void>;
  getAccount: (accountId: string) => Promise<void>;
  getLoginLink: (accountId: string) => Promise<string>;
}

export function useStripeConnect(): UseStripeConnectReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<StripeConnectAccount | null>(null);

  const createAccount = useCallback(async (email: string, businessName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stripe/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, businessName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create Stripe Connect account');
      }

      const newAccount = await response.json();
      setAccount(newAccount);

      if (newAccount.accountLink) {
        window.location.href = newAccount.accountLink;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAccount = useCallback(async (accountId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stripe/connect?accountId=${accountId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to retrieve Stripe Connect account');
      }

      const accountData = await response.json();
      setAccount(accountData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const getLoginLink = useCallback(async (accountId: string): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stripe/connect', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create login link');
      }

      const { url } = await response.json();
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    account,
    createAccount,
    getAccount,
    getLoginLink,
  };
} 