import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';

// This API fetches all leads from Database for Admin viewing
export async function GET(request: Request) {
  try {
    // SECURITY CHECK: Verify Admin Token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    // Check token against environment variable or fallback
    if (token !== (process.env.ADMIN_PASSWORD || 'zomo123')) {
      return NextResponse.json({ success: false, message: 'Unauthorized access' }, { status: 401 });
    }

    // 1. Connect to MongoDB
    await connectToDatabase();

    // 2. Fetch all leads from the last recent to oldest
    const leads = await Lead.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: leads.length,
      data: leads
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('API Admin Leads Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch leads', error: error.message },
      { status: 500 }
    );
  }
}
