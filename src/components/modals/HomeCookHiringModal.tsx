"use client";
import React, { useState, useEffect } from 'react';
import { 
  X, Check, ArrowRight, ArrowLeft, 
  ShieldCheck, CheckCircle2, Phone, User, 
  MapPin, Loader2, IndianRupee, Sparkles
} from 'lucide-react';
import Swal from 'sweetalert2';
import { getApiBaseUrl } from '@/lib/apiConfig';

interface HomeCookHiringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cookLevels = [
  {
    id: 'basic',
    name: 'Basic Cook',
    desc: 'Simple home-made food with less experience.',
    salary: '₹15,000 – ₹18,000/month',
    badge: '₹15K – ₹18K / month'
  },
  {
    id: 'standard',
    name: 'Standard Cook',
    desc: 'Multi-cuisine cooking with highly experienced staff.',
    salary: '₹20,000 – ₹25,000/month',
    badge: '₹20K – ₹25K / month'
  },
  {
    id: 'premium',
    name: 'Premium Chef',
    desc: 'Expert multi-cuisine private chef with high experience.',
    salary: '₹30,000+/month',
    badge: '₹30K+ / month'
  }
];

const foodPreferences = [
  'Vegetarian',
  'Non-Vegetarian',
  'Vegan',
  'Jain Food',
  'Both Veg & Non-Veg'
];

const genderPreferences = ['Male', 'Female', 'Anyone'];

const serviceDurations = ['10 Hours', '24 Hours'];

const familyMemberOptions = [
  '1 Member',
  '2 Members',
  '3 Members',
  '4 Members',
  '5 Members',
  '6 Members',
  '7 Members',
  '8 Members',
  '9 Members',
  '10 Members',
  '11–15 Members',
  '15+ Members'
];

