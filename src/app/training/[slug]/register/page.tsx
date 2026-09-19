"use client";
import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { HandPlatter, IndianRupee, Briefcase, MapPin, GraduationCap, Star, Award, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

/* --- COURSE DYNAMIC DATA --- */
const courses: Record<string, any> = {
  "chef-training": {
    heroBg: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2600&auto=format&fit=crop",
    title: "Chef Training (Commercial & Home Cook)",
    price: 14999
  },
  "special-courses": {
    heroBg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2600&auto=format&fit=crop",
    title: "Special Courses (Fast Food & Street Food)",
    price: 9999
  },
  "cuisine-courses": {
    heroBg: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=2600&auto=format&fit=crop",
    title: "Cuisine Cooking Courses",
    price: 14999
  },
  "staff-training": {
    heroBg: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2600&auto=format&fit=crop",
    title: "Staff Training (Captain & Waiter)",
    price: 3999
  }
};

export default function CourseRegistrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const course = courses[slug];

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
      fullName: '',
      phone: '',
      city: '',
      email: '',
      selectedCourse: '',
      batch: '',
      timing: '',
      placement: '',
      accommodation: '',
      comments: ''
  });

  if (!course) {
    return notFound();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleNextStep1 = () => {
    if(!formData.fullName || !formData.phone || !formData.city) {
        Swal.fire("Incomplete form", "Please fill in all mandatory details.", "warning");
        return;
    }
    setStep(2);
  }

  const handleNextStep2 = () => {
    if(!formData.batch || !formData.timing) {
        Swal.fire("Selection Required", "Please select a batch and preferred timing.", "warning");
        return;
    }
    setStep(3);
  }

  const handleNextStep3 = () => {
    if(!formData.placement || !formData.accommodation) {
        Swal.fire("Selection Required", "Please select yes or no for your additional requirements.", "warning");
        return;
    }
    setStep(4);
  }

  const handleNextStep4 = () => {
    setStep(5);
  }

  const handleNextAndPay = async () => {

    setLoading(true);
    try {
      // 1. Submit lead to database
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.fullName,
            phone: formData.phone,
            email: formData.email || 'N/A',
            sourceType: `Course Booking: ${formData.selectedCourse || course.title} (Batch: ${formData.batch}, ${formData.timing}) | Placement: ${formData.placement} | Hostel: ${formData.accommodation}`,
            sourceUrl: window.location.href, 
        })
      });

      // 2. Redirect to Cashfree specific payment link provided by user
      window.location.href = "https://payments.cashfree.com/forms?code=standardpackage";
      
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-200 mt-[70px] sm:mt-24 pb-20">

      {/* 1. HERO SECTION */}
      <div 
        className="relative w-full h-[400px] md:h-[450px] bg-cover bg-center flex items-center justify-center flex-col text-center px-4"
        style={{ backgroundImage: `url(${course.heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-white text-3xl sm:text-5xl md:text-[50px] font-black tracking-tight mb-4 drop-shadow-md pb-2">
                Enroll in Zomocook Culinary Training
            </h1>
            <p className="text-white/90 text-sm sm:text-lg md:text-[19px] font-medium max-w-2xl drop-shadow-sm pb-8">
                Join India's practical chef training institute and learn from industry experts with placement support.
            </p>
        </div>
      </div>

      {/* 2. REGISTRATION HEADER AREA (Negative margin overlap) */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20 flex flex-col items-center text-center">
          <div className="bg-[#2d3748] w-20 h-20 rounded-xl flex items-center justify-center shadow-lg mb-6 border-[4px] border-white text-yellow-500">
             <GraduationCap className="w-10 h-10" />
          </div>
          
          <h2 className="text-[32px] sm:text-[40px] font-black text-[#024a9d] mb-2 tracking-tight">Course Registration</h2>
          <p className="text-slate-500 font-bold text-[15.5px] mb-8">Join the Reserve Your Seat for the Upcoming Batch</p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12">
             <span className="bg-[#e4efff] text-[#024a9d] font-bold py-2 px-6 rounded-full flex items-center gap-2 text-[14px]">
                 <Star className="w-4 h-4 text-yellow-500 fill-current" /> 2500+ Students
             </span>
             <span className="bg-[#e4efff] text-[#024a9d] font-bold py-2 px-6 rounded-full flex items-center gap-2 text-[14px]">
                 <Award className="w-4 h-4 text-amber-700 fill-current" /> Certificate
             </span>
             <span className="bg-[#e4efff] text-[#024a9d] font-bold py-2 px-6 rounded-full flex items-center gap-2 text-[14px]">
                 <Briefcase className="w-4 h-4 text-orange-800 fill-current" /> Placement
             </span>
          </div>
      </div>

      {/* 3. THE FORM COMPONENT */}
      <div className="max-w-4xl mx-auto px-4 mb-20 relative z-20 text-left">
          {step === 1 && (
              <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border-t-[5px] border-[#024a9d] p-6 sm:p-10 pt-8 relative overflow-hidden">
                  
                  {/* Progress Bar */}
                  <div className="flex items-center gap-4 mb-8">
                      <span className="text-sm font-bold text-slate-500 w-8">0%</span>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0284c7] w-0 transition-all duration-500"></div>
                      </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#2d3748] mb-8 mt-2 tracking-tight">Personal Details</h3>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-bold text-slate-500">Full Name <span className="text-red-500">*</span></label>
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-[#f4f4f4] border border-[#e2e8f0] focus:border-[#024a9d] outline-none rounded p-3 text-[14px] font-medium text-slate-700 placeholder:text-slate-400" />
                      </div>
                      
                      <div className="flex flex-col gap-2 relative">
                          <label className="text-[13px] font-bold text-slate-500">Phone <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="081234 56789" className="w-full bg-[#f4f4f4] border border-[#e2e8f0] focus:border-[#024a9d] outline-none rounded p-3 text-[14px] font-medium text-slate-700 placeholder:text-slate-400" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 select-none">🇮🇳</span>
                          </div>
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-bold text-slate-500">City <span className="text-red-500">*</span></label>
                          <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-[#f4f4f4] border border-[#e2e8f0] focus:border-[#024a9d] outline-none rounded p-3 text-[14px] font-medium text-slate-700 placeholder:text-slate-400" />
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-bold text-slate-500">Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#f4f4f4] border border-[#e2e8f0] focus:border-[#024a9d] outline-none rounded p-3 text-[14px] font-medium text-slate-700 placeholder:text-slate-400" />
                      </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                      <button 
                         onClick={handleNextStep1}
                         className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-10 rounded text-[15px] transition-colors">
                          Next
                      </button>
                  </div>
              </div>
          )}

          {step === 2 && (
             <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border-t-[5px] border-[#024a9d] p-6 sm:p-10 pt-8 relative overflow-hidden">
                  
                  {/* Progress Bar 25% */}
                  <div className="flex items-center gap-4 mb-8">
                      <span className="text-sm font-bold text-slate-500 w-8">25%</span>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0284c7] w-[25%] transition-all duration-500"></div>
                      </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#2d3748] mb-8 mt-2 tracking-tight">Course Selection</h3>

                  {/* Select Course */}
                  <div className="mb-8">
                      <label className="text-[13px] font-bold text-slate-500 mb-2 block">Select Course</label>
                      <select name="selectedCourse" value={formData.selectedCourse || course.title} onChange={handleChange} className="w-full bg-[#f4f4f4] border border-[#b8c2cc] focus:border-[#0284c7] outline-none rounded p-3 text-[14px] font-medium text-slate-700">
                          {Object.values(courses).map((c, idx) => (
                              <option key={idx} value={c.title}>{c.title}</option>
                          ))}
                      </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
                      <div>
                          <label className="text-[13px] font-bold text-slate-500 block">Select Batch <span className="text-red-500">*</span></label>
                          <p className="text-[11px] text-slate-400 mb-4 mt-0.5">Batches start on 1st & 15th of every month</p>
                          <div className="space-y-4">
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="batch" value="1st of Month" checked={formData.batch === '1st of Month'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">Next Batch (1st of Month)</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="batch" value="15th of Month" checked={formData.batch === '15th of Month'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">Next Batch (15th of Month)</span>
                              </label>
                          </div>
                      </div>
                      
                      <div>
                          <label className="text-[13px] font-bold text-slate-500 block">Select Batch Timing <span className="text-red-500">*</span></label>
                          <p className="text-[11px] text-slate-400 mb-4 mt-0.5">Prefered Batch Timing</p>
                          <div className="space-y-4">
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="timing" value="Morning Batch" checked={formData.timing === 'Morning Batch'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">Morning Batch (10 AM- 12PM)</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="timing" value="Evening Batch" checked={formData.timing === 'Evening Batch'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">Evening Batch (2 PM- 4PM)</span>
                              </label>
                          </div>
                      </div>
                  </div>

                  <div className="mt-12 flex justify-between items-center">
                      <button onClick={() => setStep(1)} className="bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-3 px-8 rounded text-[15px] transition-colors">
                          Previous
                      </button>
                      <button onClick={handleNextStep2} className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-10 rounded text-[15px] transition-colors">
                          Next
                      </button>
                  </div>
             </div>
          )}

          {step === 3 && (
             <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border-t-[5px] border-[#024a9d] p-6 sm:p-10 pt-8 relative overflow-hidden">
                  
                  {/* Progress Bar 50% */}
                  <div className="flex items-center gap-4 mb-8">
                      <span className="text-sm font-bold text-slate-500 w-8">50%</span>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0284c7] w-[50%] transition-all duration-500"></div>
                      </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#2d3748] mb-8 mt-2 tracking-tight">Additional Requirements</h3>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-8 mb-6">
                      <div>
                          <label className="text-[13px] font-bold text-slate-500 block mb-4">Do you require Placement Assistance? <span className="text-red-500">*</span></label>
                          <div className="space-y-4">
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="placement" value="Yes" checked={formData.placement === 'Yes'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">Yes</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="placement" value="No" checked={formData.placement === 'No'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">No</span>
                              </label>
                          </div>
                      </div>
                      
                      <div>
                          <label className="text-[13px] font-bold text-slate-500 block mb-4">Do you require Food & Accommodation? <span className="text-red-500">*</span></label>
                          <div className="space-y-4">
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="accommodation" value="Yes" checked={formData.accommodation === 'Yes'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">Yes</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name="accommodation" value="No" checked={formData.accommodation === 'No'} onChange={handleChange} className="w-5 h-5 accent-[#0284c7]"/>
                                  <span className="text-[14px] text-slate-700 font-medium">No</span>
                              </label>
                          </div>
                      </div>
                  </div>

                  <div className="mb-8">
                      <label className="text-[13px] font-bold text-slate-500 block mb-2">Additional Comments</label>
                      <textarea name="comments" value={formData.comments} onChange={(e) => setFormData({...formData, comments: e.target.value})} rows={4} className="w-full bg-[#f4f4f4] border border-[#b8c2cc] focus:border-[#0284c7] outline-none rounded p-3 text-[14px] font-medium text-slate-700 resize-y"></textarea>
                  </div>

                  <div className="mt-12 flex justify-between items-center">
                      <button onClick={() => setStep(2)} className="bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-3 px-8 rounded text-[15px] transition-colors">
                          Previous
                      </button>
                      <button onClick={handleNextStep3} className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-10 rounded text-[15px] transition-colors">
                          Next
                      </button>
                  </div>
             </div>
          )}

          {step === 4 && (
             <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border-t-[5px] border-[#024a9d] p-6 sm:p-10 pt-8 relative overflow-hidden">
                  
                  {/* Progress Bar 75% */}
                  <div className="flex items-center gap-4 mb-8">
                      <span className="text-sm font-bold text-slate-500 w-8">75%</span>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0284c7] w-[75%] transition-all duration-500"></div>
                      </div>
                  </div>

                  <div className="text-center mb-10">
                      <h3 className="text-[26px] sm:text-[32px] font-black text-[#2d3748] mb-2 tracking-tight flex items-center justify-center gap-3">
                          🎓 Booking Summary
                      </h3>
                      <p className="text-slate-500 font-medium text-[15px]">Review your registration details before submitting your application.</p>
                  </div>

                  <div className="space-y-6 max-w-3xl mx-auto">
                      
                      {/* Personal Details Card */}
                      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
                          <h4 className="text-[#024a9d] font-bold text-[17px] mb-4 flex items-center gap-2">
                              <span className="text-xl">👤</span> Personal Details
                          </h4>
                          <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                                  <span className="text-slate-800 font-bold text-[14px]">Student Name</span>
                                  <span className="text-slate-600 font-medium text-[14px] uppercase">{formData.fullName}</span>
                              </div>
                              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                                  <span className="text-slate-800 font-bold text-[14px]">Mobile Number</span>
                                  <span className="text-slate-600 font-medium text-[14px] uppercase">{formData.phone}</span>
                              </div>
                              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                                  <span className="text-slate-800 font-bold text-[14px]">Email Address</span>
                                  <span className="text-slate-600 font-medium text-[14px] uppercase">{formData.email || 'N/A'}</span>
                              </div>
                              <div className="flex items-center justify-between pb-1">
                                  <span className="text-slate-800 font-bold text-[14px]">City</span>
                                  <span className="text-slate-600 font-medium text-[14px] uppercase">{formData.city}</span>
                              </div>
                          </div>
                      </div>

                      {/* Course Details Card */}
                      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
                          <h4 className="text-[#024a9d] font-bold text-[17px] mb-4 flex items-center gap-2">
                              <span className="text-xl">📚</span> Course Details
                          </h4>
                          <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                                  <span className="text-slate-800 font-bold text-[14px]">Selected Course</span>
                                  <span className="text-slate-600 font-medium text-[14px] text-right w-1/2">{formData.selectedCourse || course.title}</span>
                              </div>
                              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                                  <span className="text-slate-800 font-bold text-[14px]">Preferred Batch</span>
                                  <span className="text-slate-600 font-medium text-[14px]">{formData.batch}</span>
                              </div>
                              <div className="flex items-center justify-between pb-1">
                                  <span className="text-slate-800 font-bold text-[14px]">Batch Timing</span>
                                  <span className="text-slate-600 font-medium text-[14px]">{formData.timing}</span>
                              </div>
                          </div>
                      </div>

                      {/* Additional Requirements */}
                      <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
                          <h4 className="text-[#024a9d] font-bold text-[17px] mb-4 flex items-center gap-2">
                              <span className="text-xl">💼</span> Additional Requirements
                          </h4>
                          <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                                  <span className="text-slate-800 font-bold text-[14px]">Placement Assistance</span>
                                  <span className="text-slate-600 font-medium text-[14px]">{formData.placement}</span>
                              </div>
                              <div className="flex items-center justify-between pb-1">
                                  <span className="text-slate-800 font-bold text-[14px]">Food & Accommodation</span>
                                  <span className="text-slate-600 font-medium text-[14px]">{formData.accommodation}</span>
                              </div>
                          </div>
                      </div>

                      {/* Fee Summary */}
                      <div className="border border-slate-200 border-l-[6px] border-l-[#024a9d] rounded-xl p-6 bg-[#f8fbff] shadow-sm">
                          <h4 className="text-[#024a9d] font-bold text-[17px] mb-4 flex items-center gap-2">
                              <span className="text-xl">💰</span> Fee Summary
                          </h4>
                          <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                                  <span className="text-slate-800 font-bold text-[14px]">Total Course Fee</span>
                                  <span className="text-slate-800 font-medium text-[14px]">₹{(Object.values(courses).find(c => c.title === (formData.selectedCourse || course.title))?.price || course.price).toLocaleString()}.00</span>
                              </div>
                              <div className="flex items-center justify-between pb-2 border-b border-blue-600">
                                  <span className="text-slate-800 font-bold text-[14px]">Admission Advance</span>
                                  <span className="text-slate-800 font-bold text-[15px]">₹1,999</span>
                              </div>
                          </div>
                      </div>

                  </div>

                  <div className="text-center mt-12 mb-8 space-y-3">
                      <p className="text-slate-500 font-medium text-[14px] flex items-center justify-center gap-1.5"><span className="text-red-500">❤</span> Thank you for choosing <span className="text-[#024a9d] font-bold">Zomocook Training Academy</span></p>
                      <p className="text-slate-500 font-medium text-[13px] flex items-center justify-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 79856 58082</p>
                  </div>

                  <div className="mt-10 flex justify-between items-center max-w-3xl mx-auto">
                      <button onClick={() => setStep(3)} className="bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-3 px-8 rounded text-[15px] transition-colors">
                          Previous
                      </button>
                      <button onClick={handleNextStep4} className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 px-12 rounded text-[15px] transition-colors">
                          Submit
                      </button>
                  </div>
             </div>
          )}

          {step === 5 && (
             <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden max-w-2xl mx-auto">
                  {/* Blue Header */}
                  <div className="bg-[#0b65f0] text-center px-6 py-10 text-white relative">
                      <GraduationCap className="w-12 h-12 text-[#f59e0b] mx-auto mb-4" />
                      <h3 className="text-3xl font-black mb-3 tracking-tight">Complete Your Registration</h3>
                      <p className="font-semibold text-[15px] opacity-90">Reserve your seat by paying the <span className="font-bold">₹1,999</span> Advance Registration Fee</p>
                  </div>
                  
                  {/* Body Content */}
                  <div className="p-8">
                      {/* Price Card */}
                      <div className="border border-slate-200 rounded-2xl bg-[#fafafa] p-6 mb-8 max-w-lg mx-auto">
                          <div className="flex justify-between items-center mb-4">
                              <span className="text-slate-600 font-medium text-[15px]">Advance Registration Fee</span>
                              <span className="text-slate-900 font-bold text-[15px]">₹1,999</span>
                          </div>
                          <div className="flex justify-between items-center mb-6">
                              <span className="text-slate-600 font-medium text-[15px]">GST</span>
                              <span className="text-slate-900 font-bold text-[15px]">Included</span>
                          </div>
                          <div className="border-t border-dashed border-slate-300 pt-5 flex justify-between items-center">
                              <span className="text-[#024a9d] font-black text-xl">Total Payable</span>
                              <span className="text-[#024a9d] font-black text-xl">₹1,999</span>
                          </div>
                      </div>

                      {/* Benefits / Trust signals */}
                      <div className="space-y-4 max-w-lg mx-auto pl-2 mb-10">
                          <div className="flex items-center gap-3">
                              <div className="bg-green-500 rounded p-0.5 text-white"><CheckCircle2 className="w-4 h-4" /></div>
                              <span className="text-slate-700 font-bold text-[14px]">Instant Confirmation</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="text-xl leading-none">🔥</span>
                              <span className="text-slate-700 font-bold text-[14px]">Limited Seats Available</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="text-xl leading-none">🎓</span>
                              <span className="text-slate-700 font-bold text-[14px]">Secure Your Preferred Batch</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="text-xl leading-none">🔒</span>
                              <span className="text-slate-700 font-bold text-[14px]">100% Secure Payment</span>
                          </div>
                      </div>

                      {/* Payment Action */}
                      <div className="max-w-lg mx-auto text-center space-y-4">
                          <button 
                             onClick={handleNextAndPay} 
                             disabled={loading}
                             className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-black py-4 px-6 rounded-full text-[17px] transition-transform active:scale-95 shadow-[0_8px_20px_rgba(239,35,60,0.3)] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                          >
                              💳 {loading ? "Processing..." : "Pay ₹1,999 Registration Fee"}
                          </button>
                          
                          <p className="text-slate-400 font-medium text-[12px] flex items-center justify-center gap-1.5 pt-2">
                              🔒 Secure Payment Powered by <span className="font-bold text-[#0b65f0]">Cashfree Payments</span>
                          </p>
                      </div>
                  </div>
             </div>
          )}

          {step === 6 && (
             <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border-t-[5px] border-green-500 p-10 text-center py-20 relative overflow-hidden">
                <ShieldCheck className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-black text-slate-800 mb-2 mt-2 tracking-tight">Registration Secured!</h3>
                <p className="text-slate-500 font-medium">Thank you {formData.fullName}, your payment was successful and your seat is reserved.</p>
             </div>
          )}
      </div>

      {/* 4. WHY CHOOSE ZOMOCOOK TRAINING */}
      <div className="py-10 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#024a9d] mb-2">
                Why Choose Zomocook Training?
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base">
                Practical Training + Job Placement Support
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto border-b border-slate-200 pb-20">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    <HandPlatter className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-[17px] font-bold text-[#024a9d] mb-1.5">Hands On Training</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        100% Practical Training Experienced Professional Chefs
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    <IndianRupee className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-[17px] font-bold text-[#024a9d] mb-1.5">Affordable Fees Structure</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        Get the best training experience at a cost-effective price.
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
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

      {/* 5. TRAINING CENTER (Map) */}
      <div className="bg-transparent w-full pt-10">
          <div className="text-center mb-10">
              <h2 className="text-[28px] sm:text-[34px] font-bold text-[#024a9d]">
                  Training Center
              </h2>
          </div>
          <div className="bg-[#f4f4f4] py-10 sm:py-16 px-4">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                  <div className="flex items-start gap-4 md:w-1/3">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ef233c] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                          <MapPin className="w-7 h-7" />
                      </div>
                      <div className="pt-1">
                          <h3 className="text-xl font-bold text-[#024a9d] mb-1">Address</h3>
                          <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-[280px]">
                              B1-91/D, Block B1, Sector G, Jankipuram, Lucknow, Uttar Pradesh 226021
                          </p>
                      </div>
                  </div>
                  <div className="md:w-2/3 w-full h-[350px] border border-red-500 rounded-xl overflow-hidden shadow-sm">
                      <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14343.837877207604!2d80.950797!3d26.903823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957d54baf6859%3A0x6bba847c20c09033!2sZomocook%20Training%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                          width="100%" height="100%" style={{border: 0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                  </div>
              </div>
          </div>
      </div>

      {/* 6. FAQ's */}
      <div className="py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-[28px] sm:text-[34px] font-bold text-[#024a9d]">FAQ's</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-6">
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">1. What is Zomocook?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Zomocook is a platform that connects restaurants and homes with experienced chefs and cooks for various culinary needs.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">What services does Zomocook offer?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Zomocook offers complete chef solution for commercial needs either it for permanent requirment for staff or temporary staffing needs when your chef on leave. also we provide chef and cook hiring services for events, parties, and home cooking, including specialized cuisines.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">How do I book a chef or cook through Zomocook?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Simply visit our website or Call to 9519808734 , select the type of service you need, choose your preferred chef or cook, and follow the booking process.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">What types of chefs and cooks are available on Zomocook?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">We have a wide range of experienced chefs and cooks specializing in various cuisines, including Japanese, Indian, Italian, and more.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">Can I request a specific chef or cook?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Yes, you can choose from our list of available professionals or request a specific chef/cook based on your preferences.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">Is there a cancellation policy?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Yes, please refer to our terms and conditions for details on cancellations and refunds.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">What types of events do you cater to?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">We cater to a wide range of events, including corporate events, weddings, birthdays, and more.</p>
                  </div>
              </div>
              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">Can zomcook provide complete chef team for new or running restaurnt</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Zomocook offers comprehensive chef team solutions for both new and running restaurants. Our services include: Experienced Chefs Kitchen Staff , Customized Solutions and also help to setup kitchen and all required documentation process</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">Can I find temporary staff from Zomocook in Lucknow when our chef goes on leave?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Yes, we will provide temporary staff solutions to run a smooth kitchen.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">Can Zomocook help us onboard online food delivery platforms?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Yes, we are a staffing partner for Zomato Restaurant Service Hub. We help you with onboarding on Zomato and Swiggy platforms.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">Can Zomocook provide staff on a contract basis for guaranteed reliability?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Yes, we provide staffing services on multiple service plans depending on customer requirements.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">How much time will Zomocook take to replace a chef?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">We proceed with staff replacement after receiving a replacement request from either the client or staff side. Generally, we take 2-4 days to replace staff with a new one. It also depends on distance and availability of staff at your location.</p>
                  </div>
                  <div>
                      <div className="bg-[#f2f4f8] p-4 text-[#1e293b] font-bold mb-3">Is Zomocook available pan-India?</div>
                      <p className="text-[#334155] px-1 text-[15px] leading-relaxed">Yes, we are available pan-India with various cook services, Our recent development in Andaman & Nicobar Islands for chef requirement services.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* SEO FOOTER TEXT */}
      <div className="max-w-[90%] mx-auto pb-10">
          <p className="text-[10px] sm:text-[11px] leading-[1.8] text-slate-300 text-justify font-normal break-words">
              Chef training in Delhi, chef training in Mumbai, chef training in Bangalore, chef training in Hyderabad, chef training in Chennai, chef training in Kolkata, chef training in Pune, chef training in Ahmedabad, chef training in Jaipur, chef training in Chandigarh, chef training in Noida, chef training in Gurgaon... (etc)
          </p>
      </div>
    </div>
  );
}
