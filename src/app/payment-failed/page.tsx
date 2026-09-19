"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

function FailedContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid') || 'N/A';
  const error = searchParams.get('error') || 'Transaction failed or was cancelled.';

  return (
    <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-8 sm:p-12 max-w-lg w-full text-center relative overflow-hidden">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>
      
      <h1 className="text-3xl font-black text-slate-800 mb-2">Payment Failed</h1>
      <p className="text-slate-500 font-medium mb-8">
        We could not process your payment at this time. Please check your details and try again.
      </p>

      <div className="bg-[#fff5f5] border border-red-100 rounded-xl p-5 mb-8 text-left">
        <h3 className="text-red-600 font-bold text-sm mb-4 uppercase">Error Details</h3>
        <div className="flex justify-between items-center border-b border-dashed border-red-200 pb-2 mb-2">
            <span className="text-slate-500 text-sm">Transaction ID</span>
            <span className="text-slate-800 font-bold text-sm">{txnid}</span>
        </div>
        <div className="flex flex-col gap-1 mt-2">
            <span className="text-slate-500 text-sm">Reason</span>
            <span className="text-red-600 font-semibold text-sm">{error}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Home className="w-4 h-4" /> Home
        </Link>
        <button onClick={() => window.history.back()} className="flex-1 bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    </div>
  );
}

export default function PaymentFailed() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 mt-[70px]">
      <Suspense fallback={<p className="text-center text-slate-500">Loading Order Details...</p>}>
        <FailedContent />
      </Suspense>
    </div>
  );
}
