import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Briefcase, ChevronRight, Star, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-36 mt-2 pb-10 lg:pt-32 lg:pb-16 lg:mt-0 overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-red-50/50 min-h-[85vh] flex items-center">
      {/* Premium Theme Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[80px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-50/40 blur-[100px]"></div>
      </div>
      
      {/* Subtle Background Rings (Classic Orbit Effect from Reference) */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl mt-2 lg:mt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 font-semibold text-[13px] mb-5 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              Trusted Home & Commercial Chef Services
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 leading-[1.18] mb-4 tracking-tight">
              Hire Professional <br/>
              <span className="text-[#024a9d]">Cooks & Chefs</span> For <br/>
              Domestic & Commercial
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-7 leading-relaxed font-medium max-w-md">
              Verified, experienced and background-checked cooks for homes, restaurants, cafés & events across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-7">
              {/* Hire Now Button - Square with Liquid Fill Animation */}
              <Link href="/contact" className="relative overflow-hidden group flex items-center justify-center gap-2 bg-[#d62423] text-white px-8 py-3.5 rounded-sm font-bold text-base shadow-[0_6px_16px_-4px_rgba(214,36,35,0.5)] transition-transform hover:-translate-y-0.5">
                <span className="relative z-10 flex items-center gap-2">
                  Hire Now
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Liquid Fill Element - High Contrast Dark Red */}
                <div className="absolute left-0 bottom-0 w-full h-full bg-[#7a0f12] translate-y-full rounded-t-[100%] transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-none z-0"></div>
              </Link>
              
              {/* Find a Job Button - Square with Liquid Fill Animation */}
              <Link href="/contact" className="relative overflow-hidden group flex items-center justify-center gap-2 bg-[#024a9d] text-white px-8 py-3.5 rounded-sm font-bold text-base shadow-[0_6px_16px_-4px_rgba(2,74,157,0.5)] transition-transform hover:-translate-y-0.5">
                <span className="relative z-10 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Find a Job
                </span>
                {/* Liquid Fill Element - High Contrast Dark Blue */}
                <div className="absolute left-0 bottom-0 w-full h-full bg-[#013575] translate-y-full rounded-t-[100%] transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-none z-0"></div>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 sm:gap-10">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> 100%
                </div>
                <span className="text-[13px] font-medium text-slate-500">Replacement Guarantee</span>
              </div>
              <div className="w-[1px] h-9 bg-slate-200"></div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> 96%
                </div>
                <span className="text-[13px] font-medium text-slate-500">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Content - Visuals */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto mt-12 lg:mt-0 select-none">
            
            {/* Subtle connecting orbit ring */}
            <div className="absolute inset-4 rounded-full border-[1px] border-slate-200/60 z-0"></div>

            {/* Main Central Image Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px]">
              <div className="w-full h-full rounded-full ring-[16px] ring-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden bg-slate-100 z-10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop" 
                  alt="Professional Chef"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Stat Card 1 - Top Left */}
            <div className="absolute top-[-5%] left-[5%] sm:top-[5%] sm:left-[-5%] bg-white px-4 py-3 sm:px-6 sm:py-5 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-50 z-20 flex flex-col items-center gap-1 transition-transform hover:scale-105 w-[160px] sm:w-[220px]">
              <div className="text-[#e11d48] font-black text-2xl sm:text-4xl">15,000+</div>
              <div className="text-[9px] sm:text-[11px] font-bold text-slate-500 text-center uppercase tracking-wide leading-tight">Chefs Successfully <br/> Placed</div>
            </div>

            {/* Stat Card 2 - Bottom Left */}
            <div className="absolute bottom-[10%] left-[5%] sm:bottom-[22%] sm:left-[-12%] bg-white px-4 py-3 sm:px-6 sm:py-5 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-50 z-20 flex flex-col items-center gap-1 transition-transform hover:scale-105 w-[180px] sm:w-[240px]">
              <div className="text-[#059669] font-black text-2xl sm:text-4xl">50,000+</div>
              <div className="text-[9px] sm:text-[11px] font-bold text-slate-500 text-center uppercase tracking-wide leading-tight">Verified Hospitality <br/> Professionals</div>
            </div>
            
            {/* Stat Card 3 - Middle Right */}
            <div className="absolute top-[45%] right-[5%] sm:right-[-12%] lg:right-[-20%] bg-white px-4 py-3 sm:px-6 sm:py-5 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-50 z-20 flex flex-col items-center gap-1 transition-transform hover:scale-105 w-[160px] sm:w-[210px]">
              <div className="text-[#1d4ed8] font-black text-2xl sm:text-[34px]">15,500+</div>
              <div className="text-[9px] sm:text-[11px] font-bold text-slate-500 text-center uppercase tracking-wide leading-tight">Hotel Partners <br/> Across India</div>
            </div>

            {/* Bottom Trusted Pill */}
            <div className="absolute -bottom-[5%] sm:-bottom-[2%] left-1/2 -translate-x-1/2 bg-white px-6 py-3 sm:px-10 sm:py-5 rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-50 z-30 text-center whitespace-nowrap transition-transform hover:scale-105 w-[90%] sm:w-auto">
              <p className="text-[13px] sm:text-base font-bold text-slate-800">Trusted Chef & Hospitality</p>
              <p className="text-[11px] sm:text-sm font-medium text-slate-500">Staffing Platform</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
