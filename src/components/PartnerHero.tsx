import React from 'react';

export default function PartnerHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#024a9d] via-[#103061] to-[#0a1a36] pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-blue-500/20 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#d62423]/10 blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-12 items-center">
          {/* Left: Premium Text Content */}
          <div className="text-center lg:text-left order-1 lg:order-1 mb-8 sm:mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 w-max mx-auto lg:mx-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase">Global Partnership</span>
            </div>
            <h1 className="text-[32px] sm:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.2] lg:leading-[1.1] tracking-tight mb-4 sm:mb-6">
              Want to become Partner? <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-300">
                Join the Zomocook Family
              </span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed opacity-90">
              Unlock unparalleled growth by partnering with India's most expansive professional culinary network. Transform spaces into experiences.
            </p>
          </div>

          {/* Right: High-end Floating Chef Image */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-2 relative perspective-1000">
            <div className="relative z-10 rounded-3xl sm:rounded-[32px] p-1.5 sm:p-2 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] transform transition-transform duration-700 hover:rotate-1 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=800&auto=format&fit=crop"
                alt="Partner with Zomocoock"
                className="w-[240px] h-[300px] sm:w-[300px] sm:h-[400px] object-cover object-top rounded-2xl sm:rounded-[24px] transition-all duration-700"
              />
            </div>

            {/* Floating Stat Pill 1 */}
            <div className="absolute -left-2 sm:-left-6 lg:-left-12 top-10 sm:top-20 bg-white/95 backdrop-blur-lg px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white z-20 flex flex-col gap-0.5 sm:gap-1 items-center animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
              <span className="text-[#024a9d] font-black text-xl sm:text-2xl">4L.Cr</span>
              <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Industry Size</span>
            </div>

            {/* Floating Stat Pill 2 */}
            <div className="absolute -right-2 sm:-right-4 lg:-right-8 bottom-10 sm:bottom-16 bg-white/95 backdrop-blur-lg px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white z-20 flex flex-col gap-0.5 sm:gap-1 items-center animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
              <span className="text-[#d62423] font-black text-xl sm:text-2xl">Premium</span>
              <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] drop-shadow-xl">
          <path d="M0,60 C320,120 640,-40 960,30 C1280,100 1360,70 1440,60 L1440,120 L0,120 Z" fill="#f8fafc" opacity="0.4" />
          <path d="M0,80 C320,130 640,-20 960,40 C1280,100 1360,80 1440,70 L1440,120 L0,120 Z" fill="#f8fafc" opacity="0.7" />
          <path d="M0,100 C320,140 640,0 960,50 C1280,100 1360,90 1440,80 L1440,120 L0,120 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
