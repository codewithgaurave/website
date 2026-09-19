import React from 'react';
import { FileText, CreditCard, Users, Handshake } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      number: "1",
      title: "Share Requirement",
      description: "Tell us your staffing requirement, cuisine preference, location and service type.",
      icon: FileText,
      color: "text-[#024a9d]",
      bgIcon: "bg-blue-50"
    },
    {
      id: 2,
      number: "2",
      title: "Activate Package",
      description: "Select the suitable hiring package and activate your requirement.",
      icon: CreditCard,
      color: "text-emerald-700",
      bgIcon: "bg-emerald-50"
    },
    {
      id: 3,
      number: "3",
      title: "Receive Profiles",
      description: "Get shortlisted profiles and conduct interviews or trial sessions.",
      icon: Users,
      color: "text-amber-600",
      bgIcon: "bg-amber-50"
    },
    {
      id: 4,
      number: "4",
      title: "Final Joining",
      description: "Select the best candidate and complete the onboarding process.",
      icon: Handshake,
      color: "text-rose-600",
      bgIcon: "bg-rose-50"
    }
  ];

  return (
    <section className="py-24 bg-[#fafbfc] relative overflow-hidden border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[80px]">
          <h2 className="text-[34px] md:text-[42px] font-black text-[#0f172a] tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed font-medium mb-6 max-w-lg mx-auto">
            Get verified chefs and cooks in just a few simple steps.
          </p>
          <div className="w-16 h-[5px] rounded-none mx-auto bg-gradient-to-r from-[#024a9d] to-[#d62423]"></div>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-8">
          {/* Connector Line (Desktop Only) for premium workflow look */}
          <div className="hidden lg:block absolute top-[50%] left-[10%] right-[10%] h-[2px] border-b-2 border-dashed border-slate-300 z-0 opacity-50"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10 p-2 sm:p-4 lg:p-0">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.id} 
                  className="group relative bg-white rounded-none p-8 pt-10 text-center border border-slate-200 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.06)] hover:border-blue-200 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Floating Square Step Number Top Left (Sharp Classic) */}
                  <div className="absolute -top-6 -left-6 sm:-top-5 sm:-left-5 w-[46px] h-[46px] bg-[#024a9d] text-white font-black text-[22px] flex items-center justify-center rounded-none shadow-md group-hover:bg-[#d62423] transition-colors duration-300 ring-4 ring-white">
                    {step.number}
                  </div>

                  {/* Icon Wrapper (Square Classic) */}
                  <div className={`w-14 h-14 mx-auto mb-6 rounded-none flex items-center justify-center ${step.bgIcon} border border-transparent group-hover:border-slate-100 transition-colors duration-300`}>
                    <Icon className={`w-7 h-7 ${step.color} group-hover:scale-110 transition-transform`} strokeWidth={2} />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-[17px] font-extrabold text-[#0f172a] mb-3 leading-tight tracking-wide group-hover:text-[#024a9d] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
