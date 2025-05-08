import { NextResponse } from 'next/server';
import { createConnectAccount, getConnectAccount, createLoginLink } from '@/lib/services/stripe';

export async function POST(request: Request) {
  try {
    const { email, businessName } = await request.json();

    if (!email || !businessName) {
      return NextResponse.json(
        { error: 'Email and business name are required' },
        { status: 400 }
      );
    }

    const account = await createConnectAccount(email, businessName);
    return NextResponse.json(account);
  } catch (error) {
    console.error('Error in POST /api/stripe/connect:', error);
    return NextResponse.json(
      { error: 'Failed to create Stripe Connect account' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    const account = await getConnectAccount(accountId);
    
    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error('Error in GET /api/stripe/connect:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve Stripe Connect account' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    const loginLink = await createLoginLink(accountId);
    return NextResponse.json({ url: loginLink });
  } catch (error) {
    console.error('Error in PUT /api/stripe/connect:', error);
    return NextResponse.json(
      { error: 'Failed to create login link' },
      { status: 500 }
    );
  }
} 