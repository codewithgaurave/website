import React from 'react';
import { Shield, HeartHandshake, MapPin, Star } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      id: 1,
      icon: Shield,
      value: "1,25,000+",
      label: "Verified Staff",
      showDivider: true
    },
    {
      id: 2,
      icon: HeartHandshake,
      value: "15,500+",
      label: "Horeca Partners",
      showDivider: true
    },
    {
      id: 3,
      icon: MapPin,
      value: "250+",
      label: "Cities Served",
      showDivider: true
    },
    {
      id: 4,
      icon: Star,
      value: "4.6 / 5",
      label: "Global Rating",
      showDivider: false,
      iconColor: "text-[#fbbf24] fill-[#fbbf24]"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] relative overflow-hidden border-y border-[#1e3a8a]">
      
      {/* Ambient Glows for premium feel */}
      <div className="absolute top-[0%] left-[10%] w-[300px] h-[300px] bg-blue-400/10 rounded-none blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-[0%] right-[10%] w-[400px] h-[400px] bg-red-500/10 rounded-none blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-black text-white tracking-wider mb-4 drop-shadow-sm leading-tight">
            Trusted By Thousands <span className="text-[#ef4444]">Across India</span>
          </h2>
          <p className="text-blue-100 text-[15px] md:text-[17px] font-medium opacity-90 max-w-2xl mx-auto tracking-wide">
            Connecting Homes, Hotels & Restaurants with Verified Professionals
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="relative flex flex-col items-center text-center group">
                
                {/* Square Icon Container */}
                <div className="w-[72px] h-[72px] rounded-none bg-white/5 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300 shadow-md">
                  <Icon className={`w-8 h-8 ${stat.iconColor ? stat.iconColor : 'text-white'}`} strokeWidth={1.5} />
                </div>
                
                {/* Value & Label */}
                <h3 className="text-[34px] lg:text-[40px] font-black text-white mb-1.5 tracking-tight drop-shadow-sm group-hover:-translate-y-0.5 transition-transform">
                  {stat.value}
                </h3>
                <p className="text-[12px] font-bold tracking-widest uppercase text-blue-200">
                  {stat.label}
                </p>

                {/* Dividing Line (hidden on mobile and last item) */}
                {stat.showDivider && (
                  <div className="hidden lg:block absolute right-[-12px] top-[15%] h-[70%] w-[1px] bg-white/10"></div>
                )}
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
