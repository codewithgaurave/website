"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Mail, 
  Lock,
  User,
  Phone,
  ChefHat,
  ChevronLeft
} from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden flex selection:bg-blue-200">
      
      {/* LEFT COL: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-12 lg:px-24 py-12 relative z-10 bg-white shadow-[20px_0_50px_rgba(0,0,0,0.05)]">
        
        {/* Back to Home Button */}
        <Link href="/" className="absolute top-8 left-4 lg:left-12 flex items-center gap-2 text-slate-500 hover:text-[#024a9d] transition-colors font-semibold text-sm group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="mb-10 text-center lg:text-left">
            <Link href="/" className="inline-block">
              <img src="/logo.jpeg" alt="Zomocook Logo" className="h-14 mx-auto lg:mx-0 object-contain" />
            </Link>
            <h2 className="mt-8 text-3xl font-black text-slate-900 tracking-tight">
              {isLogin ? 'Welcome Back!' : 'Create an Account'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              {isLogin 
                ? 'Please enter your details to sign in to your portal.' 
                : 'Join the largest hospitality network in India today.'}
            </p>
          </div>

          {/* Type Toggle */}
          {!isLogin && (
            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
              <button className="flex-1 bg-white shadow-sm py-2 text-sm font-bold text-[#024a9d] rounded-lg">
                I am a Client
              </button>
              <button className="flex-1 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 rounded-lg transition-colors">
                I am a Chef
              </button>
            </div>
          )}

          {/* The Form */}
          <form className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-slate-700 ml-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#024a9d]/20 focus:border-[#024a9d] transition-all text-slate-700 font-medium font-sans"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-slate-700 ml-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#024a9d]/20 focus:border-[#024a9d] transition-all text-slate-700 font-medium font-sans"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {!isLogin && (
              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-slate-700 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX" 
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#024a9d]/20 focus:border-[#024a9d] transition-all text-slate-700 font-medium font-sans"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#024a9d]/20 focus:border-[#024a9d] transition-all text-slate-700 font-medium font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {isLogin && <a href="#" className="text-xs font-bold text-[#024a9d] hover:underline">Forgot password?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#024a9d]/20 focus:border-[#024a9d] transition-all text-slate-700 font-medium font-sans"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="terms" className="mt-1 border-slate-300 rounded text-[#024a9d] focus:ring-[#024a9d]" />
                <label htmlFor="terms" className="text-xs text-slate-500 font-medium leading-relaxed">
                  I agree to the <a href="#" className="text-[#024a9d] hover:underline">Terms of Service</a> and <a href="#" className="text-[#024a9d] hover:underline">Privacy Policy</a>
                </label>
              </div>
            )}

            <button 
              type="button" 
              className="w-full bg-[#024a9d] hover:bg-[#00387a] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(2,74,157,0.5)] flex items-center justify-center gap-2 group mt-6"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-xs tracking-wider text-slate-400 font-bold uppercase">Or continue with</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* Social Logins */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
              <span className="text-sm font-semibold text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1877F2] hover:bg-[#0c63d4] border border-transparent rounded-xl transition-colors shadow-sm">
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span className="text-sm font-semibold text-white">Facebook</span>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-slate-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-[#e11d48] hover:text-[#be123c] hover:underline transition-colors"
                type="button"
              >
                {isLogin ? 'Sign up for free' : 'Sign in instead'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COL: Visual Area (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#024a9d] overflow-hidden items-center justify-center">
        {/* Dynamic Abstract Backgrounds */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-400 blur-[150px] mix-blend-screen animate-pulse duration-1000"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#e11d48] blur-[180px] mix-blend-screen opacity-50"></div>
        </div>
        
        {/* Main Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=1200&auto=format&fit=crop" 
            alt="Chef Cooking" 
            className="w-full h-full object-cover opacity-[0.35] mix-blend-overlay"
          />
        </div>

        {/* Floating Content Card */}
        <div className="relative z-10 p-12 max-w-lg">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-extrabold text-white mb-4 leading-tight">
              Join the Elite Network of Professionals
            </h3>
            
            <p className="text-blue-100 font-medium leading-relaxed">
              Zomocook connects top-tier culinary talent with the best hospitality venues across India. Whether you're seeking a role or hiring a team, you're in the right place.
            </p>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-[#024a9d] object-cover" src="https://i.pravatar.cc/100?img=1" alt="Face 1" />
                <img className="w-10 h-10 rounded-full border-2 border-[#024a9d] object-cover" src="https://i.pravatar.cc/100?img=2" alt="Face 2" />
                <img className="w-10 h-10 rounded-full border-2 border-[#024a9d] object-cover" src="https://i.pravatar.cc/100?img=3" alt="Face 3" />
              </div>
              <div className="text-sm font-bold text-white">
                <span className="text-[#38bdf8]">10k+</span> members joined
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
