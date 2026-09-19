"use client";
import React from 'react';
import Link from 'next/link';
import ServiceLeadForm from '@/components/forms/ServiceLeadForm';
import { Network, Shuffle, UserPlus, MailOpen, Compass, HeartHandshake, Star } from 'lucide-react';

export default function BirthdayPartyChefPage() {
  const googleReviews = [
    {
      name: "Amit Yadav",
      date: "16/07/2025",
      initial: "A",
      bgClass: "bg-[#1374f6]",
      text: "I recently used Zomocook service for my baby birthday and I'm very happy with the experience. The food was excellent and authentic. Highly recommended."
    },
    {
      name: "Sneha Sharma",
      date: "02/08/2025",
      initial: "S",
      bgClass: "bg-red-500",
      text: "Booked a private chef for my husband's surprise party. The setup was incredibly smooth and the Continental dishes were an absolute hit. Will definitely use again!"
    },
    {
      name: "Rajiv Tiwari",
      date: "10/08/2025",
      initial: "R",
      bgClass: "bg-green-600",
      text: "Very professional service. The chef arrived on time, was extremely polite, and the paneer tikka was restaurant quality. Great value for money."
    },
    {
      name: "Pooja Verma",
      date: "25/08/2025",
      initial: "P",
      bgClass: "bg-orange-500",
      text: "Hassle-free catering experience for our family get-together. The customization options they provided for our dietary needs were fantastic."
    }
  ];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#1374f6] selection:text-white pb-0">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full bg-[#1374f6] text-white pt-[120px] pb-32 md:pt-[140px] md:pt-[160px] md:pb-40 overflow-hidden mt-8 md:mt-12">
        
        {/* Dashed Arrow Graphic - Absolute Positioned */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl hidden md:block opacity-70 pointer-events-none z-0">
          <svg viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 80 Q 200 -20 400 40 T 750 10" stroke="white" strokeWidth="2" strokeDasharray="8 8" fill="none" />
            <path d="M740 0 L755 10 L740 20" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-[36px] md:text-[54px] lg:text-[60px] font-black text-white leading-[1.1] mb-6 tracking-tight">
              Find A Perfect <br className="hidden sm:block" /> Chef for Birthday Party
            </h1>
            
            <p className="text-blue-100 text-[16px] md:text-[20px] font-semibold leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Tailored culinary expertise, just a click away!
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link href="#lead-form" className="bg-white text-[#1374f6] font-extrabold py-4 px-10 rounded-none shadow-lg transition-transform text-[16px] inline-flex items-center gap-2 hover:scale-105 active:scale-95">
                Hire Now <span className="text-xl leading-none">➔</span>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-[250px] md:h-[400px] mb-8 lg:mb-0 flex justify-center items-center order-1 lg:order-2">
            
            {/* Top Left Image Card */}
            <div className="absolute left-[5%] md:left-[10%] top-[5%] md:top-[10%] w-[180px] md:w-[280px] h-[120px] md:h-[180px] overflow-hidden border-4 border-white shadow-xl rotate-[-8deg] z-10 rounded-none">
               <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chefs" className="w-full h-full object-cover" />
            </div>
            
            {/* Bottom Right Image Card */}
            <div className="absolute right-[5%] md:right-[15%] bottom-[5%] md:bottom-[0%] w-[180px] md:w-[280px] h-[120px] md:h-[180px] overflow-hidden border-4 border-white shadow-xl rotate-[8deg] z-10 rounded-none">
               <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chefs Team" className="w-full h-full object-cover" />
            </div>

            {/* 5000+ Tag */}
            <div className="absolute right-0 top-[10%] md:top-[5%] text-white text-right hidden sm:block">
              <h3 className="text-2xl md:text-3xl font-black drop-shadow-md">5000+</h3>
              <p className="text-[12px] md:text-[14px] font-bold mt-[-2px]">People Served</p>
            </div>
          </div>
        </div>

        {/* Torn Paper Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[35px] sm:h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 300,10 450,70 C600,130 750,20 900,90 C1050,160 1200,40 1200,40 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* ================= WHY CHOOSE ZOMOCOOK ================= */}
      <section className="bg-white pt-16 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1374f6 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10 text-center">
          
          <div className="mb-16 md:mb-20">
            <h2 className="text-[32px] md:text-[46px] font-black text-[#1374f6] leading-tight mb-4">
              Why Choose Zomocook?
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-500 font-semibold max-w-2xl mx-auto">
              We bring professional culinary expertise right to your venue. Discover why thousands trust us for their special moments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
             {/* Feature 1 */}
             <div className="bg-white border-2 border-slate-100 p-8 shadow-md hover:shadow-2xl hover:border-[#1374f6] transition-all duration-300 transform hover:-translate-y-2 rounded-none flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-[#1374f6] flex items-center justify-center mb-6 rounded-none group-hover:bg-[#1374f6] group-hover:text-white transition-colors duration-300">
                  <UserPlus className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-extrabold text-[19px] text-[#000000] mb-3 tracking-wide">Wide Range of Services</h3>
                <p className="text-gray-600 text-[15px] font-medium leading-relaxed">
                  Chef for Birthday offers various cooking solutions, managing everything from meal preparation to serving.
                </p>
             </div>

             {/* Feature 2 */}
             <div className="bg-white border-2 border-slate-100 p-8 shadow-md hover:shadow-2xl hover:border-[#1374f6] transition-all duration-300 transform hover:-translate-y-2 rounded-none flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-[#1374f6] flex items-center justify-center mb-6 rounded-none group-hover:bg-[#1374f6] group-hover:text-white transition-colors duration-300">
                  <Compass className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-extrabold text-[19px] text-[#000000] mb-3 tracking-wide">Customized Packages</h3>
                <p className="text-gray-600 text-[15px] font-medium leading-relaxed">
                  Tailored plans for birthdays or special occasions, designed to meet individual preferences and themes.
                </p>
             </div>

             {/* Feature 3 */}
             <div className="bg-white border-2 border-slate-100 p-8 shadow-md hover:shadow-2xl hover:border-[#1374f6] transition-all duration-300 transform hover:-translate-y-2 rounded-none flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-[#1374f6] flex items-center justify-center mb-6 rounded-none group-hover:bg-[#1374f6] group-hover:text-white transition-colors duration-300">
                  <Network className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-extrabold text-[19px] text-[#000000] mb-3 tracking-wide">Smooth Setup</h3>
                <p className="text-gray-600 text-[15px] font-medium leading-relaxed">
                  Effortless integration of our cooking services into any event setup, making it completely hassle-free.
                </p>
             </div>

             {/* Feature 4 */}
             <div className="bg-white border-2 border-slate-100 p-8 shadow-md hover:shadow-2xl hover:border-[#1374f6] transition-all duration-300 transform hover:-translate-y-2 rounded-none flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-[#1374f6] flex items-center justify-center mb-6 rounded-none group-hover:bg-[#1374f6] group-hover:text-white transition-colors duration-300">
                  <MailOpen className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-extrabold text-[19px] text-[#000000] mb-3 tracking-wide">Creative Menus</h3>
                <p className="text-gray-600 text-[15px] font-medium leading-relaxed">
                  Our chefs specialize in crafting unique dishes and culinary concepts that bring joy to every celebration.
                </p>
             </div>

             {/* Feature 5 */}
             <div className="bg-white border-2 border-slate-100 p-8 shadow-md hover:shadow-2xl hover:border-[#1374f6] transition-all duration-300 transform hover:-translate-y-2 rounded-none flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-[#1374f6] flex items-center justify-center mb-6 rounded-none group-hover:bg-[#1374f6] group-hover:text-white transition-colors duration-300">
                  <Shuffle className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-extrabold text-[19px] text-[#000000] mb-3 tracking-wide">Flexible Options</h3>
                <p className="text-gray-600 text-[15px] font-medium leading-relaxed">
                  We cater to different tastes, dietary needs, and budgets, ensuring everyone has a satisfying meal.
                </p>
             </div>

             {/* Feature 6 */}
             <div className="bg-white border-2 border-slate-100 p-8 shadow-md hover:shadow-2xl hover:border-[#1374f6] transition-all duration-300 transform hover:-translate-y-2 rounded-none flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-[#1374f6] flex items-center justify-center mb-6 rounded-none group-hover:bg-[#1374f6] group-hover:text-white transition-colors duration-300">
                  <HeartHandshake className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-extrabold text-[19px] text-[#000000] mb-3 tracking-wide">Customer Support</h3>
                <p className="text-gray-600 text-[15px] font-medium leading-relaxed">
                  Committed to your happiness, we prioritize your needs from start to finish for a memorable experience.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* ================= FORM SECTION ================= */}
      <section id="lead-form" className="bg-slate-50 py-12 md:py-16 text-center">
        <div className="max-w-xl mx-auto px-5 sm:px-6">
           <h2 className="text-[24px] md:text-[32px] font-black text-[#1374f6] leading-snug mb-8">
            Get a Chef for Birthday Party in Just Two Steps...
          </h2>

          <div className="bg-white border-2 border-slate-200 shadow-lg px-5 md:px-8 py-8 text-left relative z-10 rounded-none">
             <h3 className="text-[18px] font-extrabold text-[#333] mb-6 pb-3 tracking-wide border-b border-slate-100">
               Personal Details
             </h3>
             
             {/* Using Global ServiceLeadForm */}
             <ServiceLeadForm />
          </div>
        </div>
      </section>

      {/* ================= GOOGLE REVIEWS ================= */}
      <section className="bg-white py-16 md:py-24 text-center overflow-hidden">
        <div className="max-w-xl mx-auto px-5">
           
           <h2 className="text-[24px] font-black text-black tracking-widest mb-3">EXCELLENT</h2>
           
           <div className="flex justify-center items-center gap-2 mb-3 text-[#fbbc04]">
             <Star className="fill-current w-8 h-8 md:w-10 md:h-10" />
             <Star className="fill-current w-8 h-8 md:w-10 md:h-10" />
             <Star className="fill-current w-8 h-8 md:w-10 md:h-10" />
             <Star className="fill-current w-8 h-8 md:w-10 md:h-10" />
             <Star className="fill-current w-8 h-8 md:w-10 md:h-10 stroke-gray-300" strokeWidth={1} style={{ clipPath: 'inset(0 50% 0 0)' }} /> 
           </div>
           
           <p className="text-[15px] md:text-[16px] font-bold text-gray-700 mb-4">Based on <span className="font-black text-black">490 reviews</span></p>
           
           <div className="flex justify-center items-center mb-8">
              <span className="text-[32px] md:text-[40px] font-bold tracking-tight">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
           </div>
        </div>

        {/* Scrolling Reviews Marquee */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marqueeX {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            display: flex;
            width: max-content;
            animation: marqueeX 35s linear infinite;
          }
          .marquee-container:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="w-full mt-6">
           <div className="marquee-container gap-6 px-4">
              {[...googleReviews, ...googleReviews, ...googleReviews, ...googleReviews].map((review, idx) => (
                <div key={idx} className="bg-white border-[2px] border-slate-100 p-6 md:p-8 shadow-md text-left relative rounded-none hover:shadow-xl transition-shadow w-[300px] md:w-[380px] shrink-0">
                  <div className="absolute top-5 right-5 text-2xl font-bold text-[#4285F4]">G</div>
                  
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 ${review.bgClass} text-white flex justify-center items-center font-bold text-xl rounded-none`}>
                      {review.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-[16px] text-black line-clamp-1">{review.name}</h4>
                      <p className="text-[13px] text-gray-500 font-semibold mt-0.5">{review.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 text-[#fbbc04] mb-3 md:mb-4">
                    <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                    <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                    <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                    <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                    <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                  </div>

                  <p className="text-[14px] md:text-[15px] text-gray-700 font-medium leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ================= OTHER SERVICES (More Links) ================= */}
      <section className="bg-slate-50 py-16 md:py-24 text-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
             {/* Card 1: Occasion */}
             <div className="flex flex-col items-center w-full bg-white p-5 shadow-md border border-slate-100 hover:shadow-xl transition-shadow rounded-none group transform hover:-translate-y-1 duration-300">
                <div className="w-full h-[180px] md:h-[200px] mb-5 overflow-hidden rounded-none">
                   <img src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Family gathering at dining table" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-black mb-2 tracking-tight group-hover:text-[#1374f6] transition-colors">Get a Chef For Occasion</h3>
                <p className="text-[13px] md:text-[14px] text-gray-500 font-semibold mb-5 tracking-wide">
                  Birthday <span className="mx-2">|</span> Anniversary <span className="mx-2">|</span> Events
                </p>
                <Link href="#lead-form" className="bg-[#1374f6] text-white font-bold py-2.5 px-8 inline-block shadow-sm hover:bg-blue-700 transition-colors text-[14px] rounded-none">
                  Hire Now
                </Link>
             </div>

             {/* Card 2: Regular Cook */}
             <div className="flex flex-col items-center w-full bg-white p-5 shadow-md border border-slate-100 hover:shadow-xl transition-shadow rounded-none group transform hover:-translate-y-1 duration-300">
                <div className="w-full h-[180px] md:h-[200px] mb-5 overflow-hidden rounded-none">
                   <img src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Regular Cook" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-black mb-2 tracking-tight group-hover:text-[#1374f6] transition-colors">Get a Regular Cook/Chef</h3>
                <p className="text-[13px] md:text-[14px] text-gray-500 font-semibold mb-5 tracking-wide">
                  Breakfast <span className="mx-2">|</span> Lunch <span className="mx-2">|</span> Dinner
                </p>
                <Link href="/services/hire-cook-for-daily-basis" className="bg-[#1374f6] text-white font-bold py-2.5 px-8 inline-block shadow-sm hover:bg-blue-700 transition-colors text-[14px] rounded-none">
                  Hire Now
                </Link>
             </div>

             {/* Card 3: Hotel & Restaurant */}
             <div className="flex flex-col items-center w-full bg-white p-5 shadow-md border border-slate-100 hover:shadow-xl transition-shadow rounded-none group transform hover:-translate-y-1 duration-300">
                <div className="w-full h-[180px] md:h-[200px] mb-5 overflow-hidden rounded-none">
                   <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Hotel Restaurant Chef" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-black mb-2 tracking-tight group-hover:text-[#1374f6] transition-colors">Chef For Hotel/Restaurant</h3>
                <p className="text-[13px] md:text-[14px] text-gray-500 font-semibold mb-5 tracking-wide">
                  Cafe <span className="mx-2">|</span> Restaurant <span className="mx-2">|</span> Resort
                </p>
                <Link href="/services/hire-chef-for-running-outlet" className="bg-[#1374f6] text-white font-bold py-2.5 px-8 inline-block shadow-sm hover:bg-blue-700 transition-colors text-[14px] rounded-none">
                  Hire Now
                </Link>
             </div>
           </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON (Keep globally square as requested) */}
      <a href="https://wa.me/919519808734" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform z-50 flex items-center justify-center rounded-none border border-[#128C7E]">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-8 h-8">
           <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413v-.1c-33 0-65.3-8.9-93.7-25.7l-6.7-4-69.6 18.3L72.4 333l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.9 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
         </svg>
      </a>

    </main>
  );
}
