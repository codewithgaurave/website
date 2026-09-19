import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Use environment variables for live keys.
        // Fallback to PayU test keys if not provided.
        const PAYU_MERCHANT_KEY = process.env.NEXT_PUBLIC_PAYU_KEY || 'gtKFFx';
        const PAYU_MERCHANT_SALT = process.env.PAYU_SALT || 'eCwWELxi';
        
        // Define PayU Endpoint (Test or Production based on env)
        const actionUrl = process.env.PAYU_ENV === 'production' 
            ? 'https://secure.payu.in/_payment' 
            : 'https://test.payu.in/_payment';

        const { amount, productinfo, firstname, email, phone } = body;
        
        // Generate a unique transaction ID
        const txnid = 'txn_' + Date.now() + Math.random().toString(36).substring(2, 6);
        
        // Success and Failure URLs that PayU will POST back to
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const surl = `${baseUrl}/api/payu/success`;
        const furl = `${baseUrl}/api/payu/failure`;
        
        // PayU Standard Hash Sequence: 
        // key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
        const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        return NextResponse.json({
            success: true,
            action: actionUrl,
            key: PAYU_MERCHANT_KEY,
            txnid,
            amount,
            productinfo,
            firstname,
            email,
            phone,
            surl,
            furl,
            hash
        });

    } catch (error) {
        console.error('PayU hash generation error:', error);
        return NextResponse.json({ success: false, message: 'Server error generating payment hash' }, { status: 500 });
    }
}
