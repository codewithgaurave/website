"use client";
import React, { useState } from 'react';
import { ChefHat, Calendar, Shuffle, MessageCircleQuestion, Utensils, Star, ArrowRight, ShieldCheck, CheckSquare, Building2, CalendarDays, ChefHat as Hat } from 'lucide-react';
import Swal from 'sweetalert2';

export default function CookInBhopalPage() {
  const city = "Bhopal";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', requirement: '' });

  const handleChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleNext = () => {
      if(!formData.name || !formData.phone || !formData.email) {
          Swal.fire("Incomplete Details", "Please fill in your name, phone, and email to proceed.", "warning");
          return;
      }
      setStep(2);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
        await fetch('/api/contact', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: formData.name, 
                phone: formData.phone, 
                email: formData.email,
                sourceType: 'Hire Cook in ' + city + ' (Requ: ' + (formData.requirement || 'N/A') + ')',
                sourceUrl: window.location.href
            })
        });
        setStep(3);
    } catch (e) {
        Swal.fire("Error", "Something went wrong while submitting. Please try again.", "error");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans mt-[70px] sm:mt-20">
      
      {/* 1. HERO SECTION - CLEAN MINIMAL */}
      <div className="w-full bg-white pt-8 pb-12 px-4 border-b border-slate-100">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
             <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-[38px] sm:text-[46px] lg:text-[56px] font-bold text-slate-900 leading-[1.15] mb-6">
                    Hire The Perfect <br/> <span className="text-[#1b71f2]">Cook In Bhopal</span>
                </h1>
                <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                    Get access to premium, verified culinary experts instantly. Experience the authentic taste right at your home or business.
                </p>
                <button onClick={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})} className="inline-flex items-center gap-2 bg-[#1b71f2] text-white font-semibold text-[17px] py-4 px-10 rounded-none hover:opacity-90 transition-opacity">
                   Hire Now <ArrowRight className="w-5 h-5"/>
                </button>
                <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500"/> Verified</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500"/> Top Rated</span>
                </div>
             </div>
             <div className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-16">
                <img 
                    src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&w=900&q=80" 
                    className="w-full max-w-[650px] h-[340px] md:h-[420px] object-cover rounded-none shadow-xl border-2 border-slate-100" 
                    alt="Chefs in Kitchen" 
                />
             </div>
         </div>
      </div>

      {/* 2. WHY CHOOSE US - CLEAN GRID */}
      <div className="py-16 px-4 max-w-7xl mx-auto text-center">
          <h2 className="text-[32px] sm:text-[36px] font-bold text-slate-900 mb-10">Why Choose Zomocook?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                 { icon: <ChefHat className="w-7 h-7"/>, title: "Varied Expertise", desc: "Access a wide range of culinary styles and cuisines." },
                 { icon: <CheckSquare className="w-7 h-7"/>, title: "Custom Packages", desc: "Solutions perfectly tailored for restaurants or events." },
                 { icon: <Calendar className="w-7 h-7"/>, title: "Easy Integration", desc: "Seamless culinary processes for your daily operations." },
                 { icon: <Utensils className="w-7 h-7"/>, title: "Creative Menus", desc: "Innovative dishes crafted by highly skilled chefs." },
                 { icon: <Shuffle className="w-7 h-7"/>, title: "Flexible Options", desc: "Adaptability to different tastes and budget needs." },
                 { icon: <MessageCircleQuestion className="w-7 h-7"/>, title: "Customer Focused", desc: "We prioritize your satisfaction at every single step." }
              ].map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center bg-white p-6 rounded-none border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-14 h-14 rounded-none bg-[#f0f5ff] text-[#1b71f2] flex items-center justify-center mb-5">
                          {feature.icon}
                      </div>
                      <h3 className="text-[18px] font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-500 text-[15px] leading-relaxed">{feature.desc}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* 3. OUR SERVICES - SIMPLE CARDS */}
      <div className="max-w-7xl mx-auto px-4 pb-24 text-center border-b border-slate-200">
          <h2 className="text-[32px] sm:text-[36px] font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-500 text-lg mb-14">Tailored solutions for every culinary need</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <div className="bg-white border border-slate-100 p-4 rounded-none shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop" className="w-full rounded-none mb-5 object-cover h-[200px]" alt="HoReCa" />
                  <div className="flex items-center gap-3 mb-2 px-2">
                      <Building2 className="w-5 h-5 text-[#1b71f2]" />
                      <h3 className="font-bold text-[20px] text-slate-900 leading-none">For HoReCa</h3>
                  </div>
                  <p className="text-slate-500 font-medium text-[14px] mb-8 pl-10">Hotel | Restaurant | Cafe</p>
                  <button onClick={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})} className="mt-auto block w-full text-center bg-slate-50 text-[#1b71f2] font-semibold py-3.5 rounded-none hover:bg-blue-50 transition-colors">Hire Now</button>
              </div>
              
              <div className="bg-white border border-slate-100 p-4 rounded-none shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" className="w-full rounded-none mb-5 object-cover h-[200px]" alt="Occasion" />
                  <div className="flex items-center gap-3 mb-2 px-2">
                      <CalendarDays className="w-5 h-5 text-[#1b71f2]" />
                      <h3 className="font-bold text-[20px] text-slate-900 leading-none">For Occasion</h3>
                  </div>
                  <p className="text-slate-500 font-medium text-[14px] mb-8 pl-10">Birthday | Anniversary | Event</p>
                  <button onClick={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})} className="mt-auto block w-full text-center bg-slate-50 text-[#1b71f2] font-semibold py-3.5 rounded-none hover:bg-blue-50 transition-colors">Hire Now</button>
              </div>

              <div className="bg-white border border-slate-100 p-4 rounded-none shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" className="w-full rounded-none mb-5 object-cover h-[200px]" alt="Regular Cook" />
                  <div className="flex items-center gap-3 mb-2 px-2">
                      <Hat className="w-5 h-5 text-[#1b71f2]" />
                      <h3 className="font-bold text-[20px] text-slate-900 leading-none">Regular Cook</h3>
                  </div>
                  <p className="text-slate-500 font-medium text-[14px] mb-8 pl-10">Breakfast | Lunch | Dinner</p>
                  <button onClick={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})} className="mt-auto block w-full text-center bg-slate-50 text-[#1b71f2] font-semibold py-3.5 rounded-none hover:bg-blue-50 transition-colors">Hire Now</button>
              </div>
          </div>
      </div>
      
      {/* 4. SPLIT: REVIEWS & FORM */}
      <div id="booking-form" className="py-24 px-4">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* LEFT: Reviews */}
             <div className="flex flex-col justify-center h-full lg:pr-10 text-center lg:text-left">
                 <h2 className="text-[34px] md:text-[40px] font-bold text-slate-900 mb-6 leading-tight">Trust the best Cooks<br/>in Bhopal</h2>
                 <p className="text-slate-600 text-lg mb-12">Join hundreds of satisfied business owners and families who found their perfect match through our rigorous vetting process.</p>
                 
                 <div className="bg-white p-8 border border-slate-100 rounded-none shadow-sm relative text-left">
                     <div className="text-[28px] font-bold tracking-tighter mb-4 text-slate-800">
                         <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span> <span className="text-[17px] font-medium text-slate-500 ml-2 relative -top-1">Reviews</span>
                     </div>
                     <div className="flex items-center gap-3 mb-4">
                         <div className="flex text-yellow-400">
                             <Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/>
                         </div>
                         <div className="font-bold text-[16px] text-slate-700">Excellent 5.0</div>
                     </div>
                     <p className="text-slate-600 text-[15px] leading-relaxed mb-6 font-medium">"Zomocook is an excellent consultant for the hospitality industry... they helped with menu planning, staffing, and onboarding. A perfect solution for us!"</p>
                     
                     <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm">T</div>
                            <span className="font-bold text-slate-800 text-sm">theveggieslife</span>
                         </div>
                         <span className="text-xs font-semibold text-slate-400">17/07/2025</span>
                     </div>
                 </div>
             </div>

             {/* RIGHT: Minimal Form */}
             <div className="bg-white rounded-none border border-slate-100 p-8 sm:p-10 shadow-xl shadow-slate-200/50">
                 
                 {step === 1 && (
                     <>
                        <h3 className="text-[22px] font-bold text-slate-900 mb-6">Enter Your Details</h3>
                        <div className="space-y-5">
                           <div>
                              <label className="text-[14px] font-semibold text-slate-700 block mb-1.5">Full Name *</label>
                              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rahul Kumar" className="w-full bg-[#f8f9fa] border border-slate-200 focus:border-[#1b71f2] focus:bg-white rounded-none p-3.5 outline-none text-[15px] transition-colors" />
                           </div>
                           <div>
                              <label className="text-[14px] font-semibold text-slate-700 block mb-1.5">Mobile Number *</label>
                              <div className="relative flex items-center bg-[#f8f9fa] border border-slate-200 focus-within:border-[#1b71f2] focus-within:bg-white rounded-none transition-colors">
                                 <div className="pl-4 pr-3 flex items-center gap-1.5 text-[15px] text-slate-600 font-semibold border-r border-slate-200 py-3.5">🇮🇳 +91</div>
                                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10 Digits" className="w-full bg-transparent p-3.5 outline-none text-[15px] font-medium text-slate-800" />
                              </div>
                           </div>
                           <div>
                              <label className="text-[14px] font-semibold text-slate-700 block mb-1.5">Email *</label>
                              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full bg-[#f8f9fa] border border-slate-200 focus:border-[#1b71f2] focus:bg-white rounded-none p-3.5 outline-none text-[15px] transition-colors" />
                           </div>
                           <button onClick={handleNext} className="w-full bg-[#1b71f2] text-white font-semibold text-[16px] py-4 rounded-none hover:opacity-90 mt-2 transition-opacity">
                               Continue
                           </button>
                        </div>
                     </>
                 )}
                 
                 {step === 2 && (
                     <>
                        <h3 className="text-[22px] font-bold text-slate-900 mb-6">Your Requirements</h3>
                        <div className="space-y-5">
                           <div>
                              <label className="text-[14px] font-semibold text-slate-700 block mb-1.5">What are you looking for?</label>
                              <textarea name="requirement" value={formData.requirement} onChange={handleChange} rows={5} placeholder="Tell us about the kind of cuisine, experience, or shift timings you need..." className="w-full bg-[#f8f9fa] border border-slate-200 focus:border-[#1b71f2] focus:bg-white rounded-none p-3.5 outline-none text-[15px] resize-y transition-colors"></textarea>
                           </div>
                           <div className="flex gap-3 mt-4">
                               <button onClick={()=>setStep(1)} className="w-1/3 bg-slate-100 text-slate-700 font-semibold py-4 rounded-none hover:bg-slate-200 transition-colors">Back</button>
                               <button onClick={handleSubmit} disabled={loading} className="w-2/3 bg-[#1b71f2] text-white font-semibold py-4 rounded-none hover:opacity-90 transition-opacity">
                                   {loading ? "Please wait..." : "Submit Inquiry"}
                               </button>
                           </div>
                        </div>
                     </>
                 )}

                 {step === 3 && (
                     <div className="text-center py-16">
                         <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-10 h-10 text-green-500" />
                         </div>
                         <h3 className="text-[24px] font-bold text-slate-900 mb-3">Request Received!</h3>
                         <p className="text-slate-500 font-medium text-[15px] max-w-xs mx-auto">We've noted your requirements. Our specialized team will reach out to you shortly.</p>
                     </div>
                 )}
             </div>
         </div>
      </div>
      
    </div>
  );
}