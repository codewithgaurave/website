"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChefHat, Quote, ArrowRight, Award, History, Sparkles } from 'lucide-react';

export default function ExpertsPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-hidden">
      
      {/* 1. Ultra Premium Hero Header */}
      <section className="relative pt-[160px] pb-24 lg:pt-[140px] lg:pb-28 bg-slate-950 text-white overflow-hidden z-10">
        
        {/* Dynamic Abstract Backgrounds */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-none-none bg-[#024a9d] blur-[150px] mix-blend-screen animate-pulse duration-1000"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-none-none bg-[#e11d48] blur-[180px] mix-blend-screen opacity-50"></div>
        </div>
        
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none-none bg-white/5 border border-white/10 backdrop-blur-md text-blue-200 font-semibold text-sm mb-6 shadow-2xl">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Culinary Excellence Redefined
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Meet Our Master <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-[#024a9d]">Visionaries</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
            The extraordinary minds and guiding hands turning Zomocook's culinary philosophy into an absolute masterpiece.
          </p>
        </div>
        
        {/* Wave Divider to connect to white background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.26,193.38,109.11Z" className="fill-[#f8fafc]"></path>
          </svg>
        </div>
      </section>

      {/* 2. Biographical Gallery Timeline */}
      <section className="relative py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MENTOR 1: Shalini Lall */}
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24 lg:mb-32 group perspective-1000">
          
          {/* Image Node Side */}
          <div className="w-full lg:w-[45%] relative z-10 flex justify-center lg:justify-end">
            {/* The Floating Frame */}
            <div className="w-full max-w-[320px] lg:max-w-[380px] relative rounded-none-none overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-white bg-white transform transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:rotate-1">
              <div className="w-full h-full bg-slate-100 relative overflow-hidden aspect-square lg:aspect-[4/4.5]">
                <img 
                  src="/mentor.png" 
                  alt="Shalini Lall"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>
            {/* Badge floating */}
            <div className="absolute -bottom-8 right-0 lg:-right-8 bg-white p-4 lg:p-5 rounded-none-none shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce-slow">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-50 text-[#e11d48] rounded-none-none flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <p className="text-lg lg:text-xl font-black text-slate-800 leading-tight">Founder</p>
                <p className="text-[10px] lg:text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">Lucknow Chef's Group</p>
              </div>
            </div>
          </div>
          
          {/* Text Content Side */}
          <div className="w-full lg:w-[55%] relative z-10">
            <Quote className="absolute -top-4 right-4 lg:-top-8 lg:-left-8 w-16 h-16 lg:w-24 lg:h-24 text-blue-100 opacity-20 lg:opacity-50 z-0 -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-200" />
            
            <div className="relative z-10 pl-0 lg:pl-8">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">Shalini Lall</h2>
              <div className="w-16 h-1.5 rounded-none-none bg-gradient-to-r from-[#024a9d] to-[#d62423] mb-6"></div>
              
              <div className="space-y-4 text-slate-600 font-medium text-base lg:text-lg leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#024a9d] first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  Shalini Lall, the driving force behind the Lucknow Chef's Group, has a simple yet powerful mission: bringing people, particularly women, together through a shared love for food. With a deep-rooted passion for cooking and a desire to spread culinary knowledge, Shalini has built a vibrant community of food enthusiasts who cherish the rich flavors and traditions of Lucknow cuisine.
                </p>
                <p>
                  Her innovative spirit and unwavering dedication have not only transformed the culinary scene but also inspired others to delve into the diverse and delightful world of Lucknowi delicacies. Through her efforts, Shalini continues to foster connections and ignite a love for cooking among individuals from all walks of life.
                </p>
              </div>
            </div>
          </div>
        
        </div>

        {/* MENTOR 2: Vikram (Alternating Right to Left) */}
        <div className="relative flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 mb-24 lg:mb-32 group">
          
          {/* Text Content Side */}
          <div className="w-full lg:w-[55%] relative z-10 lg:text-right">
            <Quote className="absolute -top-4 left-4 lg:-bottom-12 lg:-right-8 w-16 h-16 lg:w-32 lg:h-32 text-blue-100 opacity-20 lg:opacity-40 z-0 rotate-[190deg] transition-transform duration-500 group-hover:-rotate-180 group-hover:text-blue-200" />
            
            <div className="relative z-10 flex flex-col lg:items-end pr-0 lg:pr-8">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">Vikram</h2>
              <div className="w-16 h-1.5 rounded-none-none bg-gradient-to-r from-blue-400 to-[#024a9d] mb-6"></div>
              
              <div className="space-y-4 text-slate-600 font-medium text-base lg:text-lg leading-relaxed lg:text-right">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#024a9d] first-letter:mr-2 first-letter:float-left lg:first-letter:float-none lg:first-letter:mr-0 lg:first-letter:ml-0 first-letter:leading-none">
                  Throughout my extensive 20-year career, I've collaborated with a variety of brands, both well-known and emerging. From established corporations to fresh startups, each partnership has provided valuable experiences and expanded my perspective. With a dedication to innovation and a passion for creativity, I've successfully spearheaded the launch of over ten new ventures.
                </p>
                <p>
                  These endeavors stand as a testament to my expertise and commitment to driving progress in the industry. As I move forward, I'm excited to cultivate new relationships and pursue fresh opportunities that will contribute to the ever-evolving landscape of the culinary world.
                </p>
              </div>
            </div>
          </div>

          {/* Image Node Side */}
          <div className="w-full lg:w-[45%] relative z-10 flex justify-center lg:justify-start">
            {/* The Floating Frame */}
            <div className="w-full max-w-[320px] lg:max-w-[380px] relative rounded-none-none overflow-hidden shadow-[0_30px_60px_-15px_rgba(2,74,157,0.3)] border-[8px] border-[#024a9d] bg-[#024a9d] transform transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:-rotate-1">
              <div className="w-full h-full bg-slate-100 relative overflow-hidden aspect-square lg:aspect-[4/4.5]">
                <img 
                  src="/executive-chef.png" 
                  alt="Vikram - Executive Chef"
                  className="w-full h-full object-cover object-top transform transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>
            {/* Badge floating */}
            <div className="absolute -bottom-8 left-0 lg:-left-8 bg-white p-4 lg:p-5 rounded-none-none shadow-xl border border-slate-50 flex flex-row-reverse items-center gap-4 animate-bounce-slow" style={{ animationDelay: '1s' }}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 text-[#024a9d] rounded-none-none flex items-center justify-center flex-shrink-0">
                <History className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="text-right">
                <p className="text-lg lg:text-xl font-black text-slate-800 leading-tight">Executive</p>
                <p className="text-[10px] lg:text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">Master Chef</p>
              </div>
            </div>
          </div>
        
        </div>

        {/* MENTOR 3: Satyam Pandey */}
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16 group perspective-1000">
          
          {/* Image Node Side */}
          <div className="w-full lg:w-[45%] relative z-10 flex justify-center lg:justify-end">
            {/* The Floating Frame */}
            <div className="w-full max-w-[320px] lg:max-w-[380px] relative rounded-none-none overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-[8px] border-white bg-white transform transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:rotate-1">
              <div className="w-full h-full bg-slate-100 relative overflow-hidden aspect-square lg:aspect-[4/4.5] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/60 before:to-transparent before:z-10">
                <img 
                  src="/cdp.png" 
                  alt="Satyam Pandey - CDP"
                  className="w-full h-full object-cover object-top transform transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              {/* Internal overlay text representing culinary creation */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <p className="font-bold text-xl lg:text-3xl mb-1">15+ Years</p>
                <p className="text-white/80 font-medium text-xs lg:text-sm">Of Culinary Craftsmanship</p>
              </div>
            </div>
          </div>
          
          {/* Text Content Side */}
          <div className="w-full lg:w-[55%] relative z-10">
            <Quote className="absolute -top-4 right-4 lg:-top-8 lg:-left-8 w-16 h-16 lg:w-24 lg:h-24 text-blue-100 opacity-20 lg:opacity-50 z-0 -rotate-12 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:text-blue-200" />
            
            <div className="relative z-10 pl-0 lg:pl-8">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">Satyam Pandey</h2>
              <div className="w-16 h-1.5 rounded-none-none bg-gradient-to-r from-[#024a9d] to-[#d62423] mb-6"></div>
              
              <div className="space-y-4 text-slate-600 font-medium text-base lg:text-lg leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#024a9d] first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  With more than 15 years in the culinary field, Satyam Pandey has carved his path through some of the finest establishments, including Little Chef, Indian Habitat Centre, Hotel Silver, and Classic Restaurant. His journey reflects a deep commitment to the craft of cooking, where each experience has added layers of expertise and skill to his repertoire. 
                </p>
                <p>
                  Particularly notable is Satyam's role as a menu creator, having curated 4-5 distinctive menus for various restaurants. This showcases not just his talent, but also his genuine passion for the art of culinary creation.
                </p>
                <p className="bg-blue-50/50 p-6 rounded-none-none border border-blue-100/50 italic text-blue-900 font-semibold shadow-sm text-sm lg:text-base">
                  "In the world of Satyam Pandey, cooking isn't just a profession; it's a lifelong journey of exploration and innovation in the pursuit of culinary perfection."
                </p>
              </div>
            </div>
          </div>
        
        </div>

      </section>

      {/* 4. Classic & Clean CTA Banner */}
      <section className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#024a9d] rounded-none-none p-8 md:p-10 flex flex-col lg:grid lg:grid-cols-4 items-center gap-8 shadow-[0_20px_50px_rgba(2,74,157,0.2)]">
            
            {/* Col 1: Illustration */}
            <div className="w-full flex justify-center lg:justify-start lg:pl-6 text-center lg:text-left">
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-none-none flex items-center justify-center shadow-lg relative border-4 border-blue-100 flex-shrink-0">
                <ChefHat className="w-16 h-16 lg:w-20 lg:h-20 text-[#024a9d]" strokeWidth={1.5} />
                <div className="absolute top-2 right-4 w-3 h-3 rounded-none-none bg-[#d62423]"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-none-none bg-yellow-400"></div>
              </div>
            </div>

            {/* Col 2: Heading Area */}
            <div className="w-full text-white text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
                Hire A Cook! <br />
                <span className="text-blue-200">Instantly</span>
              </h3>
            </div>
            
            {/* Col 3: Features */}
            <div className="w-full text-blue-100 font-medium text-sm lg:text-base opacity-90 tracking-widest uppercase flex flex-col gap-3 text-center lg:text-left border-y lg:border-y-0 lg:border-x border-blue-400/30 py-4 lg:py-0 lg:px-6">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-2 h-2 bg-white rounded-none-none"></div> Trained
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-2 h-2 bg-white rounded-none-none"></div> Trusted
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-2 h-2 bg-white rounded-none-none"></div> Verified
              </div>
            </div>
            
            {/* Col 4: Button */}
            <div className="w-full flex justify-center lg:justify-end lg:pr-6 text-center lg:text-right">
              <Link href="/contact" className="bg-white text-[#024a9d] font-bold px-10 py-4 rounded-none-none text-lg hover:bg-slate-50 transition-colors shadow-md whitespace-nowrap inline-block text-center">
                Hire Now!
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
