import React from "react";
import { Sparkles, HelpingHand, Rocket, HeartHandshake, Quote } from "lucide-react";

export default function AboutStory() {
  return (
    <section id="story" className="py-20 lg:py-32 bg-[#fafbfc] relative overflow-hidden border-b border-slate-200">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-none blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Content */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-none bg-white border border-slate-200 shadow-sm text-[#0f172a] text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#d62423]" />
            Our Genesis
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-black text-[#0f172a] leading-[1.1] tracking-tight mb-6">
            The Exciting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024a9d] to-blue-600">Story</span> <br className="hidden sm:block" />
            Behind The Birth
          </h2>
          <p className="text-slate-500 font-medium text-[15px] sm:text-[17px] max-w-2xl mx-auto leading-relaxed">
            Drawn from challenging times during the 2021 pandemic, Zomocook arose from a passion for culinary arts and a sheer determination to bridge the gap in hospitality staffing.
          </p>
          <div className="w-16 h-[5px] rounded-none mx-auto bg-gradient-to-r from-[#024a9d] to-[#d62423] mt-8"></div>
        </div>

        {/* Story Journey Vertical Nodes */}
        <div className="relative">
          {/* Vertical Line - Square Style */}
          <div className="absolute left-8 lg:left-1/2 top-4 bottom-4 w-[2px] bg-slate-300 -translate-x-1/2 rounded-none hidden sm:block opacity-60"></div>

          <div className="space-y-12 sm:space-y-20">
            
            {/* Story Block 1 */}
            <div className="relative flex flex-col sm:flex-row items-center justify-between group">
              <div className="hidden sm:flex w-full lg:w-[45%] justify-end lg:pr-12 order-1 lg:order-1"></div>
              
              {/* Square Timeline Node */}
              <div className="absolute left-4 sm:left-8 lg:left-1/2 w-12 h-12 bg-white rounded-none border border-slate-200 shadow-sm flex items-center justify-center -translate-x-1/2 z-10 transition-colors duration-500 group-hover:border-[#024a9d]">
                <div className="w-8 h-8 rounded-none bg-[#024a9d] flex items-center justify-center text-white group-hover:bg-[#1e40af] transition-colors">
                  <Rocket className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>

              <div className="w-full lg:w-[45%] pl-16 sm:pl-24 lg:pl-12 order-2 lg:order-3">
                <div className="bg-white p-8 rounded-none border border-slate-200 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.06)] hover:border-[#024a9d] transition-all duration-300 relative">
                  <span className="text-[10px] font-black tracking-widest text-[#024a9d] uppercase mb-2 block">Mid-2021</span>
                  <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-3 group-hover:text-[#024a9d] transition-colors">Identifying the Gap</h3>
                  <p className="text-slate-500 text-[14.5px] leading-[1.7] font-medium">
                    Zomocook was born out of a deep love for culinary arts during the second wave of COVID-19 in India. Our founder, <strong className="text-[#0f172a]">Karmveer Yadav</strong>, noticed a huge gap in the market for a service that could provide expertly trained chefs for restaurants, hotels, and home kitchens.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Block 2 */}
            <div className="relative flex flex-col sm:flex-row items-center justify-between group">
              <div className="w-full lg:w-[45%] pl-16 sm:pl-24 lg:pl-0 lg:pr-12 order-2 lg:order-1 text-left lg:text-right">
                <div className="bg-white p-8 rounded-none border border-slate-200 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.06)] hover:border-[#d62423] transition-all duration-300 relative">
                  <span className="text-[10px] font-black tracking-widest text-[#d62423] uppercase mb-2 block">The Struggle</span>
                  <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-3 group-hover:text-[#d62423] transition-colors">Building the Foundation</h3>
                  <p className="text-slate-500 text-[14.5px] leading-[1.7] font-medium">
                    Karmveer reached out to close friends to create the platform's first version. Building it required heavy resources, so he borrowed money from friends who believed in his vision. Initially partnering with local tiffin services, three friends worked tirelessly to establish a strong foothold in the market.
                  </p>
                </div>
              </div>
              
              {/* Square Timeline Node */}
              <div className="absolute left-4 sm:left-8 lg:left-1/2 w-12 h-12 bg-white rounded-none border border-slate-200 shadow-sm flex items-center justify-center -translate-x-1/2 z-10 transition-colors duration-500 group-hover:border-[#d62423]">
                <div className="w-8 h-8 rounded-none bg-[#d62423] flex items-center justify-center text-white group-hover:bg-[#b91c1c] transition-colors">
                  <HelpingHand className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>

              <div className="hidden lg:block lg:w-[45%] order-3"></div>
            </div>

            {/* Story Block 3 */}
            <div className="relative flex flex-col sm:flex-row items-center justify-between group">
              <div className="hidden lg:block lg:w-[45%] order-1"></div>
              
              {/* Square Timeline Node */}
              <div className="absolute left-4 sm:left-8 lg:left-1/2 w-12 h-12 bg-white rounded-none border border-slate-200 shadow-sm flex items-center justify-center -translate-x-1/2 z-10 transition-colors duration-500 group-hover:border-[#0f172a]">
                <div className="w-8 h-8 rounded-none bg-[#0f172a] flex items-center justify-center text-white group-hover:bg-slate-800 transition-colors">
                  <HeartHandshake className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>

              <div className="w-full lg:w-[45%] pl-16 sm:pl-24 lg:pl-12 order-2 lg:order-3">
                <div className="bg-white p-8 rounded-none border border-slate-200 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.06)] hover:border-[#0f172a] transition-all duration-300 relative">
                  <span className="text-[10px] font-black tracking-widest text-[#0f172a] uppercase mb-2 block">The Turning Point</span>
                  <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-3 group-hover:text-[#024a9d] transition-colors">The Pillars of Support</h3>
                  <p className="text-slate-500 text-[14.5px] leading-[1.7] font-medium">
                    As friends left for government services, Karmveer became the sole driving force, registering Zomocook as an OPC. Fortunately, the pivotal financial backing of <strong className="text-[#024a9d] font-bold">Vishal Dwivedi</strong> kept the company afloat, while the technical expertise of <strong className="text-[#024a9d] font-bold">Ravi Kant</strong> shaped the platform.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Grand Quote Ending */}
          <div className="mt-24 pt-12 border-t border-slate-200 max-w-3xl mx-auto text-center relative px-4">
            <Quote className="w-10 h-10 text-slate-200 mx-auto mb-6 transform rotate-180" />
            <p className="text-[18px] sm:text-[22px] font-bold text-[#0f172a] leading-[1.6] italic">
              "Zomocook's story is not just about a business; it's about the power of friendship, determination, and the belief that with the right support, even the most ambitious dreams can become a reality."
            </p>
            <div className="mt-8 inline-block bg-[#0f172a] text-white px-6 py-3 rounded-none text-[11px] font-black tracking-widest uppercase shadow-md hover:bg-[#024a9d] transition-colors cursor-default">
              The Journey Continues
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
