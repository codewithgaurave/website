import React from "react";
import { Lightbulb, Target } from "lucide-react";

export default function AboutVisionMission() {
  return (
    <section className="py-20 lg:py-24 bg-[#fafbfc] relative overflow-hidden border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* VISION SECTION */}
        <div className="mb-20 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Side: Title */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Square Icon Wrapper */}
              <div className="w-[60px] h-[60px] bg-white text-[#d62423] rounded-none border border-slate-200 flex items-center justify-center mb-6 shadow-sm relative">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#d62423]"></div>
                 <Lightbulb className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-black text-[#0f172a] tracking-tight mb-3">
                Vision
              </h2>
              <div className="w-12 h-1 bg-slate-300 mb-4 mx-auto lg:mx-0"></div>
              <p className="text-[#024a9d] font-bold text-[11px] lg:text-[12px] uppercase tracking-widest">
                The One-Stop Chef Solution
              </p>
            </div>

            {/* Right Side: Content Box */}
            <div className="lg:col-span-8">
              <div className="bg-gradient-to-br from-[#024a9d] to-[#1e3a8a] p-8 sm:p-10 lg:p-12 rounded-none shadow-sm text-blue-50 relative overflow-hidden border border-[#024a9d]/50">
                {/* Square Geometric Accents instead of round blur */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-white/10 rounded-none transform rotate-12 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-white/10 rounded-none transform -rotate-12 pointer-events-none"></div>
                
                <p className="relative z-10 text-[15px] sm:text-[16px] leading-[1.8] font-medium text-center lg:text-left max-w-3xl mx-auto">
                  At Zomocook, our vision is to become the go-to platform for culinary expertise, 
                  where anyone can experience the joy of exquisite dining, whether at home, in a 
                  restaurant, or at a special event. We aim to empower chefs by providing them with 
                  a platform to showcase their skills, while ensuring that our customers enjoy memorable 
                  dining experiences. Beyond this, we envision Zomocook as a driver of positive change, 
                  creating job opportunities for culinary professionals across the country, and contributing 
                  to the growth and resilience of the hospitality industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION SECTION */}
        <div className="relative max-w-4xl mx-auto rounded-none shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] bg-white border border-slate-200 p-8 sm:p-14 overflow-hidden transition-all duration-300">
          
          {/* Decorative Square accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 translate-x-1/2 -translate-y-1/2 rounded-none pointer-events-none border border-slate-100"></div>
          
          <div className="flex flex-col items-center text-center relative z-10">
            {/* Square Icon Wrapper */}
            <div className="w-[60px] h-[60px] bg-white border border-slate-200 text-[#024a9d] rounded-none flex items-center justify-center mb-8 shadow-sm relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#024a9d]"></div>
              <Target className="w-7 h-7" strokeWidth={1.75} />
            </div>
            
            <h2 className="text-[32px] sm:text-[40px] font-black text-[#0f172a] tracking-tight mb-4">
              Our Mission
            </h2>
            <div className="w-16 h-[3px] bg-slate-300 mx-auto mb-5"></div>
            
            <p className="text-[#d62423] font-black text-[11px] sm:text-xs uppercase tracking-widest mb-8 w-full max-w-xs mx-auto pb-6 border-b border-slate-100">
              Crafting Memorable Dining Moments
            </p>
            
            <p className="text-slate-600 text-[14.5px] sm:text-[16px] leading-[1.8] font-medium px-4 opacity-95">
              Our mission is to connect customers with the best culinary experts, providing personalized, 
              high-quality services that cater to all culinary needs. We are dedicated to making the process 
              of hiring a chef as seamless and straightforward as possible, ensuring that our customers can enjoy 
              delicious, professionally prepared meals with ease. At the same time, we are committed to creating 
              meaningful employment opportunities for chefs, helping them to develop their careers and achieve 
              financial stability. By maintaining the highest standards of culinary excellence and customer 
              satisfaction, we strive to make a lasting impact on both our customers and the culinary professionals we serve.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
