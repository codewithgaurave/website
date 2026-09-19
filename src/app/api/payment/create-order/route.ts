import { NextResponse } from 'next/server';

// NOTE: In production, you would run `npm install razorpay` 
// and import Razorpay. For now, this is a ready-to-use boilerplate.

export async function POST(request: Request) {
  try {
    const { amount, receipt } = await request.json();

    if (!amount) {
      return NextResponse.json(
        { success: false, message: 'Payment amount is required' },
        { status: 400 }
      );
    }

    /* 
    // REAL RAZORPAY INTEGRATION CODE:
    const Razorpay = require('razorpay');
    
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Add to .env.local
      key_secret: process.env.RAZORPAY_KEY_SECRET, // Add to .env.local
    });

    const options = {
      amount: amount * 100, // Amount in paisa
      currency: 'INR',
      receipt: receipt || 'order_rcptid_11'
    };

    const order = await instance.orders.create(options);
    
    return NextResponse.json({ success: true, order });
    */

    // --- MOCK RESPONSE FOR NOW ---
    // This allows the frontend to test the flow without API keys.
    const mockOrder = {
      id: `order_mock_${Math.floor(Math.random() * 1000000)}`,
      entity: 'order',
      amount: amount * 100,
      amount_paid: 0,
      amount_due: amount * 100,
      currency: 'INR',
      receipt: receipt || 'rcpt_1',
      status: 'created',
    };

    return NextResponse.json({ success: true, order: mockOrder }, { status: 200 });

  } catch (error: any) {
    console.error('Create Order Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create payment order', error: error.message },
      { status: 500 }
    );
  }
}
