import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // These details are sent by Razorpay after successful payment on the frontend
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: 'Invalid payment details' }, { status: 400 });
    }

    // REAL SECURITY VERIFICATION LOGIC:
    /*
    const key_secret = process.env.RAZORPAY_KEY_SECRET; // Must match the secret in .env
    
    // Creating the signature payload
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 1. Update Database Payment Status here!
      // 2. Return Success
      return NextResponse.json({ success: true, message: 'Payment verified successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid Signature' }, { status: 400 });
    }
    */

    // --- MOCK RESPONSE FOR NOW ---
    console.log("Mock Payment Verified Success", { razorpay_order_id, razorpay_payment_id });
    
    // In a mock state, assume success.
    return NextResponse.json({ 
      success: true, 
      message: 'Payment verified successfully (MOCK)' 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Verify Order Error:', error);
    return NextResponse.json(
      { success: false, message: 'Payment verification failed', error: error.message },
      { status: 500 }
    );
  }
}
