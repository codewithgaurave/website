import React from "react";
import { ArrowDown } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#024a9d] to-blue-900 pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden border-b-[8px] border-[#d62423]">
      {/* Background Abstract Shapes for Premium Feel (Squared) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-none bg-blue-400/10 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-none bg-red-400/10 blur-[100px]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-8">
          
          {/* Left Side: Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-black/20 backdrop-blur-md border border-white/10 mb-6 w-max mx-auto lg:mx-0 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-none bg-yellow-400 animate-pulse"></span>
              <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Est. 2021 India</span>
            </div>
            
            <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-black text-white mb-4 tracking-tight leading-[1.1]">
              About <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Company</span>
            </h1>
            
            <div className="w-12 h-1 bg-white mb-6 mx-auto lg:mx-0"></div>

            <p className="text-blue-50/90 text-[15px] sm:text-[16px] font-medium leading-[1.7] max-w-lg mx-auto lg:mx-0 mb-8">
              Welcome to Zomocook – Your Own Cook! Our chef consultancy service
              aims to provide you with the best culinary experts for your hotel,
              restaurant, cafe, or even for your home. With our diverse offerings, you
              can enjoy the benefits of highly experienced chefs and ensure a
              delightful dining experience for your valued customers or yourself.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a 
                href="#story" 
                className="inline-flex items-center gap-3 bg-white text-[#0f172a] uppercase tracking-wider font-extrabold text-[12px] px-8 py-3.5 rounded-none shadow-sm transition-all duration-300 hover:shadow-md hover:bg-slate-100 relative group overflow-hidden"
              >
                Read our story
                <div className="w-6 h-6 rounded-none bg-slate-200 flex items-center justify-center group-hover:bg-[#024a9d] group-hover:text-white transition-colors">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                {/* Square hover slide effect */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d62423] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            </div>
          </div>

          {/* Right Side: Image/Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative w-[280px] h-[320px] sm:w-[320px] sm:h-[380px] lg:w-[360px] lg:h-[420px] z-10 group">
              {/* Decorative Background Square */}
              <div className="absolute top-4 -right-4 w-full h-full border-2 border-white/20 rounded-none z-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"></div>
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-none overflow-hidden shadow-2xl z-10 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#024a9d]/60 to-transparent z-10 pointer-events-none"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop" 
                  alt="Professional Chef"
                  className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Square Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-none shadow-xl border border-slate-200 z-20 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#024a9d] rounded-none flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                </div>
                <div>
                  <p className="text-[14px] font-black text-slate-900 leading-tight">Highly</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">Experienced</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
