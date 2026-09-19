import React from 'react';
import { Building2, UtensilsCrossed, Coffee, Home } from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      id: 1,
      name: "Hotels",
      description: "Luxury, business, boutique and budget hotel staffing solutions.",
      icon: Building2,
      color: "text-[#024a9d]",
      bgColor: "bg-blue-50",
      borderColor: "group-hover:border-[#024a9d]",
      hoverBg: "group-hover:bg-[#024a9d]"
    },
    {
      id: 2,
      name: "Restaurants",
      description: "Chefs, cooks, waiters and kitchen staff for restaurants.",
      icon: UtensilsCrossed,
      color: "text-[#d62423]",
      bgColor: "bg-red-50",
      borderColor: "group-hover:border-[#d62423]",
      hoverBg: "group-hover:bg-[#d62423]"
    },
    {
      id: 3,
      name: "Cafés",
      description: "Baristas, cooks and service staff for cafés and bakeries.",
      icon: Coffee,
      color: "text-[#0f172a]",
      bgColor: "bg-slate-100",
      borderColor: "group-hover:border-[#0f172a]",
      hoverBg: "group-hover:bg-[#0f172a]"
    },
    {
      id: 4,
      name: "Homes",
      description: "Home cooks, private chefs and domestic kitchen staff.",
      icon: Home,
      color: "text-[#059669]",
      bgColor: "bg-emerald-50",
      borderColor: "group-hover:border-[#059669]",
      hoverBg: "group-hover:bg-[#059669]"
    }
  ];

  return (
    <section className="py-24 bg-[#fafbfc] relative overflow-hidden border-t border-slate-200">
      
      {/* Decorative background blurs to keep the premium theme consistent */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-blue-100/30 rounded-none blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-red-50/30 rounded-none blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[80px]">
          <h2 className="text-[34px] md:text-[42px] font-black text-[#0f172a] tracking-tight mb-4">
            Industries We Serve
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed font-medium mb-6 max-w-2xl mx-auto">
            We help hotels, restaurants, cafés, and households hire verified cooks, chefs, waiters, and hospitality professionals quickly and efficiently.
          </p>
          
          <div className="w-16 h-[5px] rounded-none mx-auto bg-gradient-to-r from-[#d62423] to-[#024a9d]"></div>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div 
                key={industry.id}
                className={`group bg-white p-8 pt-10 rounded-none border border-slate-200 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden ${industry.borderColor}`}
              >
                
                {/* Thin top accent line representing the industry color */}
                <div className={`absolute top-0 left-0 w-full h-1 opacity-0 ${industry.hoverBg} group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Premium Square Icon Wrapper */}
                <div className={`w-[60px] h-[60px] ${industry.bgColor} rounded-none flex items-center justify-center mb-6 shadow-sm border border-transparent group-hover:border-transparent transition-all duration-300 group-hover:scale-110 mx-auto`}>
                  <Icon className={`w-8 h-8 ${industry.color} transition-colors`} strokeWidth={1.75} />
                </div>
                
                {/* Card Text Content */}
                <h3 className="text-[20px] font-extrabold text-[#0f172a] text-center mb-3 group-hover:text-slate-800 transition-colors tracking-wide">
                  {industry.name}
                </h3>
                
                <div className="w-8 h-0.5 bg-slate-300 mx-auto mb-4 group-hover:bg-slate-400 transition-colors"></div>

                <p className="text-[14px] text-slate-500 text-center leading-[1.7] font-medium">
                  {industry.description}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
