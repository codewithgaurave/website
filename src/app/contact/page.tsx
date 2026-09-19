"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChefHat, 
  MessageSquare,
  Building2,
  PhoneCall,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Presence from '@/components/Presence';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setStatus('error');
      setErrorMessage('Please fill out all fields.');
      return;
    }
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sourceType: 'Contact Page Inquiry',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to submit form.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden selection:bg-blue-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex items-center justify-center text-center bg-slate-900 border-b-[4px] border-[#38bdf8]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1600&auto=format&fit=crop" 
            alt="Contact Us" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#024a9d]/80 to-[#024a9d]/95"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-none-none mb-4">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-none-none animate-pulse shadow-[0_0_8px_rgba(74,222,128,1)]"></span>
            We are here to help
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-4 tracking-tight drop-shadow-md">
            Get In Touch <br />
            With <span className="text-[#38bdf8] drop-shadow-lg">Zomocook</span>
          </h1>
          
          <p className="text-white/90 text-[13px] sm:text-base font-medium max-w-xl mx-auto leading-relaxed mb-6 drop-shadow">
            Whether you're looking to hire a chef, book a trial, or join our training academy, our support team is available 24/7.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* LEFT: Contact Information (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-none-none p-8 lg:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden group h-full">
                {/* Decorative blob */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-50 rounded-none-none blur-2xl group-hover:bg-blue-100 transition-colors duration-500"></div>
                
                <h3 className="text-2xl font-extrabold text-[#024a9d] mb-8 relative z-10 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#e11d48]" />
                  Contact Info
                </h3>

                <div className="space-y-8 relative z-10">
                  {/* Address */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-none-none bg-blue-50 text-[#024a9d] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold mb-1">Corporate Office</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        Sector H, Jankipuram,<br />
                        Lucknow, Uttar Pradesh, 226021
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-none-none bg-blue-50 text-[#024a9d] flex items-center justify-center shrink-0">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold mb-1">Call Us</h4>
                      <div className="text-slate-500 text-sm leading-relaxed font-medium space-y-1">
                        <p className="hover:text-[#024a9d] transition-colors cursor-pointer">+91 951 980 8734</p>
                                              </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-none-none bg-blue-50 text-[#024a9d] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold mb-1">Email Us</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium hover:text-[#024a9d] transition-colors cursor-pointer">
                        zomocookhelp@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Timings */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-none-none bg-blue-50 text-[#024a9d] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold mb-1">Working Hours</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        24/7 Support Available for<br />Emergency Staffing
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form (3 Cols) */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-none-none p-8 lg:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-extrabold text-[#024a9d] mb-2 flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-[#e11d48]" />
                    Send us a Message
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">
                    Fill out the form below and our team will get back to you within 2-4 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-none-none flex items-center gap-2 border border-red-200">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}
                  {status === 'success' && (
                    <div className="bg-green-50 text-green-700 text-sm font-bold p-4 rounded-none-none flex items-center justify-center gap-2 border border-green-200">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      Thank you! Your message has been safely received.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-none-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-none-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="johndoe@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-none-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-[#024a9d] hover:bg-[#00387a] text-white font-bold py-4 rounded-none-none transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
                    {status !== 'loading' && status !== 'success' && (
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 font-medium mt-4 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    Your information is secure and will never be shared.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LOCATE US (Map Section) */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-100 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#024a9d] tracking-tight mb-2">
              Locate Us
            </h2>
            <p className="text-slate-500 font-bold text-[13px] sm:text-base">
              Visit our Headquarters in Lucknow
            </p>
          </div>

          <div className="w-full h-[400px] lg:h-[500px] rounded-none-none overflow-hidden shadow-lg border-[6px] border-white relative z-10 group">
            {/* Outline overlay to match theme */}
            <div className="absolute inset-0 border-[3px] border-[#024a9d]/10 rounded-none-none pointer-events-none z-20"></div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.67795370525!2d80.9348981!3d26.882196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd9bdc32b0f5%3A0xe54e33cf743b27b3!2sSector%20H%2C%20Jankipuram%2C%20Lucknow%2C%20Uttar%20Pradesh%20226021!5e0!3m2!1sen!2sin!4v1703145600000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 object-cover"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. PRESENCE FOOTER */}
      <Presence />

    </div>
  );
}
