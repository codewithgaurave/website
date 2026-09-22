import React from 'react';

export default function Footprints() {
  const stats = [
    { value: "250+", label: "Cities" },
    { value: "2,580+", label: "Serving Restaurants" },
    { value: "12,500+", label: "Chefs Onboarded" },
    { value: "125,000+", label: "People Served" }
  ];

  // Radar pulse animation coordinates aligned with the official map dots
  const pulseLocations = [
    { top: '25.8%', left: '42%' }, // Punjab / Northern Hub
    { top: '36.5%', left: '41.5%' }, // Delhi NCR
    { top: '42.2%', left: '32.3%' }, // Rajasthan (Jaipur)
    { top: '41.2%', left: '51.2%' }, // Uttar Pradesh (Lucknow)
    { top: '52.4%', left: '44%' }, // Central India (Bhopal)
    { top: '52%', left: '62.2%' }, // Eastern Hub (Kolkata)
    { top: '43.8%', left: '83.6%' }, // North East (Guwahati)
    { top: '79.2%', left: '38%' }, // Southern Hub (Bengaluru)
  ];

  return (
    <section className="pt-8 pb-16 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight mb-8">
              Our Footprints
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-12">
              Zomocook extends its expertise in chef consultancy services to a wide array of establishments, including hotels, restaurants, cafes and individuals. We boast a cadre of highly experienced chefs adapt to catering to commercial and personal culinary needs, offering personalized home cooking and convenient food deliver services.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-3xl sm:text-[40px] font-black text-[#0f52ba] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[15px] font-bold text-slate-800">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Map */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto flex items-center justify-center">
            <div className="relative w-full max-w-[480px]">
              {/* Correct Official India Map with Full Boundaries and States */}
              <img 
                src="/india-map.png" 
                alt="ZomoCook Pan India Presence Map" 
                className="w-full h-auto object-contain drop-shadow-sm select-none"
              />

              {/* Subtle Live Radar Pulse Rings over Active Locations */}
              {pulseLocations.map((loc, index) => (
                <div 
                  key={index} 
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ top: loc.top, left: loc.left }}
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285f4] opacity-40"></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
