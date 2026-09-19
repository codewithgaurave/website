import React from 'react';
import { Star, BadgeCheck, Info } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      avatar: "t",
      avatarBg: "bg-[#2563eb]", // Blue
      name: "theveggieslife",
      date: "17/07/2025",
      text: "Zomcook is Excellent consultant for Hospitality industry from the menu planning, costing, staffing and also help t..."
    },
    {
      id: 2,
      avatar: "A",
      avatarBg: "bg-[#c2410c]", // Burnt orange
      name: "Amit Yadav",
      date: "16/07/2025",
      text: "I recently used Zomocook service for my baby birthday and I'm very happy with the experience. The arrived on time, was wel..."
    },
    {
      id: 3,
      avatar: "P", 
      avatarBg: "bg-[#eab308]", // Yellow
      name: "Pranav Maheshwari",
      date: "13/06/2025",
      text: "On time and a great experience. The chef was highly professional and made sure all the dishes were prepared exa..."
    },
    {
      id: 4,
      avatar: "S", 
      avatarBg: "bg-[#ef4444]", // Red
      name: "Sneha Verma",
      date: "05/05/2025",
      text: "Brilliant culinary service for our house party! Highly recommended to anyone looking for a stress-free hosting expe..."
    }
  ];

  // We loop the reviews multiple times to ensure seamless infinite scrolling
  const infiniteReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  // Helper for generating the fake Google logo Text
  const GoogleLogo = () => (
    <div className="text-[28px] font-bold tracking-tighter mt-1 select-none flex items-center">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335] mr-1">e</span>
    </div>
  );

  return (
    <section className="py-24 bg-white relative">
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-container {
          display: flex;
          width: max-content;
          animation: scrollMarquee 35s linear infinite;
        }
        .animate-marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10 w-full overflow-hidden flex flex-col justify-center">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-14 justify-center">
          
          {/* Left Summary Box */}
          <div className="flex flex-col items-center lg:items-start lg:w-[200px] lg:shrink-0 lg:pt-8 mb-8 lg:mb-0 relative z-20 bg-white lg:bg-transparent">
            <h3 className="font-black text-[22px] text-[#0f172a] tracking-wider mb-2">EXCELLENT</h3>
            
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-7 h-7 bg-[#fbbc04] flex items-center justify-center rounded-sm">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
              ))}
            </div>
            
            <p className="text-[13px] text-slate-600 font-medium mb-1">
              Based on <span className="font-bold text-slate-900">490 reviews</span>
            </p>
            <GoogleLogo />
          </div>

          {/* Right Cards Infinite Marquee Slider Container */}
          <div className="relative w-full overflow-hidden">
            {/* Left and Right Fade overlays for smoother transition */}
            <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden lg:block"></div>
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden lg:block"></div>
            
            <div className="animate-marquee-container gap-5 pb-4 pt-4 px-2 -mx-2 items-stretch">
              {infiniteReviews.map((review, idx) => (
                <div 
                  key={`${review.id}-${idx}`} 
                  className="shrink-0 w-[280px] sm:w-[310px] bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.12)] transition-all duration-300 relative cursor-pointer"
                >
                  
                  {/* Card Header */}
                  <div className="flex items-start gap-3 mb-4">
                    {/* Avatar */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-[17px] shrink-0 mt-1 ${review.avatarBg}`}>
                      {review.avatar}
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="font-bold text-[#0f172a] text-[15px] leading-tight">
                        {review.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Absolute Top Right Google G */}
                  <div className="absolute top-6 right-6 flex items-center justify-center w-5 h-5 bg-blue-50 bg-opacity-50 rounded-full">
                     <span className="text-[15px] font-bold text-[#4285F4] leading-none">G</span>
                  </div>

                  {/* Stars & Verified */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-[14px] h-[14px] text-[#fbbc04] fill-[#fbbc04]" />
                    ))}
                    <BadgeCheck className="w-[14px] h-[14px] text-[#2563eb] fill-white ml-2" />
                  </div>

                  {/* Review Text */}
                  <div className="text-[13.5px] text-[#334155] font-medium leading-[1.6] mb-2 line-clamp-3">
                    {review.text}
                  </div>
                  <button className="text-[13px] text-slate-500 hover:text-[#0f172a] font-bold mt-1 tracking-wide">
                    Read more
                  </button>
                </div>
              ))}
            </div>

          </div>
          
        </div>

        {/* Custom Trustindex Scrollbar */}
        <div className="w-full lg:w-[calc(100%-250px)] mx-auto lg:ml-auto mt-6 relative h-5 flex items-center lg:pr-8">
           {/* Left arrow */}
           <div className="shrink-0 w-0 h-0 border-t-[5px] border-t-transparent border-r-[6px] border-r-gray-400 border-b-[5px] border-b-transparent"></div>
           
           {/* Thick Track */}
           <div className="w-full mx-2 h-[8px] bg-gray-400 rounded-full"></div>
           
           {/* Right arrow */}
           <div className="shrink-0 w-0 h-0 border-t-[5px] border-t-transparent border-l-[6px] border-l-gray-400 border-b-[5px] border-b-transparent"></div>

           {/* Badge right over the track */}
           <div className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-30">
              <div className="relative group/tooltip flex items-center cursor-pointer">
                <div className="flex items-center gap-1.5 bg-[#1b6b43] text-white px-3 py-1.5 rounded-[5px] text-[11.5px] font-bold shadow-md hover:bg-[#155334] transition-colors">
                    Verified by Trustindex <Info className="w-3.5 h-3.5 opacity-80" />
                </div>

                {/* Tooltip */}
                <div className="absolute right-0 bottom-full mb-3 w-[280px] bg-white border border-slate-200 rounded-lg p-4 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 origin-bottom-right z-50">
                  <div className="absolute right-6 -bottom-[6px] w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45"></div>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    <strong className="text-slate-900">Trustindex verified badge is the Universal Symbol of Trust.</strong> Only the greatest companies can get the verified badge who has a review score above 4.5, based on customer reviews over the past 12 months. <span className="font-bold underline cursor-pointer hover:text-slate-900">Read more</span>
                  </p>
                </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
