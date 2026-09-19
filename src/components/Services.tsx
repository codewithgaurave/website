import React from 'react';
import { Briefcase, Home, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Commercial Hiring",
      description: "Hire chefs, helpers, waiters, housekeeping and management staff for hotels, restaurants and businesses.",
      btnText: "Continue",
      icon: Briefcase,
      href: "/services/hotel-chefs-waiter-provider",
    },
    {
      id: 2,
      title: "Domestic Home Cook Hiring",
      description: "Hire experienced home cooks and chefs for your regular household cooking requirements.",
      btnText: "Continue",
      icon: Home,
      href: "/services/hire-professional-chef-for-home",
    },
    {
      id: 3,
      title: "Daily Basis Staff Hiring",
      description: "Book professional staff for one or multiple days with flexible date and timing.",
      btnText: "Continue",
      icon: Calendar,
      href: "/services/hire-cook-for-daily-basis",
    },
    {
      id: 4,
      title: "Chef for Party",
      description: "Book a professional chef for birthdays, family functions, celebrations and special events.",
      btnText: "Continue",
      icon: Sparkles,
      href: "/services/book-chef-on-birthday-party",
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-black text-[#0f172a] tracking-tight mb-4">
            Professional Cooking Services
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed font-medium mb-6 max-w-2xl mx-auto">
            Hire verified chefs and cooks for homes, hotels, restaurants, cafes and special events across India.
          </p>
          <div className="w-16 h-[4px] rounded-full mx-auto bg-gradient-to-r from-[#024a9d] to-[#d62423]"></div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="group relative bg-white rounded-[24px] p-7 border border-[#e2e8f0] hover:border-red-200 transition-all duration-300 flex flex-col h-full hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                {/* Rounded Icon Container */}
                <div className="w-[62px] h-[62px] rounded-[18px] bg-[#fff1f1] flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#d62423]" strokeWidth={2} />
                </div>
                
                {/* Title & Description */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[20px] font-black text-[#0f2441] mb-3 leading-[1.3] tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-[13.5px] text-[#64748b] leading-[1.65] font-normal mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Continue Button */}
                <div className="mt-auto">
                  <Link 
                    href={service.href} 
                    className="inline-flex items-center gap-1.5 font-bold text-[14.5px] text-[#d62423] group-hover:gap-2.5 transition-all duration-200"
                  >
                    <span>{service.btnText}</span>
                    <ArrowRight className="w-4 h-4 text-[#d62423]" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