export default function HomeCookHiringModal({ isOpen, onClose }: HomeCookHiringModalProps) {
  const [step, setStep] = useState<number>(1);

  // Step 1: Basic Details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Step 2: Cook Requirement
  const [selectedCookLevel, setSelectedCookLevel] = useState('basic');
  const [selectedFoodPref, setSelectedFoodPref] = useState('Vegetarian');
  const [selectedGender, setSelectedGender] = useState('Female');
  const [selectedDuration, setSelectedDuration] = useState('10 Hours');
  const [familyMembers, setFamilyMembers] = useState('4 Members');
  const [message, setMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Submission & Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const API_BASE = getApiBaseUrl();

  // Timer countdown for OTP
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Check saved login session
  useEffect(() => {
    if (isOpen) {
      try {
        const storedUser = localStorage.getItem('zomo_user');
        const storedToken = localStorage.getItem('zomo_token');
        if (storedUser && storedToken) {
          const parsed = JSON.parse(storedUser);
          if (parsed.phone) {
            setPhone(parsed.phone);
            setIsPhoneVerified(true);
          }
          if (parsed.name) setName(parsed.name);
          setUserToken(storedToken);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Send OTP
  const handleSendOtp = async () => {
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Mobile Number Required',
        text: 'Please enter a valid 10-digit mobile number.',
        confirmButtonColor: '#d62423'
      });
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setTimer(60);
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: `Verification OTP has been sent to ${cleanPhone}.`,
          confirmButtonColor: '#d62423'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send OTP',
          text: data.message || 'Please check the mobile number and try again.',
          confirmButtonColor: '#d62423'
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to connect to SMS server. Please check your internet or try again later.',
        confirmButtonColor: '#d62423'
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.length < 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter OTP',
        text: 'Please enter the 6-digit verification code.',
        confirmButtonColor: '#d62423'
      });
      return;
    }

    setIsVerifyingOtp(true);
    const cleanPhone = phone.trim().replace(/\D/g, '');

    try {
      const res = await fetch(`${API_BASE}/api/admin/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          otp: otpValue.trim(),
          role: 'Customer',
          name: name.trim() || undefined
        })
      });
      const data = await res.json();

      if (data.success) {
        setIsPhoneVerified(true);
        setOtpSent(false);
        if (data.token) {
          setUserToken(data.token);
          try {
            localStorage.setItem('zomo_token', data.token);
            localStorage.setItem('zomo_user', JSON.stringify({
              phone: cleanPhone,
              name: name.trim() || data.user?.name || 'Customer',
              role: 'Customer'
            }));
          } catch (storageErr) {}
        }
        Swal.fire({
          icon: 'success',
          title: 'Phone Verified!',
          text: 'Your mobile number has been successfully verified.',
          timer: 1800,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid OTP',
          text: data.message || 'Please enter the correct 6-digit OTP.',
          confirmButtonColor: '#d62423'
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.message || 'Unable to connect to server. Please try again.',
        confirmButtonColor: '#d62423'
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Step 1 Validation
  const handleProceedToStep2 = () => {
    if (!name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Name Required', text: 'Please enter your full name.', confirmButtonColor: '#d62423' });
      return;
    }
    if (!phone || phone.length < 10) {
      Swal.fire({ icon: 'warning', title: 'Phone Required', text: 'Please enter your 10-digit mobile number.', confirmButtonColor: '#d62423' });
      return;
    }
    if (!isPhoneVerified) {
      Swal.fire({ icon: 'warning', title: 'Verification Required', text: 'Please verify your mobile number with OTP first.', confirmButtonColor: '#d62423' });
      return;
    }
    if (!address.trim()) {
      Swal.fire({ icon: 'warning', title: 'Address Required', text: 'Please enter your complete address.', confirmButtonColor: '#d62423' });
      return;
    }
    setStep(2);
  };

  // Step 2 Validation
  const handleProceedToStep3 = () => {
    if (!agreeTerms) {
      Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to salary & leave note.', confirmButtonColor: '#d62423' });
      return;
    }
    setStep(3);
  };

  // Step 4 Final Submit & Cashfree Live Payment
  const handleConfirmAndPay = async () => {
    setIsSubmitting(true);
    const activeCookLevel = cookLevels.find(c => c.id === selectedCookLevel) || cookLevels[0];

    try {
      const fullRequirementDetails = `Cook Level: ${activeCookLevel.name}, Salary: ${activeCookLevel.salary}, Food: ${selectedFoodPref}, Gender: ${selectedGender}, Duration: ${selectedDuration}, Family: ${familyMembers}${message.trim() ? `, Notes: ${message.trim()}` : ''}`;

      const payload = {
        jobCategory: 'home',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        address: address.trim(),
        outletName: `${name.trim()}'s Residence`,
        familyMembers,
        message: fullRequirementDetails,
        staffList: [
          {
            category: activeCookLevel.name,
            serviceCategory: 'Kitchen Staff',
            salary: activeCookLevel.id === 'basic' ? 18000 : (activeCookLevel.id === 'standard' ? 25000 : 35000),
            salaryRange: activeCookLevel.salary,
            count: 1,
            food: selectedFoodPref,
            accommodation: selectedDuration === '24 Hours' ? 'Available' : 'Not Available'
          }
        ],
        pricing: {
          processingFee: 299,
          advance: 299
        }
      };

      let generatedRef = `ZOMO-${Math.floor(100000 + Math.random() * 900000)}`;

      const res = await fetch(`${API_BASE}/api/jobs/web-commercial-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userToken && { 'Authorization': `Bearer ${userToken}` })
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.jobs && data.jobs[0]?.jobCode) {
        generatedRef = data.jobs[0].jobCode;
      }

      // Save lead backup
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim().replace(/\D/g, ''),
            subject: 'Home Cook Requirement',
            message: `Cook: ${activeCookLevel.name}, Salary: ${activeCookLevel.salary}, Food: ${selectedFoodPref}, Gender: ${selectedGender}, Duration: ${selectedDuration}, Family: ${familyMembers}, Address: ${address}`
          })
        });
      } catch (leadErr) {}

      // Cashfree Payment Gateway Trigger
      if (data.paymentSessionId && typeof (window as any).Cashfree !== 'undefined') {
        const cfEnv = (data.environment === 'SANDBOX' || data.environment === 'TEST') ? 'sandbox' : 'production';
        const cashfree = (window as any).Cashfree({ mode: cfEnv });

        cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: '_modal'
        }).then((result: any) => {
          if (result.error) {
            Swal.fire({
              icon: 'error',
              title: 'Payment Incomplete',
              text: 'Payment was not completed. Please complete ₹299 processing fee to confirm.',
              confirmButtonColor: '#d62423'
            });
          } else {
            setBookingRef(generatedRef);
            setBookingSuccess(true);
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful & Booking Confirmed!',
              text: `Your cook requirement #${generatedRef} has been received. Our team will verify and assign cook profiles shortly.`,
              confirmButtonColor: '#d62423'
            });
          }
        });
      } else {
        // Direct Success fallback if no payment session
        setBookingRef(generatedRef);
        setBookingSuccess(true);
        Swal.fire({
          icon: 'success',
          title: 'Requirement Registered!',
          text: `Your cook requirement #${generatedRef} has been received! Our team will contact you shortly.`,
          confirmButtonColor: '#d62423'
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: error.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#d62423'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCook = cookLevels.find(c => c.id === selectedCookLevel) || cookLevels[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-[22px] shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="relative px-5 pt-4 pb-3 border-b border-slate-100 text-center bg-white flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center">
            <span className="text-[22px] font-black text-[#0f2441] tracking-tight">Zomo</span>
            <span className="text-[22px] font-black text-[#d62423] tracking-tight">Cook</span>
          </div>
          <p className="text-[12px] font-semibold text-slate-400 mt-0.5">
            Hire a professional home cook for your family
          </p>
        </div>

        {/* Stepper Bar */}
        {!bookingSuccess && (
          <div className="px-5 py-3.5 sm:py-4 bg-slate-50/80 border-b border-slate-100 flex-shrink-0 select-none">
            <div className="flex items-center justify-between max-w-2xl mx-auto px-1 sm:px-2">
              {[
                { num: 1, label: 'Basic Details' },
                { num: 2, label: 'Cook Requirement' },
                { num: 3, label: 'Booking Summary' },
                { num: 4, label: 'Processing Fee' }
              ].map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 shrink-0">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 min-w-[28px] min-h-[28px] sm:min-w-[32px] sm:min-h-[32px] aspect-square rounded-full shrink-0 flex items-center justify-center text-[11px] sm:text-[12px] font-black transition-all ${
                      step === s.num 
                        ? 'bg-[#024a9d] text-white shadow-sm ring-3 ring-blue-100' 
                        : step > s.num 
                        ? 'bg-green-600 text-white shadow-xs' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step > s.num ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      ) : (
                        <span className="leading-none text-[12px] sm:text-[13px] font-black">{s.num}</span>
                      )}
                    </div>
                    <span className={`text-[12px] font-bold hidden sm:inline whitespace-nowrap ${
                      step === s.num ? 'text-[#024a9d]' : step > s.num ? 'text-green-700' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`flex-1 h-[2px] mx-2 sm:mx-3 min-w-[8px] sm:min-w-[12px] transition-all rounded-full ${
                      step > s.num ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 text-slate-800">

          {/* ================= STEP 1: Basic Details ================= */}
          {step === 1 && !bookingSuccess && (
            <div className="space-y-3.5 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Basic Details
                </h2>
                <p className="text-[12px] text-slate-500">
                  Please enter your basic details to get started.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                  />
                </div>

                {/* Phone & Send OTP */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[12px] font-bold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    {isPhoneVerified && (
                      <span className="text-[11px] font-bold text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="tel"
                      maxLength={10}
                      disabled={isPhoneVerified}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ''));
                        if (isPhoneVerified) setIsPhoneVerified(false);
                      }}
                      placeholder="Enter 10 digit mobile number"
                      className={`flex-1 px-3 py-2 rounded-xl border ${
                        isPhoneVerified ? 'bg-slate-50 text-slate-600 border-green-300' : 'border-slate-200'
                      } focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all`}
                    />
                    {!isPhoneVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || phone.length < 10 || timer > 0}
                        className="px-3.5 py-2 bg-[#024a9d] hover:bg-[#013575] disabled:bg-slate-300 text-white font-bold text-[12.5px] rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 shadow-sm"
                      >
                        {isSendingOtp ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : timer > 0 ? (
                          `${timer}s`
                        ) : (
                          'Send OTP'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Inline OTP Input */}
              {otpSent && !isPhoneVerified && (
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 animate-in fade-in">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-bold text-[#024a9d]">
                      Enter 6-Digit Verification Code:
                    </span>
                    {timer > 0 ? (
                      <span className="text-[11px] text-slate-500 font-medium">Resend in {timer}s</span>
                    ) : (
                      <button 
                        type="button" 
                        onClick={handleSendOtp}
                        className="text-[11px] font-bold text-[#d62423] hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit OTP"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-blue-200 focus:border-[#024a9d] outline-none text-center font-bold tracking-widest text-[15px]"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingOtp || otpValue.length < 4}
                      className="px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold text-[12.5px] rounded-lg transition-colors flex items-center gap-1"
                    >
                      {isVerifyingOtp ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Verify OTP'}
                    </button>
                  </div>
                </div>
              )}

              {/* Address */}
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete address"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all resize-none"
                />
              </div>

              {/* Bottom Action */}
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(214,36,35,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: Cook Requirement ================= */}
          {step === 2 && !bookingSuccess && (
            <div className="space-y-3 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Cook Requirement Details
                </h2>
                <p className="text-[12px] text-slate-500">
                  Choose the cook level and preferences that match your family requirements.
                </p>
              </div>

              {/* Cook Level 3 Cards */}
              <div>
                <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
                  Cook Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {cookLevels.map(c => {
                    const isSelected = selectedCookLevel === c.id;
                    return (
                      <div 
                        key={c.id}
                        onClick={() => setSelectedCookLevel(c.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected 
                            ? 'border-[#024a9d] bg-blue-50/40 shadow-sm ring-1 ring-[#024a9d]' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <h4 className="text-[13.5px] font-extrabold text-[#0f2441]">{c.name}</h4>
                          <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{c.desc}</p>
                        </div>
                        <div className="mt-2 text-[12.5px] font-black text-[#d62423]">
                          {c.badge}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Food Preference Pills */}
              <div>
                <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                  Food Preference <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {foodPreferences.map(pref => {
                    const isSelected = selectedFoodPref === pref;
                    return (
                      <button
                        type="button"
                        key={pref}
                        onClick={() => setSelectedFoodPref(pref)}
                        className={`px-3 py-1 rounded-lg text-[12px] font-bold border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#024a9d] text-white border-[#024a9d]' 
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gender & Duration Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Gender Preference */}
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                    Gender Preference
                  </label>
                  <div className="flex gap-1.5">
                    {genderPreferences.map(g => {
                      const isSelected = selectedGender === g;
                      return (
                        <button
                          type="button"
                          key={g}
                          onClick={() => setSelectedGender(g)}
                          className={`flex-1 py-1 rounded-lg text-[12px] font-bold border text-center transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#024a9d] text-white border-[#024a9d]' 
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Service Duration */}
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                    Service Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1.5">
                    {serviceDurations.map(dur => {
                      const isSelected = selectedDuration === dur;
                      return (
                        <button
                          type="button"
                          key={dur}
                          onClick={() => setSelectedDuration(dur)}
                          className={`flex-1 py-1 rounded-lg text-[12px] font-bold border text-center transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#024a9d] text-white border-[#024a9d]' 
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {dur}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Family Members Dropdown & Message in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                    No. of Family Members <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 focus:border-[#024a9d] outline-none cursor-pointer"
                  >
                    {familyMemberOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-7">
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                    Message / Suggestion
                  </label>
                  <input 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Preferred dishes, instructions..."
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 focus:border-[#024a9d] outline-none text-[12.5px] font-medium"
                  />
                </div>
              </div>

              {/* Important Note Checkbox */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#024a9d] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[11.5px] text-slate-700 leading-snug">
                    <strong className="font-bold text-[#0f2441]">Important Note:</strong> I agree to provide salary between the <strong>5th~7th</strong> of every month and allow <strong>4 days of leave</strong> per month.
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-[13px] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(214,36,35,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: Booking Summary ================= */}
          {step === 3 && !bookingSuccess && (
            <div className="space-y-3 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Booking Summary
                </h2>
                <p className="text-[12px] text-slate-500">
                  Please review your details before proceeding.
                </p>
              </div>

              {/* Customer Details Box */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
                <h3 className="text-[13px] font-extrabold text-[#0f2441] mb-2 border-b border-slate-100 pb-1">
                  Customer Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px]">
                  <div>
                    <span className="text-slate-400 font-medium">Name:</span>
                    <p className="font-bold text-slate-800">{name}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Mobile:</span>
                    <p className="font-bold text-slate-800">{phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Address:</span>
                    <p className="font-bold text-slate-800 truncate">{address}</p>
                  </div>
                </div>
              </div>

              {/* Cook Requirement Box */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
                <h3 className="text-[13px] font-extrabold text-[#0f2441] mb-2 border-b border-slate-100 pb-1">
                  Cook Requirement
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-3 text-[12px]">
                  <div>
                    <span className="text-slate-400 font-medium">Cook Level:</span>
                    <p className="font-bold text-slate-800">{currentCook.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Salary:</span>
                    <p className="font-bold text-[#d62423]">{currentCook.salary}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Food Preference:</span>
                    <p className="font-bold text-slate-800">{selectedFoodPref}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Gender Preference:</span>
                    <p className="font-bold text-slate-800">{selectedGender}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Service Duration:</span>
                    <p className="font-bold text-slate-800">{selectedDuration}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">No. of Family Members:</span>
                    <p className="font-bold text-slate-800">{familyMembers}</p>
                  </div>
                </div>
                {message && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[12px]">
                    <span className="text-slate-400 font-medium">Message / Suggestion: </span>
                    <span className="font-medium text-slate-700">{message}</span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-[13px] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(214,36,35,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Processing Fee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: Processing Fee ================= */}
          {step === 4 && !bookingSuccess && (
            <div className="space-y-3.5 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Processing Fee
                </h2>
                <p className="text-[12px] text-slate-500">
                  Complete the processing fee to confirm your cook requirement.
                </p>
              </div>

              {/* Red Processing Fee Card */}
              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 text-center">
                <p className="text-[12px] font-bold text-[#d62423] tracking-wide uppercase">
                  Hiring Processing Fee
                </p>
                <div className="text-[36px] font-black text-[#d62423] tracking-tight my-0.5">
                  ₹299
                </div>
                <p className="text-[11.5px] text-slate-500 max-w-md mx-auto">
                  This fee is applicable for requirement verification and processing candidate shortlisting.
                </p>
              </div>

              {/* Light Blue Checkmarks Box */}
              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>Requirement verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>Cook profile shortlisting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>Candidate profile processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>Dedicated support</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-[13px] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAndPay}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#d62423] hover:bg-[#b81d1c] disabled:bg-slate-400 text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(214,36,35,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Confirm & Pay ₹299</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= SUCCESS SCREEN ================= */}
          {bookingSuccess && (
            <div className="text-center py-6 px-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-[22px] font-black text-[#0f2441] mb-1">
                Booking Confirmed Successfully!
              </h2>
              <p className="text-[13px] text-slate-600 max-w-md mx-auto mb-4">
                Thank you! Your home cook requirement has been placed. Our team will verify and share profiles within 24 hours.
              </p>
              
              {bookingRef && (
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-[13px] font-bold text-[#024a9d] mb-5">
                  Booking Reference: <span className="font-mono text-slate-900">{bookingRef}</span>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#024a9d] hover:bg-[#013575] text-white px-8 py-2.5 rounded-xl font-bold text-[14px] shadow-sm transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
