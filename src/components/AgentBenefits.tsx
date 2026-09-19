import React from 'react';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

export default function AgentBenefits() {
  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Extensive Network",
      description: "Gain access to thousands of verified chefs and premium Horeca clients across India."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Zero Investment",
      description: "Start your journey without any registration fees. Your earning potential is based purely on your effort."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Flexible Working",
      description: "Work from anywhere, anytime. Be your own boss and manage your schedule seamlessly."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Trusted Brand",
      description: "Leverage Zomocook's established reputation in the market to close deals faster and easier."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Why Partner with Zomocook?
          </h2>
          <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
            We provide our agents with the tools, reputation, and network they need to build a highly lucrative income stream.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:border-blue-200 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 block"
            >
              <div className="w-12 h-12 bg-white border border-slate-100 shadow-sm text-[#024a9d] rounded-xl flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
