"use client";
import React from 'react';
import { notFound } from 'next/navigation';
import { HandPlatter, IndianRupee, Briefcase, MapPin } from 'lucide-react';
import Link from 'next/link';

/* --- COURSE DYNAMIC DATA --- */
const courses: Record<string, any> = {
  "chef-training": {
    heroBg: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2600&auto=format&fit=crop",
    title: "Chef Training (Commercial & Home Cook)",
    subTitle: "Become an Expert in Cooking with 100% Practical Training",
    aboutDesc: "Learn commercial and home cooking with our intensive 30-day program. This course is perfect for those who want to become professional chefs, start their own kitchen, or upgrade their culinary skills.",
    learn: [
      "Advanced commercial cooking",
      "Authentic recipes & presentation",
      "Menu planning & execution",
      "Kitchen workflow & time management",
      "Plating & serving styles"
    ],
    benefits: [
      "Commercial & Home expertise",
      "Hands-on practical training",
      "Certification after completion",
      "Placement guidance support",
      "Small batch learning"
    ],
    coveredTitle: "Modules Covered:",
    covered: [
      "Commercial Kitchen Operations",
      "Home Cloud Kitchen Setup",
      "Hygiene & Food Safety",
      "Bulk Cooking Techniques"
    ],
    batchSize: "15",
    timing: "2 Hr/ Day",
    duration: "30 Days Program",
    mode: "Practical + Live Training",
    level: "Beginner to Advanced",
    certification: "Yes",
    price: 14999,
    startDate: "1st & 15th of every month"
  },
  "special-courses": {
    heroBg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2600&auto=format&fit=crop",
    title: "Special Courses (Fast Food & Street Food)",
    subTitle: "Master high-demand food like Momos, Biryani, Quick Fast Food, & Pizza",
    aboutDesc: "Learn a wide variety of high-demand fast foods with our specialized 10-day crash course. This course is perfect for those who want to launch a QSR, food truck, or fast-food cafe.",
    learn: [
      "Fast & Street food techniques",
      "Authentic street-style recipes",
      "Quick prep & turnaround time",
      "Kitchen workflow & hygiene",
      "Costing & portion control"
    ],
    benefits: [
      "High-demand food expertise",
      "Hands-on practical training",
      "Certification after completion",
      "Placement & Business Setup support",
      "Small batch learning"
    ],
    coveredTitle: "Specialties Covered:",
    covered: [
      "Momos & Dimsums",
      "Authentic Biryani",
      "Fast Food & Pizza",
      "Chaat Masterclass",
      "Soya Chaap Preparations"
    ],
    batchSize: "15",
    timing: "2 Hr/ Day",
    duration: "10 Days Program",
    mode: "Practical + Live Training",
    level: "Beginner to Intermediate",
    certification: "Yes",
    price: 9999,
    startDate: "1st & 15th of every month"
  },
  "cuisine-courses": {
    heroBg: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=2600&auto=format&fit=crop",
    title: "Cuisine Cooking Courses",
    subTitle: "Become an Expert in Multi-Cuisine Cooking with Professional Training",
    aboutDesc: "Learn a wide variety of cuisines with our advanced 30-day cooking program. This course is perfect for those who want to become professional chefs or upgrade their cooking skills across multiple cuisines",
    learn: [
      "Advanced cooking techniques",
      "Authentic recipes & presentation",
      "Sauce & gravy preparation",
      "Kitchen workflow & time management",
      "Plating & serving styles"
    ],
    benefits: [
      "Multi-cuisine expertise",
      "Hands-on practical training",
      "Certification after completion",
      "Placement guidance support",
      "Small batch learning"
    ],
    coveredTitle: "Cuisines Covered:",
    covered: [
      "Chinese Cuisine",
      "Continental Cuisine",
      "North Indian Cooking",
      "South Indian Cooking"
    ],
    batchSize: "15",
    timing: "2 Hr/ Day",
    duration: "30 Days Program",
    mode: "Practical + Live Training",
    level: "Beginner to Advanced",
    certification: "Yes",
    price: 14999,
    startDate: "1st & 15th of every month"
  },
  "staff-training": {
    heroBg: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2600&auto=format&fit=crop",
    title: "Staff Training (Captain & Waiter)",
    subTitle: "Get Trained for Job-Ready Skills in Top Hospitality Roles",
    aboutDesc: "Learn the essentials of hospitality and guest interaction with our quick 5-day training program. This course is perfect for freshers aiming to start a strong career as a Captain, Waiter, or Assistant in top restaurants.",
    learn: [
      "Guest greeting & interaction",
      "Order taking protocols",
      "Table setting & clearance",
      "Handling customer complaints",
      "Basic grooming & etiquette"
    ],
    benefits: [
      "Hospitality expertise",
      "Hands-on practical training",
      "Certification after completion",
      "Guaranteed Placement guidance",
      "Confidence building"
    ],
    coveredTitle: "Roles Covered:",
    covered: [
      "Senior F&B Captain",
      "Professional Waiter",
      "Kitchen Assistant (Commi)",
      "Customer Service Representative"
    ],
    batchSize: "15",
    timing: "2 Hr/ Day",
    duration: "5 Days Program",
    mode: "Practical + Live Training",
    level: "Beginner",
    certification: "Yes",
    price: 3999,
    startDate: "Every Monday"
  }
};

