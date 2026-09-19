"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function PartnerForm() {
  const [formData, setFormData] = useState({ 
    name: '', phone: '', email: '', address: '',
    occupation: '', company: '', ownedFranchise: '',
    investmentAmount: '', acknowledgment: false 
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && (!formData.name || !formData.phone || !formData.email || !formData.address)) {
      Swal.fire('Required', 'Please fill all fields first.', 'warning');
      return;
    }
    if (step === 2 && (!formData.occupation || !formData.company || !formData.ownedFranchise)) {
      Swal.fire('Required', 'Please fill experience details.', 'warning');
      return;
    }
    setStep(s => s + 1);
  };

  const handlePrev = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(s => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.investmentAmount || !formData.acknowledgment) {
       Swal.fire('Error', 'Please select investment amount and accept terms.', 'error');
       return;
    }

    setLoading(true);
    try {
      const complexSourceType = `Partner (Inv: ${formData.investmentAmount} | Fran: ${formData.ownedFranchise} | Loc: ${formData.address})`;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          sourceType: complexSourceType,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStep(1);
        setFormData({ 
          name: '', phone: '', email: '', address: '',
          occupation: '', company: '', ownedFranchise: '',
          investmentAmount: '', acknowledgment: false 
        });
        Swal.fire({
          title: 'Application Received!',
          text: `Thank you ${formData.name}. Our investor relations team will reach out to you within 24 hours.`,
          icon: 'success',
          confirmButtonColor: '#024a9d'
        });
      } else {
        Swal.fire('Wait!', data.message || 'Failed to submit application.', 'error');
      }
    } catch (error) {
       Swal.fire('Network Error', 'Connection failed. Try again.', 'error');
    }
    setLoading(false);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* LEFT SIDE: Cinematic Collage */}
        <div className="w-full relative px-2 sm:px-0 lg:px-0">
          <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[8px] sm:text-[10px] uppercase tracking-widest mb-3">Investment Opportunity</div>
          <h2 className="text-[28px] sm:text-3xl lg:text-4xl font-extrabold text-[#024a9d] mb-4 sm:mb-2 tracking-tight leading-[1.2] sm:leading-[1.15]">
            HoReCa- India's Most <br className="hidden sm:block" />
            <span className="text-[28px] sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#d62423]">Leading Industry</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm lg:text-base mb-8 sm:mb-4 max-w-sm">
            Tap into a rapidly growing market full of scalable opportunities and immense potential for recurring ROI.
          </p>

          <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[240px] sm:h-[280px] mx-auto xl:mx-0 mt-4">
            {/* Dynamic Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] bg-gradient-to-tr from-blue-300 to-red-200 rounded-full blur-[60px] opacity-40 z-0"></div>

            {/* Top Polaroid (Slanted) */}
            <div className="absolute top-0 left-0 w-[180px] h-[130px] sm:w-[220px] sm:h-[160px] bg-white p-1.5 sm:p-2 pb-5 sm:pb-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-md transform -rotate-6 z-10 border border-slate-100 transition-all duration-500 hover:-rotate-3 hover:scale-105">
              <div className="w-full h-full bg-slate-100 rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop"
                  alt="Training chefs"
                  className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>

            {/* Bottom Polaroid (Straight) */}
            <div className="absolute bottom-4 right-0 w-[200px] h-[150px] sm:w-[240px] sm:h-[180px] bg-white p-1.5 sm:p-2 shadow-[0_40px_80px_-15px_rgba(2,74,157,0.2)] rounded-md z-20 border border-slate-100 transition-all duration-500 hover:-rotate-2 hover:scale-105">
              <div className="w-full h-full bg-slate-100 rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop"
                  alt="Professional Kitchen"
                  className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: High-End Application Form */}
        <div className="w-full bg-white p-5 sm:p-6 lg:p-8 rounded-[24px] sm:rounded-[32px] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.08)] border border-slate-100 relative min-h-[460px]">
          {/* Form Top Accent */}
          <div className="absolute top-0 left-6 sm:left-8 w-16 sm:w-20 h-1 bg-gradient-to-r from-[#024a9d] to-[#d62423] rounded-b-full"></div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Investor Consultation
          </h2>
          <p className="font-bold text-slate-500 text-sm mb-8">
            Connect with us in 3 simple steps
          </p>

          {/* Premium Stepper Wizard */}
          <div className="flex items-center justify-between mb-8 relative w-full pr-4">
            {/* Active Loading line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-100 rounded-full -z-10 translate-y-[-50%] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#024a9d] to-blue-400 rounded-full transition-all duration-500"
                style={{ width: step === 1 ? '10%' : step === 2 ? '50%' : '100%' }}
              ></div>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#024a9d] to-blue-500 shadow-md text-white text-xs font-black flex items-center justify-center ring-4 ring-white">1</div>
              <span className="text-[#024a9d] text-[10px] font-black uppercase tracking-wider">Page 1</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ring-4 ring-white transition-colors duration-500 ${step >= 2 ? 'bg-gradient-to-tr from-[#024a9d] to-blue-500 shadow-md text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= 2 ? 'text-[#024a9d]' : 'text-slate-400'}`}>Page 2</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ring-4 ring-white transition-colors duration-500 ${step >= 3 ? 'bg-gradient-to-tr from-[#024a9d] to-blue-500 shadow-md text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= 3 ? 'text-[#024a9d]' : 'text-slate-400'}`}>Finish</span>
            </div>
          </div>

          {/* Form Fields container */}
          <div className="space-y-6 relative">
            
            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-[#d62423] flex items-center justify-center text-[10px]">◆</span>
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group flex flex-col">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#024a9d] mb-1 block opacity-0 transform translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 outline-none focus:border-[#024a9d] focus:ring-2 focus:ring-blue-50 focus:bg-white text-sm placeholder-slate-400 font-semibold transition-all relative z-10"
                    />
                  </div>
                  <div className="relative group flex flex-col">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#024a9d] mb-1 block opacity-0 transform translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all">Phone Number</label>
                    <div className="relative w-full z-10">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Mobile Number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 outline-none focus:border-[#024a9d] focus:ring-2 focus:ring-blue-50 focus:bg-white text-sm placeholder-slate-400 font-semibold transition-all pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{formData.phone.length}/10</span>
                    </div>
                  </div>
                  <div className="relative group flex flex-col">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#024a9d] mb-1 block opacity-0 transform translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 outline-none focus:border-[#024a9d] focus:ring-2 focus:ring-blue-50 focus:bg-white text-sm placeholder-slate-400 font-semibold transition-all relative z-10"
                    />
                  </div>
                  <div className="relative group flex flex-col">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#024a9d] mb-1 block opacity-0 transform translate-y-2 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all">City / State</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="City / State"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 outline-none focus:border-[#024a9d] focus:ring-2 focus:ring-blue-50 focus:bg-white text-sm placeholder-slate-400 font-semibold transition-all relative z-10"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleNext} 
                    type="button"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#024a9d] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm px-10 py-3 rounded-xl shadow-[0_5px_15px_-5px_rgba(2,74,157,0.6)] transform transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(2,74,157,0.7)] flex justify-center items-center gap-2"
                  >
                    Next Step <span>&rarr;</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Employment & Business */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl sm:text-2xl font-normal text-slate-800 mb-6">
                  Employment & Business<br/>Experience
                </h3>

                <div className="space-y-6">
                  <div className="relative group flex flex-col">
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Current Occupation"
                      className="w-full bg-transparent border-b-2 border-slate-300 px-1 py-2 text-slate-700 outline-none focus:border-[#1877f2] transition-colors placeholder-slate-400 font-semibold text-[15px]"
                    />
                  </div>
                  
                  <div className="relative group flex flex-col">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full bg-transparent border-b-2 border-slate-300 px-1 py-2 text-slate-700 outline-none focus:border-[#1877f2] transition-colors placeholder-slate-400 font-semibold text-[15px]"
                    />
                  </div>

                  <div className="pt-2">
                    <p className="text-[13px] font-bold text-slate-500 mb-3">Have you ever owned a franchise/Investor before?</p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="ownedFranchise" value="Yes" checked={formData.ownedFranchise === 'Yes'} onChange={handleChange} className="w-5 h-5 text-[#1877f2] border-slate-300 focus:ring-[#1877f2]" />
                        <span className="font-semibold text-slate-700 text-[15px]">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="ownedFranchise" value="No" checked={formData.ownedFranchise === 'No'} onChange={handleChange} className="w-5 h-5 text-[#1877f2] border-slate-300 focus:ring-[#1877f2]" />
                        <span className="font-semibold text-slate-700 text-[15px]">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                  <button 
                    onClick={handlePrev} 
                    type="button"
                    className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm px-10 py-3 rounded-xl transition-colors flex justify-center items-center"
                  >
                    &larr; Previous
                  </button>
                  <button 
                    onClick={handleNext} 
                    type="button"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#024a9d] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm px-10 py-3 rounded-xl shadow-[0_5px_15px_-5px_rgba(2,74,157,0.6)] transform transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(2,74,157,0.7)] flex justify-center items-center gap-2"
                  >
                    Next Step <span>&rarr;</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Investment Details */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl sm:text-2xl font-normal text-slate-800 mb-6">
                  Investment Details
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-[13px] font-bold text-slate-500 mb-4">How Much Do you Want to Invest ?</p>
                    <div className="space-y-4">
                      {['5 L to 10 L', '10 L to 20 L', '20 L to 30 L', 'Above 30 L'].map((amt) => (
                        <label key={amt} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="investmentAmount" 
                            value={amt} 
                            checked={formData.investmentAmount === amt}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500" 
                          />
                          <span className="text-slate-800 font-medium text-[15px]">{amt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-[13px] font-bold text-slate-500 mb-2">Acknowledgment and Acceptance <span className="text-red-500">*</span></p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="acknowledgment" 
                        checked={formData.acknowledgment}
                        onChange={handleChange}
                        className="w-5 h-5 mt-0.5 text-[#1877f2] rounded border-slate-400 focus:ring-[#1877f2]" 
                      />
                      <span className="text-[13px] font-medium text-slate-800 leading-relaxed">
                        I hereby certify that the information provided in this application is true and complete to the best of my knowledge...
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                  <button 
                    onClick={handlePrev} 
                    type="button"
                    className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm px-10 py-3 rounded-xl transition-colors flex justify-center items-center"
                  >
                    &larr; Previous
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading} 
                    type="button"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#024a9d] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm px-10 py-3 rounded-xl shadow-[0_5px_15px_-5px_rgba(2,74,157,0.6)] transform transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(2,74,157,0.7)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'} <span>&rarr;</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
