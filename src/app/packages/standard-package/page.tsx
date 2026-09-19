import React from 'react';
import Link from 'next/link';

export default function StandardPackagePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-blue-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-12 lg:pt-[140px] md:pt-[160px] lg:pb-16 overflow-hidden bg-slate-950 text-white">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-none-none blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-none-none blur-[120px] mix-blend-screen pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left mt-8 lg:mt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Get Started with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Standard Package</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Our most popular recruitment support package designed for running businesses aiming for reliable, verified talent.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 rounded-none-none font-bold hover:scale-105 hover:bg-slate-50 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative group mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-none-none blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative rounded-none-none overflow-hidden border border-white/20 bg-slate-900/50 backdrop-blur-md shadow-2xl p-2 h-[350px] lg:h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1577219492769-b63a779fac28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=100" 
                alt="Professional Chef" 
                className="w-full h-full object-cover rounded-none-none opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-none-none bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON SECTION (Why Choose Us) --- */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#004bb4] tracking-tight mb-2 leading-tight">
              Why Choose Zomocook Over Job Portals?
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Complete recruitment support, not just profile access.
            </p>
            <div className="flex items-center justify-center max-w-[100px] mx-auto mt-3">
              <div className="w-2 h-2 rounded-none-none bg-[#16a34a]"></div>
              <div className="flex-1 h-0.5 bg-[#16a34a] mx-1"></div>
              <div className="w-2 h-2 rounded-none-none bg-[#16a34a]"></div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-none-none mb-8 shadow border border-slate-200 bg-white">
            <table className="w-full min-w-[600px] text-xs text-left border-collapse">
              <thead>
                <tr>
                  <th className="bg-slate-900 text-white px-3 py-2 font-bold w-[40%] rounded-none-none">Features</th>
                  <th className="bg-red-500 text-white px-3 py-2 font-bold text-center w-[25%] border-l border-red-400">Job Portals</th>
                  <th className="bg-[#16a34a] text-white px-3 py-2 font-bold text-center w-[35%] rounded-none-none border-l border-green-500">Zomocook Recruitment Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { feature: 'Access to Candidate Profiles', portal: '✅', zomo: '✅' },
                  { feature: 'Candidate Shortlisting', portal: '❌', zomo: '✅' },
                  { feature: 'Telephonic Screening', portal: '❌', zomo: '✅' },
                  { feature: 'Candidate Verification (Availability & Interest)', portal: '❌', zomo: '✅' },
                  { feature: 'Trial / Interview Coordination', portal: '❌', zomo: '✅' },
                  { feature: 'Joining Assistance', portal: '❌', zomo: '✅' },
                  { feature: 'Replacement Support', portal: '❌', zomo: '✅' },
                  { feature: 'Refund Policy', portal: '❌', zomo: '✅' },
                  { feature: 'Service Validity', portal: 'Around 30 Days', zomo: 'Up to 90 Days' },
                  { feature: 'Dedicated Support', portal: 'Limited', zomo: '✅' },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-1.5 bg-white group-hover:bg-slate-50 font-bold text-slate-800">{row.feature}</td>
                    <td className="px-3 py-1.5 bg-red-50 text-center font-bold border-l border-red-100 text-slate-700 whitespace-pre-line">
                      <span className={row.portal === '❌' ? 'text-red-500' : row.portal === '✅' ? 'text-green-500' : ''}>{row.portal}</span>
                    </td>
                    <td className="px-3 py-1.5 bg-green-50 text-center font-bold border-l border-green-100 text-slate-800 whitespace-pre-line">
                      <span className={row.zomo === '✅' ? 'text-green-500' : ''}>{row.zomo}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white rounded-none-none p-5 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-none-none -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10">
                <h3 className="flex items-center gap-2 text-xl font-black text-slate-900 mb-4 tracking-tight">
                   <span className="text-red-600 text-2xl">❌</span> Traditional Job Portals
                </h3>
                <ul className="space-y-2">
                  {[
                    'Provides access to candidate profiles only',
                    'No candidate shortlisting support',
                    'No telephonic screening',
                    'No candidate verification',
                    'No trial coordination',
                    'No joining assistance',
                    'No replacement support',
                    'Usually no refund policy',
                    'Limited service validity',
                    'Employer manages the entire hiring process'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs sm:text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-none-none bg-red-500 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 overflow-hidden relative rounded-none-none p-5 border border-slate-800 shadow-lg flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 blur-[50px] rounded-none-none transition-opacity duration-700 group-hover:opacity-100 opacity-60" />
              <div className="relative z-10">
                <h3 className="flex items-center gap-2 text-xl font-black text-white mb-4 tracking-tight">
                   <span className="bg-green-600 text-white rounded-none-none w-6 h-6 flex items-center justify-center text-sm shrink-0">✓</span> 
                   Zomocook Recruitment Service
                </h3>
                <ul className="space-y-2">
                  {[
                    'Requirement-based candidate shortlisting',
                    'Telephonic screening and interviews',
                    'Candidate availability verification',
                    'Trial scheduling coordination',
                    'Joining assistance and follow-up',
                    'Replacement support as per package terms',
                    'Transparent refund policy',
                    'Dedicated recruitment support',
                    'Service validity up to 90 days',
                    'Complete end-to-end hiring assistance'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 font-semibold text-xs sm:text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-none-none bg-blue-500 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT ARE YOU PAYING FOR --- */}
      <section className="py-6 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-none-none p-5 sm:p-6 border border-slate-200 shadow-md overflow-hidden relative group hover:shadow-lg transition-all duration-300">
             <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
             
             <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-black text-slate-900 mt-2 mb-3 tracking-tight">
               <span className="text-2xl">🛡️</span> What Are You Paying For?
             </h3>
             
             <p className="text-slate-600 font-medium text-sm sm:text-base leading-snug mb-5 max-w-3xl">
               Zomocook service charges cover the <strong className="text-green-600 font-extrabold">complete recruitment support process</strong>, not just access to candidate profiles.
             </p>

             <div className="mb-4">
               <p className="text-slate-500 font-semibold mb-3 text-xs uppercase tracking-wider">Our team assists with:</p>
               <ul className="grid sm:grid-cols-2 gap-2.5">
                 {[
                   'Candidate sourcing & shortlisting',
                   'Telephonic screening',
                   'Availability & interest verification',
                   'Trial scheduling coordination',
                   'Joining assistance & follow-ups',
                   'Replacement support as per package terms',
                   'Dedicated customer support',
                   'Transparent refund policy'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 px-3 rounded-none-none border border-slate-100">
                     <span className="bg-green-500 text-white rounded-none-none w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                     <span className="text-[13px] font-semibold text-slate-800">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <p className="text-slate-500 font-medium text-xs leading-snug mt-4 pt-4 border-t border-slate-100">
               This helps employers save valuable time, reduce hiring effort, and improve successful joining rates.
             </p>
          </div>

        </div>
      </section>

      {/* --- PRICING PACKAGES --- */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 relative bg-slate-50 overflow-hidden">
         <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#004bb4] mb-3 tracking-tight">
                Choose Your Recruitment Support Package
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5">
                <span className="text-[#f59e0b] text-base">★</span> 
                Trusted by Restaurants, Cloud Kitchens & Food Businesses Across India 
                <span className="text-[#f59e0b] text-base">★</span>
              </p>
              
              <div className="flex items-center justify-center max-w-[200px] mx-auto mt-6">
                 <div className="w-2.5 h-2.5 rounded-none-none bg-[#16a34a]"></div>
                 <div className="flex-1 h-1 bg-[#16a34a]"></div>
                 <div className="mx-2 text-xl">👨‍🍳</div>
                 <div className="flex-1 h-1 bg-[#16a34a]"></div>
                 <div className="w-2.5 h-2.5 rounded-none-none bg-[#16a34a]"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto items-stretch">
              
              {/* Basic Package */}
              <div className="bg-white rounded-none-none p-5 sm:p-6 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-blue-600 rounded-none-none"></div>
                <div className="mb-4 flex flex-col items-center border-b border-slate-100 pb-4">
                  <span className="bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest py-0.5 px-3 rounded-none-none mb-3">Most Affordable</span>
                  <h3 className="text-xl font-black text-slate-800 mb-1 flex items-center gap-1.5">
                    <span className="text-xl">🍳</span> Basic
                  </h3>
                  <p className="text-slate-500 text-[11px] font-bold mb-3">Best for Small Restaurants</p>
                  <div className="text-blue-700 text-base font-black tracking-tight leading-tight text-center">
                    40% of Hired Candidate Salary
                  </div>
                </div>
                
                <div className="space-y-3 flex-1">
                  {[
                    'One-Time Payment',
                    'Service Validity: 3 Months',
                    '2 Replacement Supports',
                    'Alternate Cook Service Support',
                    'Dedicated Recruitment Assistance'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-600 font-bold text-xs">
                      <svg className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      {item}
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-2.5 rounded-none-none font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow text-sm">
                  Activate Package
                </button>
              </div>

              {/* Standard Package */}
              <div className="bg-white rounded-none-none p-5 sm:p-6 border-2 border-blue-600 shadow-xl lg:scale-105 hover:-translate-y-1 transition-transform duration-300 relative flex flex-col h-full z-10">
                <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                   <div className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest py-1 px-3.5 rounded-none-none shadow-lg">
                      Most Popular
                   </div>
                </div>
                
                <div className="mb-4 flex flex-col items-center border-b border-slate-100 pb-4 mt-1">
                  <h3 className="text-xl font-black text-slate-800 mb-1 flex items-center gap-1.5">
                    <span className="text-xl">🥘</span> Standard
                  </h3>
                  <p className="text-slate-500 text-[11px] font-bold mb-3">Recommended for Most Businesses</p>
                  <div className="text-blue-700 text-base font-black tracking-tight leading-tight text-center">
                    60% of Hired Candidate Salary
                  </div>
                </div>
                
                <div className="space-y-3 flex-1">
                  {[
                    'One-Time Payment',
                    'Service Validity: 6 Months',
                    '4 Replacement Supports',
                    'Alternate Cook Service Support',
                    'Swiggy & Zomato Onboarding Support',
                    'FSSAI Registration Support'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-600 font-bold text-xs">
                      <svg className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      {item}
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-2.5 rounded-none-none font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md text-sm">
                  Activate Package
                </button>
              </div>

              {/* Premium Package */}
              <div className="bg-white rounded-none-none p-5 sm:p-6 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 relative flex flex-col h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-blue-600 rounded-none-none"></div>
                <div className="mb-4 flex flex-col items-center border-b border-slate-100 pb-4">
                  <span className="bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest py-0.5 px-3 rounded-none-none mb-3">Maximum Protection</span>
                  <h3 className="text-xl font-black text-slate-800 mb-1 flex items-center gap-1.5">
                    <span className="text-xl">🍽️</span> Premium
                  </h3>
                  <p className="text-slate-500 text-[11px] font-bold mb-3">Complete Hiring Peace of Mind</p>
                  <div className="text-blue-700 text-base font-black tracking-tight leading-tight text-center">
                    Equal to One Month Salary
                  </div>
                </div>
                
                <div className="space-y-3 flex-1">
                  {[
                    'One-Time Payment',
                    'Service Validity: 11 Months',
                    '6 Replacement Supports',
                    'Alternate Cook Service Support',
                    'Swiggy & Zomato Onboarding Support',
                    'FSSAI Registration Support',
                    'Premium Recruitment Support'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-600 font-bold text-xs">
                      <svg className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      {item}
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-2.5 rounded-none-none font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow text-sm">
                  Activate Package
                </button>
              </div>

            </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#f8fafc] to-white border border-slate-200 rounded-none-[2.5rem] p-10 sm:p-14 text-center text-slate-800 shadow-xl relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-tight relative z-10 leading-tight">
              Need a Cook, Chef, Waiter or Domestic Staff?
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 w-full relative z-10">
               {['Faster Hiring', 'Verified Candidates', 'Dedicated Support Team'].map((text, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none-none bg-blue-600"></span>
                    <span className="font-bold text-slate-600 text-sm sm:text-base">{text}</span>
                 </div>
               ))}
            </div>
            
            <button className="relative z-10 bg-blue-600 text-white px-10 py-4 rounded-none-none font-bold text-base shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
              Hire Staff Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