export default function CourseFullPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the asynchronous params Promise using React.use for Next.js 15+
  const { slug } = React.use(params);
  const course = courses[slug];

  // If no course matches the slug, return 404
  if (!course) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200 mt-[70px] sm:mt-24 pb-20">
      

      {/* 1. HERO SECTION */}
      <div 
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center flex-col text-center px-4"
        style={{ backgroundImage: `url(${course.heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-white text-3xl sm:text-5xl md:text-[54px] font-black tracking-tight mb-4 drop-shadow-md pb-2">
                {course.title}
            </h1>
            <p className="text-white/90 text-sm sm:text-lg md:text-xl font-medium max-w-2xl drop-shadow-sm pb-8">
                {course.subTitle}
            </p>
        </div>
      </div>

      {/* 2. ABOUT COURSE */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
         <h2 className="text-[28px] sm:text-[34px] font-bold text-[#024a9d] mb-4">About Course</h2>
         <p className="text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto text-sm sm:text-base">
            {course.aboutDesc}
         </p>
      </div>

      {/* 3. WHAT YOU WILL LEARN & BENEFITS */}
      <div className="max-w-5xl mx-auto px-4 pb-16 grid sm:grid-cols-2 gap-10 sm:gap-20 text-center">
         <div>
            <h3 className="text-[26px] font-bold text-[#024a9d] mb-6">What You Will Learn :</h3>
            <ul className="text-slate-500 font-medium space-y-2.5 text-sm sm:text-base">
                {course.learn.map((str: string, i: number) => (
                    <li key={i}>{str}</li>
                ))}
            </ul>
         </div>
         <div>
            <h3 className="text-[26px] font-bold text-[#024a9d] mb-6">Benefits :</h3>
            <ul className="text-slate-500 font-medium space-y-2.5 text-sm sm:text-base">
                {course.benefits.map((str: string, i: number) => (
                    <li key={i}>{str}</li>
                ))}
            </ul>
         </div>
      </div>

      {/* 4. CUISINES / SPECIALTIES COVERED */}
      {course.covered.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-20 text-center">
            <h3 className="text-[26px] font-bold text-[#024a9d] mb-6">{course.coveredTitle}</h3>
            <ul className="text-slate-500 font-medium space-y-2.5 text-sm sm:text-base">
                {course.covered.map((str: string, i: number) => (
                    <li key={i}>{str}</li>
                ))}
            </ul>
          </div>
      )}

      {/* 5. COURSE FEES & DURATION (Green Block) */}
      <div className="bg-[#ccffcc] py-20 px-4 w-full">
         <div className="max-w-6xl mx-auto">
             <div className="text-center mb-12">
                 <h2 className="text-[28px] sm:text-[36px] font-bold text-[#024a9d] mb-2">
                     Course fees & Duration
                 </h2>
                 <p className="text-slate-600 font-medium text-[15px]">
                     Find the perfect course to learn, grow, and succeed.
                 </p>
             </div>

             <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
                
                {/* Details Card */}
                <div className="bg-[#f8f6ff] shadow-xl rounded-none-none p-8 sm:p-12 text-center text-slate-500 font-medium space-y-3 text-sm sm:text-base">
                    <p>Batch Size : {course.batchSize}</p>
                    <p>Timing : {course.timing}</p>
                    <p>Duration: {course.duration}</p>
                    <p>Mode: {course.mode}</p>
                    <p>Level: {course.level}</p>
                    <p>Certification: {course.certification}</p>
                </div>

                {/* Fees Card */}
                <div className="bg-[#f8f6ff] shadow-xl rounded-none-none p-8 sm:p-12 text-center text-slate-500 font-medium flex flex-col justify-center gap-3 text-sm sm:text-base">
                    <p>Course Fees : Rs.{course.price.toLocaleString()}/-</p>
                    <p>Batches start on {course.startDate}</p>
                    <p>100% Practical Training</p>
                    
                    <div className="mt-8">
                        <Link 
                         href={`/training/${slug}/register`}
                         className="bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-3 px-8 rounded-none transition-all shadow-md active:scale-95 inline-block">
                            Register Now
                        </Link>
                    </div>
                </div>

             </div>
         </div>
      </div>

      {/* 6. WHY CHOOSE ZOMOCOOK TRAINING */}
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#024a9d] mb-2">
                Why Choose Zomocook Training?
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base">
                Practical Training + Job Placement Support
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Box 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-14 h-14 shrink-0 rounded-none-none bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    <HandPlatter className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-[17px] font-bold text-[#024a9d] mb-1.5">Hands On Training</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        100% Practical Training Experienced Professional Chefs
                    </p>
                </div>
            </div>
            
            {/* Box 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-14 h-14 shrink-0 rounded-none-none bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    <IndianRupee className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-[17px] font-bold text-[#024a9d] mb-1.5">Affordable Fees Structure</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        Get the best training experience at a cost-effective price.
                    </p>
                </div>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-14 h-14 shrink-0 rounded-none-none bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    <Briefcase className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-[17px] font-bold text-[#024a9d] mb-1.5">Job Placement</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        Partnered with 30+ brands and 650+ restaurants for placement opportunities.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* 7. TRAINING CENTER (Map) */}
      <div className="bg-slate-50 w-full pt-16">
          <div className="text-center mb-10">
              <h2 className="text-[28px] sm:text-[34px] font-bold text-[#024a9d]">
                  Training Center
              </h2>
          </div>
          <div className="bg-[#f4f4f4] py-10 sm:py-16 px-4">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                  <div className="flex items-start gap-4 md:w-1/3">
                      <div className="w-14 h-14 shrink-0 rounded-none-none bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                          <MapPin className="w-7 h-7" />
                      </div>
                      <div className="pt-1">
                          <h3 className="text-xl font-bold text-[#024a9d] mb-1">Address</h3>
                          <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-[280px]">
                              B1-91/D, Block B1, Sector G, Jankipuram, Lucknow, Uttar Pradesh 226021
                          </p>
                      </div>
                  </div>
                  <div className="md:w-2/3 w-full h-[350px] border border-red-500 rounded-none-none overflow-hidden shadow-sm">
                      <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14343.837877207604!2d80.950797!3d26.903823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957d54baf6859%3A0x6bba847c20c09033!2sZomocook%20Training%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                          width="100%" 
                          height="100%" 
                          style={{border: 0}} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                  </div>
              </div>
          </div>
      </div>

      {/* 8. FAQ's */}
      <div className="py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-[28px] sm:text-[34px] font-bold text-[#024a9d]">
                  FAQ's
              </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
              
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-6">
                  {/* Item 1 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          1. What is Zomocook?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Zomocook is a platform that connects restaurants and homes with experienced chefs and cooks for various culinary needs.
                      </p>
                  </div>
                  {/* Item 2 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          What services does Zomocook offer?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Zomocook offers complete chef solution for commercial needs either it for permanent requirment for staff or temporary staffing needs when your chef on leave. also we provide chef and cook hiring services for events, parties, and home cooking, including specialized cuisines.
                      </p>
                  </div>
                  {/* Item 3 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          How do I book a chef or cook through Zomocook?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Simply visit our website or Call to 9519808734 , select the type of service you need, choose your preferred chef or cook, and follow the booking process.
                      </p>
                  </div>
                  {/* Item 4 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          What types of chefs and cooks are available on Zomocook?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          We have a wide range of experienced chefs and cooks specializing in various cuisines, including Japanese, Indian, Italian, and more.
                      </p>
                  </div>
                  {/* Item 5 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          Can I request a specific chef or cook?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Yes, you can choose from our list of available professionals or request a specific chef/cook based on your preferences.
                      </p>
                  </div>
                  {/* Item 6 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          Is there a cancellation policy?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Yes, please refer to our terms and conditions for details on cancellations and refunds.
                      </p>
                  </div>
                  {/* Item 7 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          What types of events do you cater to?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          We cater to a wide range of events, including corporate events, weddings, birthdays, and more.
                      </p>
                  </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                  {/* Item 8 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          Can zomcook provide complete chef team for new or running restaurnt
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Zomocook offers comprehensive chef team solutions for both new and running restaurants. Our services include: Experienced Chefs Kitchen Staff , Customized Solutions and also help to setup kitchen and all required documentation process
                      </p>
                  </div>
                  {/* Item 9 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          Can I find temporary staff from Zomocook in Lucknow when our chef goes on leave?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Yes, we will provide temporary staff solutions to run a smooth kitchen.
                      </p>
                  </div>
                  {/* Item 10 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          Can Zomocook help us onboard online food delivery platforms?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Yes, we are a staffing partner for Zomato Restaurant Service Hub. We help you with onboarding on Zomato and Swiggy platforms.
                      </p>
                  </div>
                  {/* Item 11 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          Can Zomocook provide staff on a contract basis for guaranteed reliability?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Yes, we provide staffing services on multiple service plans depending on customer requirements.
                      </p>
                  </div>
                  {/* Item 12 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          How much time will Zomocook take to replace a chef?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          We proceed with staff replacement after receiving a replacement request from either the client or staff side. Generally, we take 2-4 days to replace staff with a new one. It also depends on distance and availability of staff at your location.
                      </p>
                  </div>
                  {/* Item 13 */}
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">
                          Is Zomocook available pan-India?
                      </div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">
                          Yes, we are available pan-India with various cook services, Our recent development in Andaman & Nicobar Islands for chef requirement services.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* SEO FOOTER TEXT */}
      <div className="max-w-[90%] mx-auto pb-32">
          <p className="text-[10px] sm:text-[11px] leading-[1.8] text-slate-300 text-justify font-normal break-words">
              Chef training in Delhi, chef training in Mumbai, chef training in Bangalore, chef training in Hyderabad, chef training in Chennai, chef training in Kolkata, chef training in Pune, chef training in Ahmedabad, chef training in Jaipur, chef training in Chandigarh, chef training in Noida, chef training in Gurgaon, chef training in Ghaziabad, chef training in Faridabad, chef training in Lucknow, chef training in Kanpur, chef training in Indore, chef training in Bhopal, chef training in Patna, chef training in Ranchi, chef training in Nagpur, chef training in Surat, chef training in Vadodara, chef training in Nashik, chef training in Agra, chef training in Varanasi, chef training in Prayagraj, chef training in Dehradun, chef training in Jodhpur, chef training in Udaipur, chef training in Raipur, chef training in Bhubaneswar, chef training in Guwahati, chef training in Coimbatore, cooking classes in Delhi, cooking classes in Mumbai, cooking classes in Bangalore, cooking classes in Hyderabad, cooking classes in Chennai, cooking classes in Kolkata, cooking classes in Pune, cooking classes in Ahmedabad, cooking classes in Jaipur, cooking classes in Chandigarh, cooking classes in Noida, cooking classes in Gurgaon, cooking classes in Ghaziabad, cooking classes in Faridabad, cooking classes in Lucknow, cooking classes in Kanpur, cooking classes in Indore, cooking classes in Bhopal, cooking classes in Patna, cooking classes in Ranchi, cooking classes in Nagpur, cooking classes in Surat, cooking classes in Vadodara, cooking classes in Nashik, cooking classes in Agra, cooking classes in Varanasi, cooking classes in Prayagraj, cooking classes in Dehradun, cooking classes in Jodhpur, cooking classes in Udaipur, cooking classes in Raipur, cooking classes in Bhubaneswar, cooking classes in Guwahati, cooking classes in Coimbatore, chef course in Delhi, chef course in Mumbai, chef course in Bangalore, chef course in Hyderabad, chef course in Chennai, chef course in Kolkata, chef course in Pune, chef course in Ahmedabad, chef course in Jaipur, chef course in Chandigarh, chef course in Noida, chef course in Gurgaon, chef course in Ghaziabad, chef course in Faridabad, chef course in Lucknow, chef course in Kanpur, chef course in Indore, chef course in Bhopal, chef course in Patna, chef course in Ranchi, chef course in Nagpur, chef course in Surat, chef course in Vadodara, chef course in Nashik, chef course in Agra, chef course in Varanasi, chef course in Prayagraj, chef course in Dehradun, chef course in Jodhpur, chef course in Udaipur, chef course in Raipur, chef course in Bhubaneswar, chef course in Guwahati, chef course in Coimbatore, chef training with placement in Delhi, chef training with placement in Mumbai, chef training with placement in Bangalore, chef training with placement in Hyderabad, chef training with placement in Chennai, chef training with placement in Kolkata, chef training with placement in Pune, chef training with placement in Ahmedabad, chef training with placement in Jaipur, chef training with placement in Chandigarh, chef training with placement in Noida, chef training with placement in Gurgaon, chef training with placement in Ghaziabad, chef training with placement in Faridabad, chef training with placement in Lucknow, cook training with job in Delhi, cook training with job in Mumbai, cook training with job in Bangalore, cook training with job in Hyderabad, cook training with job in Chennai, cook training with job in Kolkata, cook training with job in Pune, cook training with job in Ahmedabad, cook training with job in Jaipur, cook training with job in Chandigarh, cook training with job in Lucknow, waiter training in Delhi, waiter training in Mumbai, waiter training in Bangalore, waiter training in Hyderabad, waiter training in Chennai, waiter training in Kolkata, waiter training in Pune, waiter training in Ahmedabad, waiter training in Jaipur, waiter training in Chandigarh, horeca training in Delhi, horeca training in Mumbai, horeca training in Bangalore, horeca training in Hyderabad, horeca training in Chennai, horeca training in Kolkata, horeca training in Pune, horeca training in Ahmedabad, horeca training in Jaipur, horeca training in Chandigarh, horeca training in Lucknow, hotel staff training in Delhi, hotel staff training in Mumbai, hotel staff training in Bangalore, hotel staff training in Hyderabad, hotel staff training in Chennai, hotel staff training in Kolkata, hotel staff training in Pune, hotel staff training in Ahmedabad, hotel staff training in Jaipur, hotel staff training in Chandigarh, hotel staff training in Lucknow, cook near me, chef near me, private chef near me, cook for home near me, cooking services near me, hire cook near me, hire chef near me, domestic cook near me, home cook near me, personal chef near me, hire cook in Delhi, hire cook in Mumbai, hire cook in Bangalore, hire cook in Hyderabad, hire cook in Chennai, hire cook in Kolkata, hire cook in Pune, hire cook in Ahmedabad, hire cook in Jaipur, hire cook in Lucknow, hire chef in Delhi, hire chef in Mumbai, hire chef in Bangalore, hire chef in Hyderabad, hire chef in Chennai, hire chef in Kolkata, hire chef in Pune, hire chef in Ahmedabad, hire chef in Jaipur, hire chef in Lucknow, cook for home in Delhi, cook for home in Mumbai, cook for home in Bangalore, cook for home in Hyderabad, cook for home in Chennai, cook for home in Kolkata, cook for home in Pune, cook for home in Ahmedabad, cook for home in Jaipur, cook for home in Lucknow, chef for home party in Delhi, chef for home party in Mumbai, chef for home party in Bangalore, chef for home party in Hyderabad, chef for home party in Chennai, chef for home party in Kolkata, chef for home party in Pune, chef for home party in Ahmedabad, chef for home party in Jaipur, chef for home party in Lucknow
          </p>
      </div>

      {/* RED STICKY BUTTON (From screenshots) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Link 
           href={`/training/${slug}/register`}
           className="bg-[#ef233c] hover:bg-[#d90429] shadow-[0_5px_25px_rgba(239,35,60,0.4)] text-white font-bold py-3.5 px-12 rounded-none transition-transform active:scale-95 text-[17px] inline-block text-center whitespace-nowrap">
            Register Now
        </Link>
      </div>

    </div>
  );
}
