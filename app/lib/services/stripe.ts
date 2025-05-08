import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export interface StripeConnectAccount {
  id: string;
  businessName: string;
  email: string;
  payoutsEnabled: boolean;
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
  accountLink: string | null;
}

export async function createConnectAccount(email: string, businessName: string): Promise<StripeConnectAccount> {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email,
      business_profile: {
        name: businessName,
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/dashboard?refresh=true`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/dashboard?success=true`,
      type: 'account_onboarding',
    });

    return {
      id: account.id,
      businessName,
      email,
      payoutsEnabled: account.payouts_enabled || false,
      chargesEnabled: account.charges_enabled || false,
      detailsSubmitted: account.details_submitted || false,
      accountLink: accountLink.url,
    };
  } catch (error) {
    console.error('Error creating Stripe Connect account:', error);
    throw error;
  }
}

export async function getConnectAccount(accountId: string): Promise<StripeConnectAccount | null> {
  try {
    const account = await stripe.accounts.retrieve(accountId);
    
    return {
      id: account.id,
      businessName: account.business_profile?.name || '',
      email: account.email || '',
      payoutsEnabled: account.payouts_enabled || false,
      chargesEnabled: account.charges_enabled || false,
      detailsSubmitted: account.details_submitted || false,
      accountLink: null,
    };
  } catch (error) {
    console.error('Error retrieving Stripe Connect account:', error);
    return null;
  }
}

export async function createLoginLink(accountId: string): Promise<string> {
  try {
    const loginLink = await stripe.accounts.createLoginLink(accountId);
    return loginLink.url;
  } catch (error) {
    console.error('Error creating login link:', error);
    throw error;
  }
}

export async function createPaymentIntent(
  amount: number,
  currency: string,
  vendorAccountId: string,
  applicationFeeAmount: number
): Promise<Stripe.PaymentIntent> {
  try {
    return await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      application_fee_amount: applicationFeeAmount,
      transfer_data: {
        destination: vendorAccountId,
      },
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function getAccountBalance(accountId: string): Promise<{
  available: number;
  pending: number;
}> {
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: accountId,
    });

    return {
      available: balance.available.reduce((sum, bal) => sum + bal.amount, 0),
      pending: balance.pending.reduce((sum, bal) => sum + bal.amount, 0),
    };
  } catch (error) {
    console.error('Error retrieving account balance:', error);
    throw error;
  }
} 