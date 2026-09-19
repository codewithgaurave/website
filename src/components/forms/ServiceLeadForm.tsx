"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ServiceLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setStatus('error');
      setErrorMessage('Please fill out all fields.');
      return;
    }

    setStatus('loading');
    
    try {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : 'Unknown URL';
      const pagePath = typeof window !== 'undefined' ? window.location.pathname.replace('/services/', '').replace('-', ' ') : 'General Lead';

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sourceType: `Service: ${pagePath.toUpperCase()}`,
          sourceUrl: currentUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('idle'); // Keep form visible, just reset state
        setFormData({ name: '', phone: '', email: '' });
        
        // SweetAlert2 Success Popup
        Swal.fire({
          title: 'Request Submitted!',
          text: `Thank you, ${formData.name}. Our team will review your requirement and get back to you shortly.`,
          icon: 'success',
          confirmButtonText: 'Great!',
          confirmButtonColor: '#ea580c',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to submit request.');
        
        // SweetAlert2 Error Popup
        Swal.fire({
          title: 'Oops...',
          text: data.message || 'Failed to submit request.',
          icon: 'error',
          confirmButtonColor: '#ea580c',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Network error. Please check your connection.');
      
      Swal.fire({
        title: 'Connection Error',
        text: 'Network error. Please check your connection.',
        icon: 'error',
        confirmButtonColor: '#ea580c',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-lg flex items-center gap-2 border border-red-200 animate-pulse hidden">
          {/* Hidden since Swal handles it, kept for fallback structure */}
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[14px] font-bold text-[#475569]">Name <span className="text-red-500">*</span></label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="E.g. Owner/Manager name" 
          className="w-full bg-[#f8fafc] border border-slate-200 rounded-none px-4 py-2 md:py-2.5 text-[14px] font-medium text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-[#024a9d] transition-colors" 
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-[14px] font-bold text-[#475569]">Phone Number <span className="text-red-500">*</span></label>
        <div className="flex bg-[#f8fafc] border border-slate-200 rounded-none overflow-hidden focus-within:border-[#024a9d] transition-colors">
            <div className="flex items-center justify-center bg-transparent pl-4 pr-2 shrink-0 border-r border-slate-200">
              <span className="text-lg">🇮🇳</span> <span className="text-[15px] font-semibold text-slate-700 ml-2">+91</span>
            </div>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter 10 Digit Mobile No." 
              className="w-full bg-transparent px-4 py-2 md:py-2.5 text-[14px] font-medium text-gray-900 placeholder:text-slate-400 focus:outline-none" 
            />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-[14px] font-bold text-[#475569]">Email Address <span className="text-red-500">*</span></label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="E.g. Cafe@gmail.com" 
          className="w-full bg-[#f8fafc] border border-slate-200 rounded-none px-4 py-2 md:py-2.5 text-[14px] font-medium text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-[#024a9d] transition-colors" 
        />
      </div>

      <div className="pt-2">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 bg-[#024a9d] hover:bg-[#0f172a] text-white font-bold py-3.5 rounded-none transition-all text-[15px] shadow-sm relative group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/* Added bottom hover accent line on the button */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#d62423] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            
            {status === 'loading' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Request...
              </>
            ) : (
              <>
                Submit Requirement
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
      </div>
    </form>
  );
}
