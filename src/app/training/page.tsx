"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ChefHat, 
  GraduationCap, 
  UtensilsCrossed, 
  Users, 
  IndianRupee, 
  Briefcase, 
  HandPlatter,
  CheckCircle2,
  ArrowRight,
  MapPin,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import Presence from '@/components/Presence';

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden selection:bg-blue-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden flex items-center justify-center text-center bg-slate-900 border-b-[4px] border-[#38bdf8]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1600&auto=format&fit=crop" 
            alt="Chef Training Background" 
            className="w-full h-full object-cover object-top opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#024a9d]/70 to-[#024a9d]/95"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-none-none mb-4">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-none-none animate-pulse shadow-[0_0_8px_rgba(74,222,128,1)]"></span>
            Zomocook Academy
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-4 tracking-tight drop-shadow-md">
            Become A <br />
            Professional Cook <br />
            <span className="text-[#38bdf8] drop-shadow-lg">in 15 Days</span>
          </h1>
          
          <p className="text-white/90 text-[13px] sm:text-base font-medium max-w-xl mx-auto leading-relaxed mb-6 drop-shadow">
            Learn Cooking & Hospitality Skills with Practical Training + Job Placement Support
          </p>
          
          <button 
            onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#e11d48] text-white hover:bg-[#be123c] font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-none-none transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group text-sm"
          >
            Explore Courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. INTRO & WHO CAN JOIN (Split layout) */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="bg-blue-50/50 p-8 sm:p-12 rounded-none-none border border-blue-100/50">
            <h2 className="text-[#024a9d] text-3xl sm:text-4xl font-black mb-6 tracking-tight">Let's Explain This Simply</h2>
            <div className="w-12 h-1.5 bg-blue-500 rounded-none-none mb-8"></div>
            <p className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed">
              At Zomocook, we believe cooking is not just a skill, but a way to build a career. Our mission is to help people learn cooking and start earning with confidence. We offer practical chef training and hospitality courses for beginners and experienced learners, focusing on real-world skills for jobs and business.
            </p>
          </div>

          <div className="text-center lg:text-left lg:pl-10 relative">
            <div className="absolute top-0 right-10 w-32 h-32 bg-[#38bdf8]/10 rounded-none-none blur-[40px] -z-10"></div>
            <h2 className="text-[#024a9d] text-3xl sm:text-4xl font-black mb-4 tracking-tight">Who Can Join</h2>
            <p className="text-slate-500 font-medium text-lg border-b border-slate-100 pb-6 mb-8 inline-block lg:block lg:w-max">Inclusive programs for everyone.</p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              {["Housewives", "Beginners", "Job seekers", "Anyone interested in cooking"].map((tag, i) => (
                <span key={i} className="bg-white border border-slate-200 shadow-sm text-slate-700 font-bold text-sm px-5 py-2.5 rounded-none-none hover:border-[#024a9d] hover:text-[#024a9d] transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section id="courses" className="py-20 lg:py-32 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-[32px] sm:text-4xl lg:text-5xl font-black text-[#024a9d] tracking-tight mb-4 leading-tight">
              Explore Our Training Programs
            </h2>
            <p className="text-slate-500 font-medium text-base sm:text-xl">
              Find the perfect course to learn, grow, and succeed.
            </p>
            <div className="w-16 h-1 mt-6 bg-blue-500 mx-auto rounded-none-none"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Course 1 */}
            <div className="bg-white rounded-none-none p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-2 border-transparent hover:border-blue-100 transition-all duration-300 hover:shadow-xl flex flex-col group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-none-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
               <div className="w-16 h-16 rounded-none-none bg-[#024a9d] text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                 <ChefHat className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-black text-[#024a9d] mb-4 group-hover:text-blue-600 transition-colors">Chef Training</h3>
               <ul className="text-slate-600 text-sm font-medium space-y-2 mb-8 flex-1">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Commercial Training</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Home cook Training</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Placement support</li>
               </ul>
               <div className="bg-slate-50 p-4 rounded-none-none border border-slate-100 mb-6">
                 <p className="text-[13px] text-slate-500 font-bold mb-1">Duration: <span className="text-green-600">30 Days Program</span></p>
                 <p className="text-[13px] text-slate-500 font-bold">Course Fees: <span className="text-green-600">Rs.14,999/-</span></p>
               </div>
               <Link href="/training/chef-training" className="w-full block text-center bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-3.5 rounded-none-none transition-colors text-sm uppercase tracking-wider relative overflow-hidden group/btn">
                 <span className="relative z-10 flex items-center justify-center gap-2">View Course <ArrowRight className="w-4 h-4" /></span>
               </Link>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-none-none p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-2 border-transparent hover:border-blue-100 transition-all duration-300 hover:shadow-xl flex flex-col group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-none-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
               <div className="w-16 h-16 rounded-none-none bg-[#024a9d] text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                 <GraduationCap className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-black text-[#024a9d] mb-4 group-hover:text-blue-600 transition-colors">Special Courses</h3>
               <p className="text-slate-600 text-sm font-medium mb-3">Learn high-demand food:</p>
               <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-8 flex-1">
                 Momos | Biryani | Fast Food | Chaap | Pizza | Chaat Master
               </p>
               <div className="bg-slate-50 p-4 rounded-none-none border border-slate-100 mb-6">
                 <p className="text-[13px] text-slate-500 font-bold mb-1">Duration: <span className="text-green-600">10 Days Program</span></p>
                 <p className="text-[13px] text-slate-500 font-bold">Course Fees: <span className="text-green-600">Rs.9,999/-</span></p>
               </div>
               <Link href="/training/special-courses" className="w-full block text-center bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-3.5 rounded-none-none transition-colors text-sm uppercase tracking-wider">
                 <span className="flex items-center justify-center gap-2">View Course <ArrowRight className="w-4 h-4" /></span>
               </Link>
            </div>

            {/* Course 3 */}
            <div className="bg-white rounded-none-none p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-2 border-transparent hover:border-blue-100 transition-all duration-300 hover:shadow-xl flex flex-col group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-none-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
               <div className="w-16 h-16 rounded-none-none bg-[#024a9d] text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                 <UtensilsCrossed className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-black text-[#024a9d] mb-4 group-hover:text-blue-600 transition-colors">Cuisine Courses</h3>
               <p className="text-slate-600 text-sm font-medium mb-3">Become expert in:</p>
               <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-8 flex-1">
                 Chinese, Continental, South & North Indian cooking
               </p>
               <div className="bg-slate-50 p-4 rounded-none-none border border-slate-100 mb-6">
                 <p className="text-[13px] text-slate-500 font-bold mb-1">Duration: <span className="text-green-600">30 Days Program</span></p>
                 <p className="text-[13px] text-slate-500 font-bold">Course Fees: <span className="text-green-600">Rs.14,999/-</span></p>
               </div>
               <Link href="/training/cuisine-courses" className="w-full block text-center bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-3.5 rounded-none-none transition-colors text-sm uppercase tracking-wider">
                 <span className="flex items-center justify-center gap-2">View Course <ArrowRight className="w-4 h-4" /></span>
               </Link>
            </div>

            {/* Course 4 */}
            <div className="bg-white rounded-none-none p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-2 border-transparent hover:border-blue-100 transition-all duration-300 hover:shadow-xl flex flex-col group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-none-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
               <div className="w-16 h-16 rounded-none-none bg-[#024a9d] text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                 <Users className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-black text-[#024a9d] mb-4 group-hover:text-blue-600 transition-colors">Staff Training</h3>
               <p className="text-slate-600 text-sm font-medium mb-3">Get trained for Job Ready Skills:</p>
               <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-8 flex-1">
                 Captain, Waiter & kitchen assistant roles
               </p>
               <div className="bg-slate-50 p-4 rounded-none-none border border-slate-100 mb-6">
                 <p className="text-[13px] text-slate-500 font-bold mb-1">Duration: <span className="text-green-600">5 Days Program</span></p>
                 <p className="text-[13px] text-slate-500 font-bold">Course Fees: <span className="text-green-600">Rs.3,999/-</span></p>
               </div>
               <Link href="/training/staff-training" className="w-full block text-center bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-3.5 rounded-none-none transition-colors text-sm uppercase tracking-wider">
                 <span className="flex items-center justify-center gap-2">View Course <ArrowRight className="w-4 h-4" /></span>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US & PROGRAM HIGHLIGHTS */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#024a9d] tracking-tight mb-2 leading-tight">
              Why Choose Zomocook Training?
            </h2>
            <p className="text-slate-500 font-bold text-[13px] sm:text-base">
              Practical Training + Job Placement Support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-none-none bg-red-50 text-red-500 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <HandPlatter className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#024a9d] mb-2">Hands On Training</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[280px]">
                100% Practical Training from Experienced Professional Chefs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-none-none bg-red-50 text-red-500 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <IndianRupee className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#024a9d] mb-2">Affordable Fees</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[280px]">
                Get the best training experience at a cost-effective price.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-none-none bg-red-50 text-red-500 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#024a9d] mb-2">Job Placement</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[280px]">
                Partnered with 30+ brands and 650+ restaurants for placement opportunities.
              </p>
            </div>

          </div>

          {/* Program Highlights */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#024a9d] tracking-tight">
              Program Highlights
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-red-100 rounded-none-none p-8 sm:p-10 text-center shadow-lg shadow-red-50 hover:border-red-200 transition-colors">
              <p className="text-slate-700 font-bold text-lg mb-3">15+ Days Training</p>
              <p className="text-slate-500 font-medium text-base">Live Cooking Practice</p>
            </div>
            <div className="bg-white border-2 border-red-100 rounded-none-none p-8 sm:p-10 text-center shadow-lg shadow-red-50 hover:border-red-200 transition-colors">
              <p className="text-slate-700 font-bold text-lg mb-3">Training Certificate</p>
              <p className="text-slate-500 font-medium text-base">Real Kitchen Experience</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TRAINING CENTER (Map) */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-100 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#024a9d] tracking-tight mb-8">
              Training Center
            </h2>
            
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-none-none shadow-lg border border-slate-100 max-w-2xl mx-auto mb-12 transform hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-none-none bg-red-100 text-[#e11d48] flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#024a9d] mb-2">Address</h3>
              <p className="text-slate-500 font-medium text-base sm:text-lg">
                B1-91/D, Block B1, Sector G, Jankipuram,<br/>
                Lucknow, Uttar Pradesh 226021
              </p>
            </div>
            
            {/* Google Maps iFrame */}
            <div className="w-full h-[400px] sm:h-[500px] rounded-none-none overflow-hidden border-4 border-red-500 shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.678077579893!2d80.93883901614217!3d26.903803875317765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957cdce3238eb%3A0xe758d4a51e60086!2sJankipuram%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1703665518921!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute top-0 left-0"
              ></iframe>
            </div>
            
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (Styled List) */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 bg-white border-t border-slate-100 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#024a9d] tracking-tight">
              FAQ's
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-5">
            
            {[
              {
                q: "1. What is Zomocook?",
                a: "Zomocook is a platform that connects restaurants and homes with experienced chefs and cooks for various culinary needs."
              },
              {
                q: "What services does Zomocook offer?",
                a: "Zomocook offers complete chef solution for commercial needs either it for permanent requirment for staff or temporary staffing needs when your chef on leave. also we provide chef and cook hiring services for events, parties, and home cooking, including specialized cuisines."
              },
              {
                q: "How do I book a chef or cook through Zomocook?",
                a: "Simply visit our website or Call to 9519808734, select the type of service you need, choose your preferred chef or cook, and follow the booking process."
              },
              {
                q: "What types of chefs and cooks are available on Zomocook?",
                a: "We have a wide range of experienced chefs and cooks specializing in various cuisines, including Japanese, Indian, Italian, and more."
              },
              {
                q: "Can I request a specific chef or cook?",
                a: "Yes, you can choose from our list of available professionals or request a specific chef/cook based on your preferences."
              },
              {
                q: "Is there a cancellation policy?",
                a: "Yes, please refer to our terms and conditions for details on our cancellation and refund processes."
              },
              {
                q: "What types of events do you cater to?",
                a: "We cater to a wide range of events, including corporate events, weddings, birthdays, and more."
              },
              {
                q: "Can Zomocook provide complete chef team for new or running restaurant?",
                a: "Zomocook offers comprehensive chef team solutions for both new and running restaurants. Our services include: Experienced Chefs Kitchen Staff, Customized Solutions and also help to setup kitchen and all required documentation process."
              },
              {
                q: "Can I find temporary staff from Zomocook in Lucknow when our chef goes on leave?",
                a: "Yes, we will provide temporary staff solutions to run a smooth kitchen."
              },
              {
                q: "Can Zomocook help us onboard online food delivery platforms?",
                a: "Yes, we are a staffing partner for Zomato Restaurant Service Hub. We help you with onboarding on Zomato and Swiggy platforms."
              },
              {
                q: "Can Zomocook provide staff on a contract basis for guaranteed reliability?",
                a: "Yes, we provide staffing services on multiple service plans depending on customer requirements."
              },
              {
                q: "How much time will Zomocook take to replace a chef?",
                a: "We proceed with staff replacement after receiving a replacement request from either the client or staff side. Generally, we take 2-4 days to replace staff with a new one. It also depends on distance and availability of staff at your location."
              },
              {
                q: "Is Zomocook available pan-India?",
                a: "Yes, we are available pan-India with various cook services, Our recent development in Andaman & Nicobar Islands for chef requirement services."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50/50 rounded-none-none border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="bg-slate-100/80 px-4 sm:px-6 py-3.5 flex items-start gap-4">
                  <h3 className="text-[#0e1726] font-bold text-[15px] sm:text-base flex-1 leading-snug">{faq.q}</h3>
                </div>
                <div className="px-4 sm:px-6 py-4 bg-white">
                  <p className="text-slate-600 font-medium text-[13px] sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 7. SEO KEYWORDS BLOCK */}
      <section className="py-12 bg-white px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed text-justify opacity-60 font-medium">
            Chef training in Delhi, chef training in Mumbai, chef training in Bangalore, chef training in Hyderabad, chef training in Chennai, chef training in Kolkata, chef training in Pune, chef training in Ahmedabad, chef training in Jaipur, chef training in Chandigarh, chef training in Noida, chef training in Gurgaon, chef training in Ghaziabad, chef training in Faridabad, chef training in Lucknow, chef training in Kanpur, chef training in Indore, chef training in Bhopal, chef training in Patna, chef training in Ranchi, chef training in Nagpur, chef training in Surat, chef training in Vadodara, chef training in Nashik, chef training in Agra, chef training in Varanasi, chef training in Prayagraj, chef training in Dehradun, chef training in Jodhpur, chef training in Udaipur, chef training in Raipur, chef training in Bhubaneswar, chef training in Guwahati, chef training in Coimbatore,
            cooking classes in Mumbai, cooking classes in Bangalore, cooking classes in Hyderabad, cooking classes in Chennai, cooking classes in Kolkata, cooking classes in Pune, cooking classes in Ahmedabad, cooking classes in Jaipur, cooking classes in Chandigarh, cooking classes in Noida, cooking classes in Gurgaon, cooking classes in Ghaziabad, cooking classes in Faridabad, cooking classes in Lucknow, cooking classes in Kanpur, cooking classes in Indore, cooking classes in Bhopal, cooking classes in Patna, cooking classes in Ranchi, cooking classes in Nagpur, cooking classes in Surat, cooking classes in Vadodara, cooking classes in Nashik, cooking classes in Agra, cooking classes in Varanasi, cooking classes in Prayagraj, cooking classes in Dehradun, cooking classes in Jodhpur, cooking classes in Udaipur, cooking classes in Raipur, cooking classes in Bhubaneswar, cooking classes in Guwahati, cooking classes in Coimbatore,
            cook training in Delhi, cook training in Mumbai, cook training in Bangalore, cook training in Hyderabad, cook training in Chennai, cook training in Kolkata, cook training in Pune, cook training in Ahmedabad, cook training in Jaipur, cook training in Chandigarh, cook training in Noida, cook training in Gurgaon, cook training in Ghaziabad, cook training in Faridabad, cook training in Lucknow, cook training in Kanpur, cook training in Indore, cook training in Bhopal, cook training in Patna, cook training in Ranchi, cook training in Nagpur, cook training in Surat, cook training in Vadodara, cook training in Nashik, cook training in Agra, cook training in Varanasi, cook training in Prayagraj, cook training in Dehradun, cook training in Jodhpur, cook training in Udaipur, cook training in Raipur, cook training in Bhubaneswar, cook training in Guwahati, cook training in Coimbatore,
            chef course in Delhi, chef course in Mumbai, chef course in Bangalore, chef course in Hyderabad, chef course in Chennai, chef course in Kolkata, chef course in Pune, chef course in Ahmedabad, chef course in Jaipur, chef course in Chandigarh, chef course in Noida, chef course in Gurgaon, chef course in Ghaziabad, chef course in Faridabad, chef course in Lucknow, chef course in Kanpur, chef course in Indore, chef course in Bhopal, chef course in Patna, chef course in Ranchi, chef course in Nagpur, chef course in Surat, chef course in Vadodara, chef course in Nashik, chef course in Agra, chef course in Varanasi, chef course in Prayagraj, chef course in Dehradun, chef course in Jodhpur, chef course in Udaipur, chef course in Raipur, chef course in Bhubaneswar, chef course in Guwahati, chef course in Coimbatore,
            chef training with placement in Delhi, chef training with placement in Mumbai, chef training with placement in Bangalore, chef training with placement in Hyderabad, chef training with placement in Chennai, chef training with placement in Kolkata, chef training with placement in Pune, chef training with placement in Ahmedabad, chef training with placement in Jaipur, chef training with placement in Chandigarh, chef training with placement in Noida, chef training with placement in Gurgaon, chef training with placement in Ghaziabad, chef training with placement in Faridabad, chef training with placement in Lucknow,
            cook training with job in Delhi, cook training with job in Mumbai, cook training with job in Bangalore, cook training with job in Hyderabad, cook training with job in Chennai, cook training with job in Kolkata, cook training with job in Pune, cook training with job in Ahmedabad, cook training with job in Jaipur, cook training with job in Chandigarh, cook training with job in Lucknow,
            waiter training in Delhi, waiter training in Mumbai, waiter training in Bangalore, waiter training in Hyderabad, waiter training in Chennai, waiter training in Kolkata, waiter training in Pune, waiter training in Ahmedabad, waiter training in Jaipur, waiter training in Chandigarh, waiter training in Lucknow,
            horeca training in Delhi, horeca training in Mumbai, horeca training in Bangalore, horeca training in Hyderabad, horeca training in Chennai, horeca training in Kolkata, horeca training in Pune, horeca training in Ahmedabad, horeca training in Jaipur, horeca training in Chandigarh, horeca training in Lucknow,
            hotel staff training in Delhi, hotel staff training in Mumbai, hotel staff training in Bangalore, hotel staff training in Hyderabad, hotel staff training in Chennai, hotel staff training in Kolkata, hotel staff training in Pune, hotel staff training in Ahmedabad, hotel staff training in Jaipur, hotel staff training in Chandigarh, hotel staff training in Lucknow,
            cook near me, chef near me, private chef near me, cook for home near me, cooking services near me, hire cook near me, hire chef near me, domestic cook near me, home cook near me, personal chef near me,
            hire cook in Delhi, hire cook in Mumbai, hire cook in Bangalore, hire cook in Hyderabad, hire cook in Chennai, hire cook in Kolkata, hire cook in Pune, hire cook in Ahmedabad, hire cook in Jaipur, hire cook in Lucknow,
            hire chef in Delhi, hire chef in Mumbai, hire chef in Bangalore, hire chef in Hyderabad, hire chef in Chennai, hire chef in Kolkata, hire chef in Pune, hire chef in Ahmedabad, hire chef in Jaipur, hire chef in Lucknow,
            cook for home in Delhi, cook for home in Mumbai, cook for home in Bangalore, cook for home in Hyderabad, cook for home in Chennai, cook for home in Pune, cook for home in Ahmedabad, cook for home in Jaipur, cook for home in Lucknow,
            chef for home party in Delhi, chef for home party in Mumbai, chef for home party in Bangalore, chef for home party in Hyderabad, chef for home party in Chennai, chef for home party in Kolkata, chef for home party in Pune, chef for home party in Ahmedabad, chef for home party in Jaipur, chef for home party in Lucknow
          </p>
        </div>
      </section>

      {/* 8. PRESENCE FOOTER */}
      <Presence />

    </div>
  );
}
