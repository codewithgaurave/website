import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';

// PUT: Update a lead's status
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // SECURITY CHECK: Verify Admin Token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (token !== (process.env.ADMIN_PASSWORD || 'zomo123')) {
      return NextResponse.json({ success: false, message: 'Unauthorized access' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
  } catch (error: any) {
    console.error('API Update Lead Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update lead', error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a lead from the database completely
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // SECURITY CHECK: Verify Admin Token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (token !== (process.env.ADMIN_PASSWORD || 'zomo123')) {
      return NextResponse.json({ success: false, message: 'Unauthorized access' }, { status: 401 });
    }

    const { id } = params;
    await connectToDatabase();
    
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('API Delete Lead Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete lead', error: error.message }, { status: 500 });
  }
}
