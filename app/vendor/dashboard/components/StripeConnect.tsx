import { useState, useEffect } from 'react';
import { useStripeConnect } from '../../../lib/hooks/useStripeConnect';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function StripeConnect() {
  const { loading, error, account, createAccount, getAccount, getLoginLink } = useStripeConnect();
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  // Check for URL parameters when returning from Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refresh = params.get('refresh');
    const stripeSuccess = params.get('success');
    const accountId = localStorage.getItem('stripeAccountId');

    if (accountId && (refresh === 'true' || stripeSuccess === 'true')) {
      getAccount(accountId);
    }
  }, [getAccount]);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    try {
      await createAccount(email, businessName);
      setSuccess('Redirecting to Stripe Connect onboarding...');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleManageAccount = async () => {
    if (!account) return;
    try {
      const loginUrl = await getLoginLink(account.id);
      window.location.href = loginUrl;
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Stripe Connect</h3>
            <p className="mt-1 text-sm text-gray-500">
              Set up your payment processing to receive payments from customers
            </p>
          </div>
          <img src="/images/stripe-logo.png" alt="Stripe" className="h-8" />
        </div>

        {!account ? (
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Business Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                required
              />
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5" />
              ) : (
                'Connect with Stripe'
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Business Name</p>
                  <p className="font-medium">{account.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{account.email}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center mt-1">
                    {account.detailsSubmitted ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1.5" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500 mr-1.5" />
                    )}
                    <span className={account.detailsSubmitted ? 'text-green-700' : 'text-red-700'}>
                      {account.detailsSubmitted ? 'Active' : 'Incomplete'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payouts</p>
                  <div className="flex items-center mt-1">
                    {account.payoutsEnabled ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1.5" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500 mr-1.5" />
                    )}
                    <span className={account.payoutsEnabled ? 'text-green-700' : 'text-red-700'}>
                      {account.payoutsEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleManageAccount}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5" />
              ) : (
                'Manage Stripe Account'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 