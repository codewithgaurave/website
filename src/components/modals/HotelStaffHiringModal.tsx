"use client";
import React, { useState, useEffect } from 'react';
import { 
  X, Check, Plus, Trash2, ArrowRight, ArrowLeft, 
  ShieldCheck, CheckCircle2, Building2, Phone, User, 
  MapPin, Clock, AlertCircle, Loader2, IndianRupee
} from 'lucide-react';
import Swal from 'sweetalert2';
import { getApiBaseUrl } from '@/lib/apiConfig';

interface StaffItem {
  id: string;
  serviceCategory: string;
  staffCategory: string;
  salaryRange: string;
  noOfStaff: number;
}

interface HotelStaffHiringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceCategories = [
  'Hotel / Restaurant',
  'Cafe / Bakery',
  'Cloud Kitchen / Canteen',
  'Resort / Bar & Lounge',
  'Fast Food / QSR',
  'Dhaba / Catering Unit'
];

const staffCategories = [
  'Head Chef / Master Chef',
  'Sous Chef',
  'North Indian Chef',
  'South Indian Chef',
  'Chinese Chef',
  'Tandoor Chef',
  'Continental Chef',
  'Italian / Mexican Chef',
  'Mughlai Chef',
  'Bakery & Pastry Chef',
  'All-Rounder Cook',
  'Fast Food Cook',
  'Commi 1 / Commi 2',
  'Kitchen Helper / Commis 3',
  'Restaurant Manager',
  'Captain / Supervisor',
  'Waiter / Steward',
  'Bartender / Barista',
  'Dishwasher / Utility Staff',
  'Housekeeping Staff'
];

const salaryRanges = [
  '₹10,000 - ₹15,000',
  '₹15,000 - ₹20,000',
  '₹20,000 - ₹25,000',
  '₹25,000 - ₹35,000',
  '₹35,000 - ₹50,000',
  '₹50,000+'
];

