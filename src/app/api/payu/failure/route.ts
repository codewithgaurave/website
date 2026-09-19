import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const txnid = formData.get('txnid');
        const error = formData.get('error_Message');
        
        // This is a direct server-to-server POST from PayU,
        // so we redirect the user to a Failure/Retry Page in the browser.
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        return NextResponse.redirect(`${baseUrl}/payment-failed?txnid=${txnid}&error=${error}`, 303);
    } catch (e) {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        return NextResponse.redirect(`${baseUrl}/`, 303);
    }
}
