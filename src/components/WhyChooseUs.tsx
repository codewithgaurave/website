import React from 'react';
import { UserCheck, Zap, Target, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      title: "Verified Professionals",
      description: "Background-verified chefs, cooks and hospitality staff for complete peace of mind.",
      icon: UserCheck,
      color: "text-[#024a9d]",
      bgWrapper: "bg-blue-50 border-blue-100",
      hoverBg: "group-hover:bg-[#024a9d]"
    },
    {
      id: 2,
      title: "Quick Hiring",
      description: "Receive shortlisted profiles quickly and hire staff without lengthy delays.",
      icon: Zap,
      color: "text-[#d62423]",
      bgWrapper: "bg-red-50 border-red-100",
      hoverBg: "group-hover:bg-[#d62423]"
    },
    {
      id: 3,
      title: "Specialized Talent",
      description: "Indian, Chinese, Tandoor, Continental, Bakery and multi-cuisine experts available.",
      icon: Target,
      color: "text-[#0f172a]",
      bgWrapper: "bg-slate-100 border-slate-200",
      hoverBg: "group-hover:bg-[#0f172a]"
    },
    {
      id: 4,
      title: "Dedicated Support",
      description: "Our team assists throughout the hiring process to ensure successful placements.",
      icon: HeartHandshake,
      color: "text-[#059669]",
      bgWrapper: "bg-emerald-50 border-emerald-100",
      hoverBg: "group-hover:bg-[#059669]"
    }
  ];

  return (
    <section className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[80px]">
          <h2 className="text-[34px] md:text-[42px] font-black text-[#0f172a] tracking-tight mb-4">
            Why Choose Zomocook?
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed font-medium mb-6 max-w-2xl mx-auto">
            India's trusted platform for hiring professional chefs, cooks and hospitality staff.
          </p>
          <div className="w-16 h-[5px] rounded-none mx-auto bg-gradient-to-r from-[#024a9d] to-[#d62423]"></div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div 
                key={reason.id}
                className="group relative bg-[#fafcff] rounded-none p-8 pt-10 border border-slate-200 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Thin top accent line representing the reason color */}
                <div className={`absolute top-0 left-0 w-full h-1 opacity-0 ${reason.hoverBg} group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Square Icon Wrapper */}
                <div className={`w-[60px] h-[60px] rounded-none flex items-center justify-center mb-6 border ${reason.bgWrapper} group-hover:border-transparent ${reason.hoverBg} transition-all duration-300 group-hover:-translate-y-1 shadow-sm`}>
                  <Icon className={`w-8 h-8 ${reason.color} group-hover:text-white transition-colors`} strokeWidth={1.75} />
                </div>
                
                {/* Content */}
                <h3 className="text-[20px] font-extrabold text-[#0f172a] mb-3 group-hover:text-slate-800 transition-colors tracking-wide">
                  {reason.title}
                </h3>

                <div className="w-8 h-0.5 bg-slate-200 mx-auto mb-4 group-hover:bg-slate-400 transition-colors"></div>

                <p className="text-[14px] text-slate-500 font-medium leading-[1.7]">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
