"use client";
import React from 'react';
import Link from 'next/link';
import ServiceLeadForm from '@/components/forms/ServiceLeadForm';

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-center selection:bg-blue-600 selection:text-white">
      
      {/* ================= HERO SECTION ================= */}
      <section className="pt-[140px] sm:pt-[150px] md:pt-[160px] pb-12 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto relative text-center">
        {/* Soft Background glow square */}
        <div className="absolute top-32 left-1/2 w-[500px] h-[300px] rounded-none bg-blue-50/50 blur-[80px] -z-10 -translate-x-1/2"></div>

        {/* Top Badge */}
        <div className="bg-white border border-slate-200 text-[#024a9d] text-[11px] sm:text-[12px] font-black uppercase tracking-widest px-5 py-2.5 rounded-none mb-5 shadow-sm inline-flex items-center relative mt-4">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d62423]"></div>
          TRUSTED HOSPITALITY STAFFING PARTNER
        </div>
        
        <h1 className="text-[38px] sm:text-[48px] font-black text-[#0f172a] leading-[1.15] mb-5 tracking-tight max-w-4xl mx-auto">
                Hire Housekeeping For Hotel
              </h1>
        
        <p className="text-[#64748b] text-[15px] sm:text-[17px] font-medium leading-relaxed mb-5 max-w-2xl mx-auto">
          Trusted hospitality staffing solutions for hotels, restaurants, cafes, cloud kitchens, and catering companies.
        </p>

        {/* Gradient Line */}
        <div className="w-20 h-1 bg-gradient-to-r from-[#024a9d] to-[#d62423] mx-auto mb-5 rounded-none"></div>
        
        {/* Features Stack/Grid */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-5 max-w-4xl mx-auto text-left sm:text-center">
          {[
            { icon: '👨‍🍳', text: '12,500+ Staff Placed' },
            { icon: '🏨', text: '7,500+ HoReCa Partners' },
            { icon: '🇮🇳', text: 'PAN India Hiring' },
            { icon: '⚡', text: '36–72 Hour Hiring' }
          ].map((feat, i) => (
             <div key={i} className="bg-white border border-slate-200 shadow-sm px-5 py-3 rounded-none flex items-center justify-center gap-3 text-[14.5px] font-bold text-[#0f172a] w-full sm:w-auto hover:border-[#024a9d] transition-colors relative group">
               {/* Hover top border */}
               <div className="absolute top-0 left-0 w-full h-1 bg-[#024a9d] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
               <span className="text-[20px]">{feat.icon}</span>
               <span>{feat.text}</span>
             </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl sm:max-w-none mx-auto">
           <a href="#registration-form" className="w-full sm:w-auto bg-[#024a9d] hover:bg-[#0f172a] text-white font-black py-3.5 px-8 rounded-none shadow-[0_8px_20px_rgba(2,74,157,0.15)] transition-all flex items-center justify-center gap-2 text-[15px] border border-transparent">
             <span className="text-lg">🚀</span> Register Requirement
           </a>
           <a href="#salary-guide" className="w-full sm:w-auto bg-white border border-slate-200 text-[#0f172a] hover:border-[#0f172a] font-black py-3.5 px-8 rounded-none shadow-sm transition-all flex items-center justify-center gap-2 text-[15px] hover:bg-slate-50">
             <span className="text-lg">💰</span> View Salary Guide
           </a>
        </div>
      </section>

      {/* ================= WHY CHOOSE ZOMOCOOK ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#fafbfc] border-t border-slate-100">
         <div className="max-w-[1200px] mx-auto text-center">
            {/* Top Badge */}
            <div className="bg-white border border-slate-200 text-[#024a9d] text-[11px] sm:text-[12px] font-black uppercase tracking-widest px-5 py-2.5 rounded-none mb-5 shadow-sm inline-flex items-center relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d62423]"></div>
              WHY CHOOSE ZOMOCOOK
            </div>
            
            <h2 className="text-[32px] sm:text-[42px] font-black text-[#0f172a] leading-tight mb-5 max-w-2xl mx-auto tracking-tight">
              Why Businesses Trust Zomocook?
            </h2>
            
            <p className="text-[#64748b] text-[15px] sm:text-[16px] font-medium leading-relaxed mb-5 max-w-2xl mx-auto">
              Trusted hospitality staffing solutions for hotels, restaurants, cafes, cloud kitchens, and catering companies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                  ), 
                  title: 'Pre-Screened Candidates', 
                  desc: 'Verified and shortlisted hospitality professionals ready for hiring.' 
                },
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  ), 
                  title: 'Quick Hiring Support', 
                  desc: 'Get suitable candidate profiles quickly and reduce hiring delays.' 
                },
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  ), 
                  title: 'Replacement Guarantee', 
                  desc: 'Replacement support available as per your selected service package.' 
                },
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                  ), 
                  title: 'PAN India Staffing', 
                  desc: 'Hire chefs and hospitality staff from across India.' 
                }
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-none border border-slate-200 shadow-sm relative p-8 sm:p-10 flex flex-col items-center hover:border-[#024a9d] hover:shadow-[0_10px_30px_-5px_rgba(2,74,157,0.1)] transition-all duration-300 group">
                  {/* Hover Top Gradient Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#024a9d] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
                  
                  {/* Icon Box */}
                  <div className="w-[60px] h-[60px] rounded-none bg-blue-50 border border-blue-100 flex items-center justify-center text-[#024a9d] mb-5 group-hover:bg-[#024a9d] group-hover:text-white group-hover:border-[#024a9d] transition-colors duration-300 relative">
                     <div className="absolute top-0 left-0 w-full h-1 bg-[#d62423] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {card.icon}
                  </div>
                  
                  <h3 className="font-extrabold text-[17px] text-[#0f172a] mb-3">{card.title}</h3>
                  <p className="text-[#64748b] text-[14px] font-medium leading-[1.8]">{card.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
         <div className="max-w-[1200px] mx-auto text-center">
            <div className="bg-white border border-slate-200 text-[#024a9d] text-[11px] sm:text-[12px] font-black uppercase tracking-widest px-5 py-2.5 rounded-none mb-5 shadow-sm inline-flex items-center relative gap-1">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d62423]"></div>
              HOW IT WORKS
            </div>
            
            <h2 className="text-[32px] sm:text-[42px] font-black text-[#0f172a] leading-tight mb-5 max-w-2xl mx-auto tracking-tight">
              Hire Hospitality Staff in 4 Easy Steps
            </h2>
            
            <p className="text-[#64748b] text-[15px] sm:text-[16px] font-medium leading-relaxed mb-5 max-w-2xl mx-auto">
              From requirement submission to successful joining, Zomocook manages the complete recruitment process.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  step: 'STEP 01',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  ), 
                  title: 'Submit Requirement', 
                  desc: 'Share your staffing requirements including position, salary, location, and joining details.' 
                },
                { 
                  step: 'STEP 02',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                  ), 
                  title: 'Get Verified Profiles', 
                  desc: 'Our HR team screens and shortlists suitable candidates matching your requirements.' 
                },
                { 
                  step: 'STEP 03',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                  ), 
                  title: 'Interview & Select', 
                  desc: 'Review profiles, conduct interviews or trials, and choose the best candidate.' 
                },
                { 
                  step: 'STEP 04',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><polyline points="15,9 18,9 22,15"/><path d="M2.06 15.11a2.22 2.22 0 0 0 1.25.75c.9-.11 1.63-1 2.39-1h.23c.89 0 1.66 1.05 2.57 1.05s1.65-1 2.5-1h1.12c.86 0 1.58.91 2.45 1.03a2.18 2.18 0 0 0 1.58-.61"/><path d="M11 11h2"/></svg>
                  ), 
                  title: 'Staff Joins', 
                  desc: 'Selected candidate joins your organization with replacement support as per package.' 
                }
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-none border border-slate-200 shadow-sm relative p-8 sm:p-10 flex flex-col items-center hover:border-[#024a9d] hover:shadow-[0_10px_30px_-5px_rgba(2,74,157,0.1)] transition-all duration-300 group">
                  {/* Hover Top Gradient Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#024a9d] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
                  
                  {/* Icon Box */}
                  <div className="w-[60px] h-[60px] rounded-none bg-blue-50 border border-blue-100 flex items-center justify-center text-[#024a9d] mb-5 group-hover:bg-[#024a9d] group-hover:text-white group-hover:border-[#024a9d] transition-colors duration-300 relative">
                     <div className="absolute top-0 left-0 w-full h-1 bg-[#d62423] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {card.icon}
                  </div>
                  
                  <div className="text-[#d62423] text-[11px] font-black uppercase tracking-widest mb-2">
                    {card.step}
                  </div>
                  <h3 className="font-extrabold text-[17px] text-[#0f172a] mb-3">{card.title}</h3>
                  <p className="text-[#64748b] text-[14px] font-medium leading-[1.8]">{card.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>


      {/* ================= REGISTER REQUIREMENT FORM ================= */}
      <section id="registration-form" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#fafbfc]">
         <div className="max-w-[1200px] mx-auto text-center">
            {/* Top Badge */}
            <div className="bg-white border border-slate-200 text-[#024a9d] text-[11px] sm:text-[12px] font-black uppercase tracking-widest px-5 py-2.5 rounded-none mb-5 shadow-sm inline-flex items-center relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d62423]"></div>
              ZOMOCOOK COMMERCIAL HIRING
            </div>
            
            <h2 className="text-[32px] sm:text-[42px] font-black text-[#0f172a] leading-tight mb-4 max-w-2xl mx-auto tracking-tight">
              Register Your Requirement Here
            </h2>
            
            <p className="text-[#64748b] text-[15px] sm:text-[16px] font-medium leading-relaxed mb-5">
              Hire Reliable Staff in Just a Few Steps
            </p>

            {/* Form Wrapper Container */}
            <div className="bg-white rounded-none border border-slate-200 shadow-[0_10px_40px_-10px_rgba(2,74,157,0.1)] p-8 sm:p-12 text-left relative overflow-hidden mx-auto max-w-2xl border-t-4 border-t-[#024a9d]">     
               <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-5 pb-4 border-b border-slate-100 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-none bg-blue-50 text-[#024a9d] border border-blue-100 flex items-center justify-center">📋</span>
                 Personal Details
               </h3>
               
               <ServiceLeadForm />
            </div>
         </div>
      </section>

      {/* ================= SALARY GUIDE ================= */}
      <section id="salary-guide" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
         <div className="max-w-[1200px] mx-auto text-center">
            {/* Top Badge */}
            <div className="bg-white border border-slate-200 text-[#024a9d] text-[11px] sm:text-[12px] font-black uppercase tracking-widest px-5 py-2.5 rounded-none mb-5 shadow-sm inline-flex items-center relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d62423]"></div>
              SALARY GUIDE
            </div>
            
            <h2 className="text-[32px] sm:text-[42px] font-black text-[#0f172a] leading-tight mb-4 max-w-2xl mx-auto tracking-tight">
              Know the Right Salary Before You Hire
            </h2>
            
            <p className="text-[#64748b] text-[15px] sm:text-[16px] font-medium leading-relaxed mb-5 max-w-2xl mx-auto">
              Average salary ranges to help you plan your hospitality hiring budget effectively.
            </p>

            <div className="w-20 h-1 bg-gradient-to-r from-[#024a9d] to-[#d62423] mx-auto mb-5 rounded-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-5 text-left max-w-4xl mx-auto">
               {/* Box 1: Kitchen Staff */}
               <div className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden hover:shadow-[0_10px_30px_-5px_rgba(2,74,157,0.1)] transition-shadow">
                  <div className="bg-[#024a9d] px-6 sm:px-8 py-5">
                     <h3 className="text-white font-extrabold text-[18px] sm:text-[20px] flex items-center gap-2">
                       <span>👨‍🍳</span> Kitchen Staff
                     </h3>
                     <p className="text-blue-100 text-[13px] font-medium mt-1 uppercase tracking-wider">Chef Department</p>
                  </div>
                  <div className="divide-y divide-slate-100 px-6 sm:px-8 py-2 bg-slate-50">
                    {[
                      { role: 'Executive Chef', pay: '₹70K - ₹1.5L+' },
                      { role: 'Head Chef', pay: '₹40K - ₹80K' },
                      { role: 'CDP', pay: '₹28K - ₹40K' },
                      { role: 'DCDP', pay: '₹22K - ₹26K' },
                      { role: 'Commi 1', pay: '₹18K - ₹22K' },
                      { role: 'Commi 2', pay: '₹14K - ₹18K' }
                    ].map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center py-4 relative group">
                         <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#024a9d] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <span className="text-[#334155] font-bold text-[14.5px] group-hover:translate-x-2 transition-transform">{item.role}</span>
                         <span className="text-[#024a9d] font-black text-[15px] tracking-wide">{item.pay}</span>
                       </div>
                    ))}
                  </div>
               </div>

               {/* Box 2: Service Staff */}
               <div className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden hover:shadow-[0_10px_30px_-5px_rgba(214,36,35,0.1)] transition-shadow">
                  <div className="bg-[#d62423] px-6 sm:px-8 py-5">
                     <h3 className="text-white font-extrabold text-[18px] sm:text-[20px] flex items-center gap-2">
                       <span>🍽️</span> Service Staff
                     </h3>
                     <p className="text-red-100 text-[13px] font-medium mt-1 uppercase tracking-wider">Front Office & Restaurant</p>
                  </div>
                  <div className="divide-y divide-slate-100 px-6 sm:px-8 py-2 bg-slate-50">
                    {[
                      { role: 'Restaurant Manager', pay: '₹35K - ₹80K' },
                      { role: 'Captain / Supervisor', pay: '₹18K - ₹30K' },
                      { role: 'Steward / Waiter', pay: '₹10K - ₹18K' },
                      { role: 'Bartender', pay: '₹15K - ₹25K' },
                      { role: 'Housekeeping', pay: '₹12K - ₹18K' }
                    ].map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center py-4 relative group text-[14.5px]">
                         <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#d62423] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <span className="text-[#334155] font-bold group-hover:translate-x-2 transition-transform">{item.role}</span>
                         <span className="text-[#d62423] font-black tracking-wide">{item.pay}</span>
                       </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Important Note */}
            <div className="bg-white border text-left border-slate-200 border-l-[4px] border-l-[#d62423] rounded-none p-6 sm:p-8 shadow-sm mx-auto max-w-4xl flex items-start gap-3">
               <span className="text-[#d62423] text-xl shrink-0 mt-0.5">⚠️</span>
               <p className="text-[14px] text-[#64748b] leading-[1.8] font-medium">
                 <strong className="text-[#0f172a] font-black tracking-wide">IMPORTANT NOTE:</strong> Salary may vary depending on experience, city, accommodation facilities, skill level, and job responsibilities.
               </p>
            </div>
         </div>
      </section>

      {/* ================= TRUSTED STATS ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#fafbfc] border-t border-slate-100 mb-5">
         <div className="max-w-[1200px] mx-auto text-center">
            
            <h2 className="text-[32px] sm:text-[42px] font-black text-[#0f172a] leading-tight mb-5 max-w-2xl mx-auto tracking-tight">
              Trusted by Thousands Across India
            </h2>
            
            <p className="text-[#64748b] text-[15px] sm:text-[16px] font-medium leading-relaxed mb-5 max-w-2xl mx-auto">
              With thousands of successful placements and satisfied clients, we are helping businesses hire faster and smarter across India.
            </p>

            <div className="w-20 h-1 bg-gradient-to-r from-[#024a9d] to-[#d62423] mx-auto mb-5 rounded-none"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
               
               <div className="bg-white rounded-none border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center hover:border-[#024a9d] transition-all relative group">
                 <div className="absolute left-0 bottom-0 w-full h-1 bg-[#024a9d] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
                 <h3 className="text-[#0f172a] group-hover:text-[#024a9d] transition-colors text-[34px] font-black mb-1">12,500+</h3>
                 <p className="text-[#475569] text-[12px] font-bold uppercase tracking-wider">Chef Placed</p>
               </div>
               
               <div className="bg-white rounded-none border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center hover:border-[#d62423] transition-all relative group">
                 <div className="absolute left-0 bottom-0 w-full h-1 bg-[#d62423] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
                 <h3 className="text-[#0f172a] group-hover:text-[#d62423] transition-colors text-[34px] font-black mb-1">7,500+</h3>
                 <p className="text-[#475569] text-[12px] font-bold uppercase tracking-wider">Happy HoReCa Partners</p>
               </div>

               <div className="bg-white rounded-none border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center hover:border-[#024a9d] transition-all relative group">
                 <div className="absolute left-0 bottom-0 w-full h-1 bg-[#024a9d] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
                 <h3 className="text-[#0f172a] group-hover:text-[#024a9d] transition-colors text-[34px] font-black mb-1">4.6★</h3>
                 <p className="text-[#475569] text-[12px] font-bold uppercase tracking-wider">Customer Rating</p>
               </div>

               <div className="bg-white rounded-none border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center hover:border-[#d62423] transition-all relative group">
                 <div className="absolute left-0 bottom-0 w-full h-1 bg-[#d62423] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
                 <h3 className="text-[#0f172a] group-hover:text-[#d62423] transition-colors text-[34px] font-black mb-1">250+</h3>
                 <p className="text-[#475569] text-[12px] font-bold uppercase tracking-wider">Cities Nationwide</p>
               </div>

            </div>
         </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
         <div className="max-w-[1200px] mx-auto text-center mb-5">
            
            {/* Top Badge */}
            <div className="bg-white border border-slate-200 text-[#024a9d] text-[11px] sm:text-[12px] font-black uppercase tracking-widest px-5 py-2.5 rounded-none mb-5 shadow-sm inline-flex items-center relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d62423]"></div>
              FAQS
            </div>
            
            <h2 className="text-[32px] sm:text-[42px] font-black text-[#0f172a] leading-tight mb-4 tracking-tight max-w-2xl mx-auto">
              Frequently Asked Questions
            </h2>
            <p className="text-[#64748b] text-[15px] sm:text-[16px] font-medium leading-relaxed max-w-2xl mx-auto mb-5">
              Everything you need to know about our staffing and hiring process.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#024a9d] to-[#d62423] mx-auto rounded-none"></div>
         </div>

         <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "How long does hiring take?", a: "Hiring typically takes 36–72 hours depending on urgency, location, profile availability and hiring model." },
              { q: "How long do I get support?", a: "Support duration depends on the selected service package. We assist with profile sharing, follow-ups and replacement support during the package validity period." },
              { q: "Do you provide replacement?", a: "Yes. Valid replacements are provided according to the selected service package and applicable terms." },
              { q: "What are the charges?", a: "Service charges depend on the number of staff required, salary offered and selected service support package." },
              { q: "Is accommodation mandatory?", a: "No. Accommodation is not mandatory for local staff. However, providing accommodation often helps attract better candidates and improves staff retention." },
              { q: "What is the refund policy?", a: "If no candidate profiles are shared, a 100% refund will be provided as per our refund policy. If profiles, trials or recruitment activities have already been conducted, refunds will be processed according to the applicable policy terms." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 border-l-4 border-l-transparent hover:border-l-[#d62423] rounded-none p-6 sm:p-8 shadow-sm hover:shadow-[0_10px_30px_-5px_rgba(214,36,35,0.08)] transition-all text-left">
                 <h3 className="font-extrabold text-[16.5px] text-[#024a9d] mb-3 flex items-start gap-3">
                    <span className="text-[#d62423] text-[18px]">Q.</span>
                    {faq.q}
                 </h3>
                 <p className="text-[#64748b] text-[14.5px] leading-[1.8] font-medium pl-7">
                   {faq.a}
                 </p>
              </div>
            ))}
         </div>
      </section>

      

    </main>
  );
}
