"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, FileText, Home } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid') || 'N/A';

  return (
    <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-8 sm:p-12 max-w-lg w-full text-center relative overflow-hidden">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-black text-slate-800 mb-2">Payment Successful!</h1>
      <p className="text-slate-500 font-medium mb-8">
        Your payment has been successfully processed. Welcome to the Zomocook Training Academy!
      </p>

      <div className="bg-[#f8fbff] border border-blue-100 rounded-xl p-5 mb-8 text-left">
        <h3 className="text-[#024a9d] font-bold text-sm mb-4 uppercase">Payment Details</h3>
        <div className="flex justify-between items-center border-b border-dashed border-blue-200 pb-2 mb-2">
            <span className="text-slate-500 text-sm">Transaction ID</span>
            <span className="text-slate-800 font-bold text-sm">{txnid}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm">Payment Status</span>
            <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-0.5 rounded">SUCCESS</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Home className="w-4 h-4" /> Home
        </Link>
        <button onClick={() => window.print()} className="flex-1 bg-[#024a9d] hover:bg-[#033b7c] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" /> Download Receipt
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 mt-[70px]">
      <Suspense fallback={<p className="text-center text-slate-500">Loading Order Details...</p>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
