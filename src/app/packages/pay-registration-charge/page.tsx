"use client";
import React from 'react';
import Presence from '@/components/Presence';
import { Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';
import IndiaMapSVG from '@/components/IndiaMapSVG';
import ServiceLeadForm from '@/components/forms/ServiceLeadForm';

export default function PayRegistrationChargePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden selection:bg-blue-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0b519d] pt-24 pb-0 lg:pt-[140px] md:pt-[160px] lg:pb-0 overflow-hidden flex items-end">
        {/* Decorative Desktop Background Elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[100%] bg-blue-500/10 blur-[100px] pointer-events-none hidden lg:block"></div>
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-cyan-400/10 blur-[120px] pointer-events-none hidden lg:block"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center pt-8 sm:pt-12">
            <div className="pb-12 lg:pb-24 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] mb-6 tracking-tight relative">
                Unlock Your Culinary <br className="hidden lg:block"/> Journey with <br className="hidden lg:block"/>
                <span className="text-blue-200">Zomocook Partner</span>
              </h1>
              <p className="text-white text-base sm:text-lg lg:text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-95">
                Explore our Complete Chef Solutions Specially for HoReCa, Domestic House cook and Chef on Demands for Special Occasion.
              </p>
            </div>
            
            {/* Image aligned to right */}
            <div className="flex justify-center lg:justify-end items-center h-full w-full relative pb-6 lg:pb-12 mt-2 sm:mt-0 lg:-mt-2">
              <div className="relative z-10 rounded-none-[20px] sm:rounded-none-[24px] p-1 sm:p-1.5 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform transition-transform duration-700 hover:scale-105 hover:-translate-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=800&auto=format&fit=crop" 
                  alt="Professional Chef Partner"
                  className="w-[200px] h-[270px] sm:w-[300px] sm:h-[380px] lg:w-[360px] lg:h-[440px] object-cover object-top rounded-none-[16px] sm:rounded-none-[20px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REGISTRATION FORM (Optimized for Desktop) */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-white relative z-20 -mt-2 sm:-mt-8 rounded-none-none sm:rounded-none-t-[48px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-[#024a9d] text-[24px] sm:text-3xl font-black mb-2 tracking-tight">Registration Charge</h2>
            <p className="text-slate-600 font-bold text-[13px] sm:text-base">We Provide One stop Complete HoReCa solution</p>
            <div className="w-12 sm:w-16 h-1 mt-4 bg-blue-500 mx-auto rounded-none-none"></div>
          </div>
          
          <div className="bg-white lg:shadow-2xl lg:shadow-blue-900/5 lg:border lg:border-slate-100 rounded-none-none p-2 lg:p-12">
            <ServiceLeadForm />
          </div>
        </div>
      </section>

      {/* 3. OUR FOOTPRINTS (Desktop Split Layout) */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-[#024a9d] text-[28px] sm:text-3xl lg:text-4xl font-black mb-4 tracking-tight leading-tight">
              Our Footprints
            </h2>
            <p className="text-slate-600 text-[13px] sm:text-base font-medium leading-relaxed mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0">
              Zomocook extends its expertise in chef consultancy services to a wide array of establishments, including hotels, restaurants, cafes and individuals. We boast a cadre of highly experienced chefs adapt to catering to commercial and personal culinary needs, offering personalized home cooking and convenient food deliver services.
            </p>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 text-left bg-white p-5 sm:p-6 rounded-none-none shadow-lg shadow-slate-200/50 border border-slate-100">
              <div>
                <div className="text-[#024a9d] text-2xl sm:text-4xl font-black mb-1">30+</div>
                <div className="text-slate-600 font-bold text-xs sm:text-sm uppercase tracking-wider">Cities</div>
              </div>
              <div>
                <div className="text-[#024a9d] text-2xl sm:text-4xl font-black mb-1">700+</div>
                <div className="text-slate-600 font-bold text-xs sm:text-sm uppercase tracking-wider">Restaurants</div>
              </div>
              <div>
                <div className="text-[#024a9d] text-2xl sm:text-4xl font-black mb-1">1.5k+</div>
                <div className="text-slate-600 font-bold text-xs sm:text-sm uppercase tracking-wider">Chefs</div>
              </div>
              <div>
                <div className="text-[#024a9d] text-2xl sm:text-4xl font-black mb-1">20k+</div>
                <div className="text-slate-600 font-bold text-xs sm:text-sm uppercase tracking-wider">People Served</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-[350px] lg:p-8 relative flex justify-center items-center mx-auto">
            {/* Soft decorative background for map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-100 rounded-none-none blur-[80px] pointer-events-none"></div>

            <div className="relative w-full aspect-square flex items-center justify-center opacity-100 drop-shadow-2xl">
              <IndiaMapSVG className="w-48 h-48 sm:w-64 sm:h-64 text-blue-200 fill-current opacity-60 drop-shadow-sm" />
              
              {/* Map dots representation */}
              <div className="absolute top-[25%] left-[45%] w-3 h-3 bg-blue-600 rounded-none-none shadow-[0_0_15px_rgba(37,99,235,1)] animate-pulse"></div>
              <div className="absolute top-[35%] left-[43%] w-2.5 h-2.5 bg-blue-500 rounded-none-none shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <div className="absolute top-[40%] left-[32%] w-3 h-3 bg-blue-600 rounded-none-none shadow-[0_0_15px_rgba(37,99,235,1)]"></div>
              <div className="absolute top-[45%] left-[47%] w-2 h-2 bg-blue-500 rounded-none-none shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <div className="absolute top-[42%] left-[55%] w-4 h-4 bg-red-500 rounded-none-none border-2 border-white shadow-[0_0_15px_rgba(239,68,68,1)] z-10 flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-none-none"></div></div>
              <div className="absolute top-[65%] left-[70%] w-3 h-3 bg-blue-600 rounded-none-none shadow-[0_0_15px_rgba(37,99,235,1)]"></div>
              <div className="absolute top-[52%] left-[62%] w-2.5 h-2.5 bg-blue-500 rounded-none-none shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
              <div className="absolute top-[75%] left-[38%] w-4 h-4 border-2 border-white bg-blue-600 rounded-none-none shadow-[0_0_15px_rgba(37,99,235,1)]"></div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. GOOGLE REVIEWS SECTION (Grid Layout on Desktop) */}
      <section className="py-16 lg:py-24 bg-white flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-widest uppercase mb-4">EXCELLENT</h3>
        
        {/* Five stars */}
        <div className="flex items-center gap-1.5 mb-3">
           {[...Array(5)].map((_, i) => (
             <svg key={i} className={`w-8 h-8 sm:w-10 sm:h-10 ${i===4 ? 'text-yellow-400/50' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20">
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
           ))}
        </div>
        <p className="text-slate-600 font-medium text-sm sm:text-base mb-6">Based on <strong className="text-black font-black">490 reviews</strong></p>
        
        {/* Google Logo */}
        <div className="flex items-center justify-center font-bold text-4xl sm:text-5xl tracking-tighter mb-12 lg:mb-16">
           <span className="text-[#4285F4]">G</span>
           <span className="text-[#EA4335]">o</span>
           <span className="text-[#FBBC05]">o</span>
           <span className="text-[#4285F4]">g</span>
           <span className="text-[#34A853]">l</span>
           <span className="text-[#EA4335]">e</span>
        </div>

        {/* Review Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
           
           {/* Card 1 */}
           <div className="bg-[#f5f5f5] hover:bg-white transition-colors duration-300 rounded-none-none p-6 sm:p-8 relative shadow-sm hover:shadow-xl border border-slate-100 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                 <div className="w-12 h-12 rounded-none-none bg-[#d35400] text-white flex items-center justify-center font-bold text-xl shadow-inner">A</div>
                 <div>
                   <h4 className="text-slate-900 font-bold text-base">Amit Yadav</h4>
                   <p className="text-slate-500 text-xs font-semibold">16/07/2025</p>
                 </div>
                 <div className="ml-auto">
                    <span className="text-xl font-bold text-[#4285F4]">G</span>
                 </div>
              </div>
              <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <CheckCircle2 className="w-4 h-4 text-blue-500 ml-1 fill-blue-500 stroke-white" />
              </div>
              <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-4 flex-1">
                I recently used Zomocook service for my baby birthday and I'm very happy with the experience. The chef arrived on time, was well-prepared, and cooked delicious food just the way we wanted. The dishes...
              </p>
              <button className="text-slate-400 hover:text-blue-500 transition-colors font-bold text-xs text-left w-max">Read more</button>
           </div>
           
           {/* Card 2 (Desktop Only Placeholder) */}
           <div className="hidden md:flex bg-[#f5f5f5] hover:bg-white transition-colors duration-300 rounded-none-none p-6 sm:p-8 relative shadow-sm hover:shadow-xl border border-slate-100 flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                 <div className="w-12 h-12 rounded-none-none bg-[#27ae60] text-white flex items-center justify-center font-bold text-xl shadow-inner">S</div>
                 <div>
                   <h4 className="text-slate-900 font-bold text-base">Sumit Sharma</h4>
                   <p className="text-slate-500 text-xs font-semibold">12/07/2025</p>
                 </div>
                 <div className="ml-auto">
                    <span className="text-xl font-bold text-[#4285F4]">G</span>
                 </div>
              </div>
              <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <CheckCircle2 className="w-4 h-4 text-blue-500 ml-1 fill-blue-500 stroke-white" />
              </div>
              <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-4 flex-1">
                Outstanding service. We hired a chef for our new cafe menu planning and the expertise provided was top-notch. Highly recommend Zomocook for any HoReCa operational needs.
              </p>
              <button className="text-slate-400 hover:text-blue-500 transition-colors font-bold text-xs text-left w-max">Read more</button>
           </div>

           {/* Card 3 (Desktop Only Placeholder) */}
           <div className="hidden lg:flex bg-[#f5f5f5] hover:bg-white transition-colors duration-300 rounded-none-none p-6 sm:p-8 relative shadow-sm hover:shadow-xl border border-slate-100 flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                 <div className="w-12 h-12 rounded-none-none bg-[#8e44ad] text-white flex items-center justify-center font-bold text-xl shadow-inner">P</div>
                 <div>
                   <h4 className="text-slate-900 font-bold text-base">Priya Singh</h4>
                   <p className="text-slate-500 text-xs font-semibold">05/07/2025</p>
                 </div>
                 <div className="ml-auto">
                    <span className="text-xl font-bold text-[#4285F4]">G</span>
                 </div>
              </div>
              <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <CheckCircle2 className="w-4 h-4 text-blue-500 ml-1 fill-blue-500 stroke-white" />
              </div>
              <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-4 flex-1">
                Found a great domestic cook through them within days. The replacement policy and the verification they do gave me a lot of confidence before hiring. Genuine premium service!
              </p>
              <button className="text-slate-400 hover:text-blue-500 transition-colors font-bold text-xs text-left w-max">Read more</button>
           </div>
           
        </div>

        {/* Carousel Indicator & Trustindex Button */}
        <div className="flex justify-center flex-col items-center gap-6 lg:gap-8">
           <div className="flex items-center gap-0 lg:hidden">
             <div className="w-8 h-[3px] bg-slate-500 rounded-none-l-full"></div>
             <div className="w-16 h-[3px] bg-slate-200 rounded-none-r-full"></div>
           </div>

           <button className="bg-[#0b5e43] hover:bg-[#074732] text-white px-6 py-2.5 sm:py-3 rounded-none-none font-bold text-sm sm:text-base items-center gap-2 flex shadow-lg hover:shadow-xl hover:-translate-y-px transition-all">
             Verified by Trustindex 
             <span className="border-2 border-white/80 rounded-none-none w-5 h-5 flex items-center justify-center text-xs font-black">i</span>
           </button>
        </div>
      </section>

      {/* 5. OUR PRESENCE SECTION */}
      <Presence />

    </div>
  );
}
