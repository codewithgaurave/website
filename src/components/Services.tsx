import React from 'react';
import { Briefcase, Home, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Hotel Staff Service",
      description: "Chef, Waiter, Helper & Kitchen Staff available on urgent .",
      btnText: "Hire Hotel Staff",
      href: "/services/hotel-chefs-waiter-provider",
    },
    {
      id: 2,
      title: "Homecook Service",
      description: "Full-Time, Part-Time, Live-In and Family Cook Services. Book Now",
      btnText: "Hire Home Cook",
      href: "/services/hire-professional-chef-for-home",
    },
    {
      id: 3,
      title: "Daily Basis staff",
      description: "Reliable daily cooking solutions for homes, offices and businesses",
      btnText: "Book Daily Staff",
      href: "/services/hire-cook-for-daily-basis",
    },
    {
      id: 4,
      title: "Chef for Occasion",
      description: "Private chefs for birthdays, house parties, family Events.",
      btnText: "Hire Chef for Party",
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
            return (
              <div 
                key={service.id}
                className="group relative bg-white rounded-[22px] p-7 border-2 border-[#1e293b] hover:border-[#d62423] transition-all duration-300 flex flex-col h-full hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                {/* Title & Description */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[22px] font-black text-[#1e293b] mb-4 leading-[1.3] tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-[14px] text-[#475569] leading-[1.65] font-medium mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Red Button */}
                <div className="mt-auto">
                  <Link 
                    href={service.href} 
                    className="inline-flex items-center justify-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-5 py-3 rounded-[8px] font-bold text-[14px] shadow-sm transition-all duration-200 group-hover:shadow-[0_4px_12px_rgba(214,36,35,0.35)]"
                  >
                    <span>{service.btnText}</span>
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
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