export default function HotelStaffHiringModal({ isOpen, onClose }: HotelStaffHiringModalProps) {
  const [step, setStep] = useState<number>(1);

  // Step 1: Basic Details & Auth
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [timer, setTimer] = useState(0);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Step 2: Staff Requirement
  const [staffList, setStaffList] = useState<StaffItem[]>([
    {
      id: '1',
      serviceCategory: 'Hotel / Restaurant',
      staffCategory: 'Head Chef / Master Chef',
      salaryRange: '₹25,000 - ₹35,000',
      noOfStaff: 1
    }
  ]);

  // Facilities
  const [facilities, setFacilities] = useState<{ [key: string]: boolean }>({
    food: false,
    accommodation: false,
    pf: false,
    esi: false,
    uniform: false
  });

  const [agreeSalaryTerms, setAgreeSalaryTerms] = useState(true);

  // Submission & Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const API_BASE = getApiBaseUrl();

  // Timer countdown
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      // Check if user already logged in from localStorage
      try {
        const storedUser = localStorage.getItem('zomo_user');
        const storedToken = localStorage.getItem('zomo_token');
        if (storedUser && storedToken) {
          const parsed = JSON.parse(storedUser);
          if (parsed.phone) {
            setPhone(parsed.phone);
            setName(parsed.name || '');
            setIsPhoneVerified(true);
            setUserToken(storedToken);
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Send OTP
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
          text: `OTP has been sent to ${cleanPhone}.`,
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

  // Handle Verify OTP
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
          localStorage.setItem('zomo_token', data.token);
        }
        if (data.user) {
          localStorage.setItem('zomo_user', JSON.stringify(data.user));
          if (data.user.name && data.user.name !== 'Enter Full Name' && !name) {
            setName(data.user.name);
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Verified Successfully!',
          text: data.isNewUser ? 'New account created successfully.' : 'Logged in successfully.',
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

  // Staff rows management
  const handleAddStaffRow = () => {
    setStaffList(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        serviceCategory: 'Hotel / Restaurant',
        staffCategory: 'Sous Chef',
        salaryRange: '₹20,000 - ₹25,000',
        noOfStaff: 1
      }
    ]);
  };

  const handleRemoveStaffRow = (id: string) => {
    if (staffList.length === 1) return;
    setStaffList(prev => prev.filter(s => s.id !== id));
  };

  const handleStaffChange = (id: string, field: keyof StaffItem, value: any) => {
    setStaffList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
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
    if (!businessName.trim()) {
      Swal.fire({ icon: 'warning', title: 'Business Name Required', text: 'Please enter your restaurant / hotel / business name.', confirmButtonColor: '#d62423' });
      return;
    }
    if (!businessAddress.trim()) {
      Swal.fire({ icon: 'warning', title: 'Business Address Required', text: 'Please enter complete business address.', confirmButtonColor: '#d62423' });
      return;
    }
    setStep(2);
  };

  // Step 2 Validation
  const handleProceedToStep3 = () => {
    if (staffList.length === 0) {
      Swal.fire({ icon: 'warning', title: 'Staff Required', text: 'Please add at least 1 staff requirement.', confirmButtonColor: '#d62423' });
      return;
    }
    if (!agreeSalaryTerms) {
      Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the salary and leave terms.', confirmButtonColor: '#d62423' });
      return;
    }
    setStep(3);
  };

  // Step 4 Final Submit & Payment
  const handleConfirmAndPay = async () => {
    setIsSubmitting(true);
    const selectedFacilities = Object.keys(facilities)
      .filter(k => facilities[k])
      .map(k => {
        if (k === 'food') return 'Food Available';
        if (k === 'accommodation') return 'Accommodation';
        if (k === 'pf') return 'PF';
        if (k === 'esi') return 'ESI';
        if (k === 'uniform') return 'Uniform';
        return k;
      });

    try {
      // 1. Post to Backend API
      const payload = {
        jobCategory: 'hotel',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        address: businessAddress.trim(),
        outletName: businessName.trim(),
        facilities: selectedFacilities,
        staffList: staffList.map(s => ({
          category: s.staffCategory,
          serviceCategory: s.serviceCategory,
          salaryRange: s.salaryRange,
          count: Number(s.noOfStaff)
        })),
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

      // Also save Lead record
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email: `${phone}@zomocook.in`,
            sourceType: 'Hotel Staff Booking (₹299 Processing Fee)',
            message: `Business: ${businessName}, Address: ${businessAddress}, Staff: ${staffList.map(s => `${s.staffCategory} (${s.noOfStaff})`).join(', ')}, Facilities: ${selectedFacilities.join(', ')}`
          })
        });
      } catch (leadErr) {
        // ignore
      }

      // If Cashfree Payment Session is returned, open Payment Gateway
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
            // Payment success
            setBookingRef(generatedRef);
            setBookingSuccess(true);
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful & Booking Confirmed!',
              text: `Your staff requirement #${generatedRef} has been received. Our team will verify and assign candidate profiles shortly.`,
              confirmButtonColor: '#d62423'
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Gateway Error',
          text: data.message || 'Unable to initiate ₹299 payment. Please try again.',
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

  const selectedFacilitiesText = Object.keys(facilities)
    .filter(k => facilities[k])
    .map(k => {
      if (k === 'food') return 'Food Available';
      if (k === 'accommodation') return 'Accommodation';
      if (k === 'pf') return 'PF';
      if (k === 'esi') return 'ESI';
      if (k === 'uniform') return 'Uniform';
      return k;
    })
    .join(' • ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 text-center bg-white">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all duration-150"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center mb-1">
            <span className="text-[24px] font-black text-[#0f2441] tracking-tight">Zomo</span>
            <span className="text-[24px] font-black text-[#d62423] tracking-tight">cook</span>
          </div>
          <p className="text-[12.5px] font-semibold text-slate-400">
            Hire the right staff for your business
          </p>
        </div>

        {/* Stepper Progress Bar */}
        {!bookingSuccess && (
          <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-100">
            <div className="flex items-center justify-between max-w-xl mx-auto relative">
              {/* Step 1 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > 1 ? 'bg-green-500 text-white' : step === 1 ? 'bg-[#024a9d] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 1 ? 'text-[#024a9d]' : 'text-slate-500'}`}>
                  Basic Details
                </span>
              </div>

              <div className={`flex-1 h-[2px] mx-2 transition-colors ${step > 1 ? 'bg-green-500' : 'bg-slate-200'}`} />

              {/* Step 2 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > 2 ? 'bg-green-500 text-white' : step === 2 ? 'bg-[#024a9d] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '2'}
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 2 ? 'text-[#024a9d]' : 'text-slate-500'}`}>
                  Staff Requirement
                </span>
              </div>

              <div className={`flex-1 h-[2px] mx-2 transition-colors ${step > 2 ? 'bg-green-500' : 'bg-slate-200'}`} />

              {/* Step 3 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > 3 ? 'bg-green-500 text-white' : step === 3 ? 'bg-[#024a9d] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > 3 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '3'}
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 3 ? 'text-[#024a9d]' : 'text-slate-500'}`}>
                  Booking Summary
                </span>
              </div>

              <div className={`flex-1 h-[2px] mx-2 transition-colors ${step > 3 ? 'bg-green-500' : 'bg-slate-200'}`} />

              {/* Step 4 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 4 ? 'bg-[#024a9d] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  4
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 4 ? 'text-[#024a9d]' : 'text-slate-500'}`}>
                  Processing Fee
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800">

          {/* ================= STEP 1: Basic Details ================= */}
          {step === 1 && !bookingSuccess && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-[20px] font-extrabold text-[#0f2441] tracking-tight">
                  Basic Details
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Please enter your business details to get started.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Your Name */}
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[14px] font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Mobile Number with OTP */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[13px] font-bold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    {isPhoneVerified && (
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
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
                      className={`flex-1 px-3.5 py-2.5 rounded-xl border ${
                        isPhoneVerified ? 'bg-slate-50 text-slate-600 border-green-300' : 'border-slate-200'
                      } focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[14px] font-medium transition-all`}
                    />
                    {!isPhoneVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || phone.length < 10 || timer > 0}
                        className="px-4 py-2.5 bg-[#024a9d] hover:bg-[#013575] disabled:bg-slate-300 text-white font-bold text-[13px] rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        {isSendingOtp ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
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

              {/* Inline OTP Input Box */}
              {otpSent && !isPhoneVerified && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12.5px] font-bold text-[#024a9d]">
                      Enter 6-Digit Verification Code:
                    </span>
                    {timer > 0 ? (
                      <span className="text-[11.5px] text-slate-500 font-medium">Resend in {timer}s</span>
                    ) : (
                      <button 
                        type="button" 
                        onClick={handleSendOtp}
                        className="text-[11.5px] font-bold text-[#d62423] hover:underline"
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
                      className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-blue-200 focus:border-[#024a9d] outline-none text-center font-bold tracking-widest text-[16px]"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingOtp || otpValue.length < 4}
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold text-[13px] rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      {isVerifyingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify OTP'}
                    </button>
                  </div>
                </div>
              )}

              {/* Business Name */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Restaurant / Hotel / Cafe / Cloud Kitchen"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[14px] font-medium transition-all"
                />
              </div>

              {/* Business Address */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={3}
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Enter complete business address"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[14px] font-medium transition-all resize-none"
                />
              </div>

              {/* Next Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="inline-flex items-center gap-2 bg-[#d62423] hover:bg-[#b81d1c] text-white px-7 py-3 rounded-xl font-bold text-[14px] shadow-[0_4px_12px_rgba(214,36,35,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  <span>Proceed to Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: Staff Requirement ================= */}
          {step === 2 && !bookingSuccess && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-[20px] font-extrabold text-[#0f2441] tracking-tight">
                  Staff Requirement Details
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Add the staff positions you require.
                </p>
              </div>

              {/* Dynamic Staff Rows */}
              <div className="space-y-3">
                {staffList.map((item, index) => (
                  <div 
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-colors"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      {/* Service Category */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
                          Service Category <span className="text-red-500">*</span>
                        </label>
                        <select 
                          value={item.serviceCategory}
                          onChange={(e) => handleStaffChange(item.id, 'serviceCategory', e.target.value)}
                          className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-medium text-slate-800 focus:border-[#024a9d] outline-none cursor-pointer"
                        >
                          {serviceCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Staff Category */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
                          Staff Category <span className="text-red-500">*</span>
                        </label>
                        <select 
                          value={item.staffCategory}
                          onChange={(e) => handleStaffChange(item.id, 'staffCategory', e.target.value)}
                          className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-medium text-slate-800 focus:border-[#024a9d] outline-none cursor-pointer"
                        >
                          {staffCategories.map(sc => (
                            <option key={sc} value={sc}>{sc}</option>
                          ))}
                        </select>
                      </div>

                      {/* Salary Range */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
                          Salary Range <span className="text-red-500">*</span>
                        </label>
                        <select 
                          value={item.salaryRange}
                          onChange={(e) => handleStaffChange(item.id, 'salaryRange', e.target.value)}
                          className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-medium text-slate-800 focus:border-[#024a9d] outline-none cursor-pointer"
                        >
                          {salaryRanges.map(sal => (
                            <option key={sal} value={sal}>{sal}</option>
                          ))}
                        </select>
                      </div>

                      {/* No. of Staff */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11.5px] font-bold text-slate-600 mb-1">
                          No. <span className="text-red-500">*</span>
                        </label>
                        <select 
                          value={item.noOfStaff}
                          onChange={(e) => handleStaffChange(item.id, 'noOfStaff', Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-[13.5px] font-bold text-slate-800 focus:border-[#024a9d] outline-none text-center cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      {/* Delete Row Button */}
                      <div className="sm:col-span-1 flex justify-end sm:justify-center">
                        <button
                          type="button"
                          disabled={staffList.length === 1}
                          onClick={() => handleRemoveStaffRow(item.id)}
                          className="w-9 h-9 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-30 disabled:hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove row"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Staff Button */}
              <div>
                <button
                  type="button"
                  onClick={handleAddStaffRow}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#024a9d] text-[#024a9d] hover:bg-blue-50 text-[13px] font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add More Staff</span>
                </button>
              </div>

              {/* Additional Facilities */}
              <div className="pt-2">
                <label className="block text-[13px] font-bold text-slate-800 mb-2">
                  Additional Facilities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'food', label: 'Food Available' },
                    { id: 'accommodation', label: 'Accommodation' },
                    { id: 'pf', label: 'PF' },
                    { id: 'esi', label: 'ESI' },
                    { id: 'uniform', label: 'Uniform' }
                  ].map(fac => (
                    <label 
                      key={fac.id}
                      className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-xl border cursor-pointer text-[12px] font-semibold transition-all h-full min-h-[46px] select-none text-center ${
                        facilities[fac.id] 
                          ? 'border-[#024a9d] bg-blue-50/80 text-[#024a9d] shadow-sm ring-1 ring-[#024a9d]/30' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={facilities[fac.id] || false}
                        onChange={(e) => setFacilities(prev => ({ ...prev, [fac.id]: e.target.checked }))}
                        className="rounded text-[#024a9d] focus:ring-0 shrink-0 w-4 h-4 cursor-pointer"
                      />
                      <span className="leading-tight">{fac.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Important Note Box */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
                <input 
                  type="checkbox"
                  id="salaryTerms"
                  checked={agreeSalaryTerms}
                  onChange={(e) => setAgreeSalaryTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#024a9d] focus:ring-0"
                />
                <label htmlFor="salaryTerms" className="text-[12.5px] font-medium text-slate-700 leading-snug cursor-pointer">
                  <strong className="text-[#024a9d]">Important Note:</strong> I agree to provide salary between the <strong>5th~7th</strong> of every month and allow <strong>4 days of leave</strong> per month.
                </label>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[13.5px] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="inline-flex items-center gap-2 bg-[#d62423] hover:bg-[#b81d1c] text-white px-7 py-3 rounded-xl font-bold text-[14px] shadow-[0_4px_12px_rgba(214,36,35,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  <span>Proceed to Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: Booking Summary ================= */}
          {step === 3 && !bookingSuccess && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-[20px] font-extrabold text-[#0f2441] tracking-tight">
                  Booking Summary
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Please review your details before proceeding.
                </p>
              </div>

              {/* Customer Details Box */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-wider mb-2.5">
                  Customer Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13.5px]">
                  <div>
                    <span className="text-slate-500 font-medium">Name: </span>
                    <strong className="text-slate-800">{name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Business: </span>
                    <strong className="text-slate-800">{businessName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Mobile: </span>
                    <strong className="text-slate-800">{phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Address: </span>
                    <strong className="text-slate-800">{businessAddress}</strong>
                  </div>
                </div>
              </div>

              {/* Staff Requirement Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                <div className="p-3 bg-slate-50 border-b border-slate-200">
                  <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">
                    Staff Requirement
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-slate-50/50 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-4 py-2.5">Service</th>
                        <th className="px-4 py-2.5">Staff</th>
                        <th className="px-4 py-2.5">Salary</th>
                        <th className="px-4 py-2.5 text-center">No.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {staffList.map((st, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-4 py-2.5">{st.serviceCategory}</td>
                          <td className="px-4 py-2.5 font-bold text-[#0f2441]">{st.staffCategory}</td>
                          <td className="px-4 py-2.5 text-slate-600">{st.salaryRange}</td>
                          <td className="px-4 py-2.5 text-center font-bold text-[#d62423]">{st.noOfStaff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Additional Facilities Card */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-wider mb-1.5">
                  Additional Facilities
                </h3>
                <p className="text-[13px] text-slate-600 font-medium">
                  {selectedFacilitiesText || 'None selected'}
                </p>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[13.5px] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 bg-[#d62423] hover:bg-[#b81d1c] text-white px-7 py-3 rounded-xl font-bold text-[14px] shadow-[0_4px_12px_rgba(214,36,35,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  <span>Proceed to Processing Fee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: Processing Fee ================= */}
          {step === 4 && !bookingSuccess && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h2 className="text-[20px] font-extrabold text-[#0f2441] tracking-tight">
                  Processing Fee
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Complete the processing fee to confirm your requirement.
                </p>
              </div>

              {/* Highlight Fee Card */}
              <div className="p-6 rounded-[22px] bg-gradient-to-b from-red-50/70 to-red-50/30 border-2 border-red-100 text-center">
                <span className="text-[13px] font-extrabold text-slate-600 uppercase tracking-wide">
                  Hiring Processing Fee
                </span>
                <div className="text-[40px] font-black text-[#d62423] my-1 leading-tight tracking-tight">
                  ₹299
                </div>
                <p className="text-[12.5px] text-slate-500 max-w-md mx-auto leading-relaxed">
                  This fee is applicable for requirement verification and processing candidate shortlisting.
                </p>
              </div>

              {/* Feature Checklist Box */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100/80 space-y-2 text-[13px] font-semibold text-slate-700">
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-green-600 stroke-[3]" />
                  <span>Requirement verification</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-green-600 stroke-[3]" />
                  <span>Candidate shortlisting</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-green-600 stroke-[3]" />
                  <span>Candidate profile processing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-green-600 stroke-[3]" />
                  <span>Dedicated support</span>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[13.5px] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmAndPay}
                  className="inline-flex items-center gap-2 bg-[#d62423] hover:bg-[#b81d1c] disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] shadow-[0_6px_16px_rgba(214,36,35,0.35)] transition-all transform hover:-translate-y-0.5"
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

          {/* ================= SUCCESS STATE ================= */}
          {bookingSuccess && (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-[24px] font-black text-[#0f2441] tracking-tight">
                  Booking Confirmed Successfully
                </h2>
                <p className="text-[13.5px] text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                  Your requirement has been posted and candidate shortlisting has started. You can login to the ZomoCook App anytime using your mobile number <strong>{phone}</strong>.
                </p>
              </div>

              {bookingRef && (
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-[13px] font-bold text-slate-800">
                  Requirement Code: <span className="text-[#d62423]">{bookingRef}</span>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#024a9d] hover:bg-[#013575] text-white px-8 py-3 rounded-xl font-bold text-[14px] shadow-sm transition-all"
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
