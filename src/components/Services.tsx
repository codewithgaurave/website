"use client";
import React, { useState } from 'react';
import { Briefcase, Home, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HotelStaffHiringModal from '@/components/modals/HotelStaffHiringModal';

export default function Services() {
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: "Hotel Staff Service",
      description: "Chef, Waiter, Helper & Kitchen Staff available on urgent.",
      btnText: "Continue",
      icon: Briefcase,
      isModal: true,
      href: "#",
    },
    {
      id: 2,
      title: "Homecook Service",
      description: "Full-Time, Part-Time, Live-In and Family Cook Services. Book Now",
      btnText: "Continue",
      icon: Home,
      isModal: false,
      href: "/services/hire-professional-chef-for-home",
    },
    {
      id: 3,
      title: "Daily Basis staff",
      description: "Reliable daily cooking solutions for homes, offices and businesses.",
      btnText: "Continue",
      icon: Calendar,
      isModal: false,
      href: "/services/hire-cook-for-daily-basis",
    },
    {
      id: 4,
      title: "Chef for Occasion",
      description: "Private chefs for birthdays, house parties, family Events.",
      btnText: "Continue",
      icon: Sparkles,
      isModal: false,
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
                onClick={() => {
                  if (service.isModal) {
                    setIsHotelModalOpen(true);
                  }
                }}
                className={`group relative bg-white rounded-[24px] p-7 border border-[#e2e8f0] hover:border-red-200 transition-all duration-300 flex flex-col h-full hover:shadow-[0_16px_35px_rgba(214,36,35,0.08)] hover:-translate-y-1.5 ${
                  service.isModal ? 'cursor-pointer' : ''
                }`}
              >
                {/* Rounded Icon Container */}
                <div className="w-[62px] h-[62px] rounded-[18px] bg-[#fff1f1] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-[#d62423]" strokeWidth={2} />
                </div>
                
                {/* Title & Description */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[20px] font-black text-[#0f2441] mb-3 leading-[1.3] tracking-tight group-hover:text-[#d62423] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-[13.5px] text-[#64748b] leading-[1.65] font-normal mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Button/Link */}
                <div className="mt-auto">
                  {service.isModal ? (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsHotelModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 font-bold text-[14.5px] text-[#d62423] group-hover:gap-2.5 transition-all duration-200 cursor-pointer"
                    >
                      <span>{service.btnText}</span>
                      <ArrowRight className="w-4 h-4 text-[#d62423]" strokeWidth={2.5} />
                    </button>
                  ) : (
                    <Link 
                      href={service.href} 
                      className="inline-flex items-center gap-1.5 font-bold text-[14.5px] text-[#d62423] group-hover:gap-2.5 transition-all duration-200"
                    >
                      <span>{service.btnText}</span>
                      <ArrowRight className="w-4 h-4 text-[#d62423]" strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hotel Staff Hiring Modal Popup */}
      <HotelStaffHiringModal 
        isOpen={isHotelModalOpen} 
        onClose={() => setIsHotelModalOpen(false)} 
      />
    </section>
  );
}

