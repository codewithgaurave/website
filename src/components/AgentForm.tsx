"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AgentForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sourceType: 'Agent/Partner Application',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to submit form.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <section id="agent-form" className="py-12 lg:py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] border border-slate-200 lg:flex lg:h-[460px]">
          
          {/* Left Side - Tall Premium Image */}
          <div className="lg:w-[45%] relative hidden lg:block h-full">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
              alt="Professional Business Agent"
              className="w-full h-full object-cover object-top"
            />
            {/* Elegant Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-10 text-white w-full">
              <h3 className="text-3xl font-extrabold mb-4 leading-tight shadow-sm">Start Your <br/>Journey Today.</h3>
              <p className="text-slate-200 text-[15px] font-medium opacity-90 leading-relaxed max-w-sm">
                Join our elite agency network. Our team will review your details securely and prioritize your onboarding.
              </p>
            </div>
          </div>
          
          {/* Right Side - Classic Form */}
          <div className="lg:w-[55%] p-6 lg:p-8 lg:pl-10 bg-white flex flex-col justify-center h-full overflow-hidden">
            
            <div className="lg:hidden mb-4">
               <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Start Your Journey Today</h3>
               <p className="text-slate-500 text-sm">Join our elite agency network by filling out the details below.</p>
            </div>

            <div className="w-8 h-1 bg-[#024a9d] mb-4 rounded-full hidden lg:block"></div>
            <h4 className="text-[22px] font-extrabold text-slate-900 mb-6 hidden lg:block tracking-tight">Agent Application</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 text-[13px] font-bold p-3 rounded-lg flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}
              {status === 'success' && (
                <div className="bg-green-50 text-green-700 text-[13px] font-bold p-3 rounded-lg flex items-center gap-2 border border-green-200">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  Application submitted successfully!
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder="Enter full name"
                    className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#024a9d] focus:bg-white transition-all font-medium text-slate-700"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    placeholder="+91"
                    className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#024a9d] focus:bg-white transition-all font-medium text-slate-700"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="name@example.com"
                  className="w-full bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#024a9d] focus:bg-white transition-all font-medium text-slate-700"
                />
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-[#024a9d] hover:bg-[#013576] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_rgba(2,74,157,0.15)] group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted!' : 'Submit Application'}
                  {status !== 'loading' && status !== 'success' && (
                    <Send className="w-4 h-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
