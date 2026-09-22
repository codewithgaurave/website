"use client";
import React, { useState, useEffect } from 'react';
import { 
  X, Check, Plus, Trash2, ArrowRight, ArrowLeft, 
  CheckCircle2, Building2, Home, Loader2, IndianRupee, Calendar, Clock
} from 'lucide-react';
import Swal from 'sweetalert2';
import { getApiBaseUrl } from '@/lib/apiConfig';

interface DailyStaffHiringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StaffRowItem {
  id: string;
  serviceCategory: string;
  staffCategory: string;
  noOfStaff: number;
  noOfDays: number;
  startDate: string;
  startTime: string;
  endTime: string;
  ratePerDay: number;
}

const dailyRatesMap: { [key: string]: number } = {
  'Chef': 1499,
  'Head Chef': 2500,
  'Helper': 999,
  'Waiter': 999,
  'Captain': 999,
  'Housekeeping': 799,
  'Restaurant Manager': 1999,
  'F&B Manager': 2499,
  'Home Cook': 999,
  'Bartender': 1299,
  'Dishwasher': 799
};

const serviceCategoryOptions = [
  'Kitchen Staff',
  'Service Staff',
  'Housekeeping Staff',
  'Management Staff',
  'Utility Staff'
];

const staffCategoryByService: { [key: string]: string[] } = {
  'Kitchen Staff': ['Chef', 'Head Chef', 'Helper', 'Home Cook'],
  'Service Staff': ['Waiter', 'Captain', 'Bartender'],
  'Housekeeping Staff': ['Housekeeping', 'Dishwasher'],
  'Management Staff': ['Restaurant Manager', 'F&B Manager'],
  'Utility Staff': ['Helper', 'Dishwasher']
};

export default function DailyStaffHiringModal({ isOpen, onClose }: DailyStaffHiringModalProps) {
  const [step, setStep] = useState<number>(1);

  // Step 1: Basic Details
  const [bookingType, setBookingType] = useState<'Commercial' | 'Domestic'>('Commercial');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [outletName, setOutletName] = useState('');
  const [address, setAddress] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Step 2: Staff Requirement
  const todayStr = new Date().toISOString().split('T')[0];
  const [staffRows, setStaffRows] = useState<StaffRowItem[]>([
    {
      id: '1',
      serviceCategory: 'Service Staff',
      staffCategory: 'Waiter',
      noOfStaff: 1,
      noOfDays: 1,
      startDate: todayStr,
      startTime: '10:00',
      endTime: '20:00',
      ratePerDay: 999
    }
  ]);

  const [agreeTerms, setAgreeTerms] = useState(true);

  // Submission & Result
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
      } catch (e) {}
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

  // Staff row helper
  const handleAddStaffRow = () => {
    setStaffRows(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        serviceCategory: 'Service Staff',
        staffCategory: 'Waiter',
        noOfStaff: 1,
        noOfDays: 1,
        startDate: todayStr,
        startTime: '10:00',
        endTime: '20:00',
        ratePerDay: 999
      }
    ]);
  };

  const handleRemoveStaffRow = (id: string) => {
    if (staffRows.length === 1) return;
    setStaffRows(prev => prev.filter(r => r.id !== id));
  };

  const handleStaffChange = (id: string, field: keyof StaffRowItem, value: any) => {
    setStaffRows(prev => prev.map(row => {
      if (row.id === id) {
        if (field === 'serviceCategory') {
          const availableRoles = staffCategoryByService[value] || ['Waiter'];
          const newRole = availableRoles[0];
          const newRate = dailyRatesMap[newRole] || 999;
          return { ...row, serviceCategory: value, staffCategory: newRole, ratePerDay: newRate };
        }
        if (field === 'staffCategory') {
          const newRate = dailyRatesMap[value] || 999;
          return { ...row, staffCategory: value, ratePerDay: newRate };
        }
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  // Calculations
  const staffCharges = staffRows.reduce((sum, item) => {
    return sum + (Number(item.ratePerDay || 0) * Number(item.noOfStaff || 1) * Number(item.noOfDays || 1));
  }, 0);
  const gstAmount = Math.round(staffCharges * 0.18);
  const platformFee = Math.round(staffCharges * 0.10);
  const totalBookingAmount = staffCharges + gstAmount + platformFee;
  const advanceAmount = Math.round(totalBookingAmount * 0.25);

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
    if (bookingType === 'Commercial' && !outletName.trim()) {
      Swal.fire({ icon: 'warning', title: 'Outlet Name Required', text: 'Please enter your Restaurant / Hotel / Cafe name.', confirmButtonColor: '#d62423' });
      return;
    }
    if (!address.trim()) {
      Swal.fire({ icon: 'warning', title: 'Address Required', text: 'Please enter complete address.', confirmButtonColor: '#d62423' });
      return;
    }
    setStep(2);
  };

  // Step 2 Validation
  const handleProceedToStep3 = () => {
    if (staffRows.length === 0) {
      Swal.fire({ icon: 'warning', title: 'Staff Required', text: 'Please add at least 1 staff requirement.', confirmButtonColor: '#d62423' });
      return;
    }
    if (!agreeTerms) {
      Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the booking terms.', confirmButtonColor: '#d62423' });
      return;
    }
    setStep(3);
  };

  // Step 4 Final Submit & Cashfree Live Payment
  const handleConfirmAndPay = async () => {
    setIsSubmitting(true);
    try {
      const summaryText = staffRows.map(r => 
        `${r.staffCategory} (${r.noOfStaff} staff) for ${r.noOfDays} day(s) from ${r.startDate} (${r.startTime} - ${r.endTime})`
      ).join('; ');

      const payload = {
        jobCategory: 'daily',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        address: address.trim(),
        outletName: bookingType === 'Commercial' ? outletName.trim() : `${name.trim()}'s Home`,
        bookingType,
        message: `Daily Staff Booking [${bookingType}]: ${summaryText}`,
        staffList: staffRows.map(s => ({
          category: s.staffCategory,
          serviceCategory: s.serviceCategory,
          salary: s.ratePerDay,
          salaryRange: `₹${s.ratePerDay}/day`,
          count: Number(s.noOfStaff),
          noOfDays: Number(s.noOfDays),
          startDate: s.startDate,
          timing: `${s.startTime} – ${s.endTime}`
        })),
        pricing: {
          staffCharges,
          gst: gstAmount,
          platformFee,
          total: totalBookingAmount,
          advance: advanceAmount
        }
      };

      let generatedRef = `ZOMO-DAY-${Math.floor(100000 + Math.random() * 900000)}`;

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

      // Save lead record
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim().replace(/\D/g, ''),
            subject: `Daily Basis Staff Booking (${bookingType})`,
            message: `Outlet: ${bookingType === 'Commercial' ? outletName : 'Home'}, Address: ${address}, Total: ₹${totalBookingAmount}, 25% Advance: ₹${advanceAmount}, Details: ${summaryText}`
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
              text: `Payment was not completed. Please complete ₹${advanceAmount} advance to confirm.`,
              confirmButtonColor: '#d62423'
            });
          } else {
            setBookingRef(generatedRef);
            setBookingSuccess(true);
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful & Booking Confirmed!',
              text: `Your daily staff booking #${generatedRef} has been confirmed. Our team will coordinate dispatch.`,
              confirmButtonColor: '#d62423'
            });
          }
        });
      } else {
        setBookingRef(generatedRef);
        setBookingSuccess(true);
        Swal.fire({
          icon: 'success',
          title: 'Booking Placed!',
          text: `Your daily staff booking #${generatedRef} has been placed. Our team will contact you shortly.`,
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
            Book professional staff on a daily basis
          </p>
        </div>

        {/* Stepper Bar */}
        {!bookingSuccess && (
          <div className="px-5 py-3.5 sm:py-4 bg-slate-50/80 border-b border-slate-100 flex-shrink-0 select-none">
            <div className="flex items-center justify-between max-w-2xl mx-auto px-1 sm:px-2">
              {[
                { num: 1, label: 'Basic Details' },
                { num: 2, label: 'Staff Requirement' },
                { num: 3, label: 'Booking Summary' },
                { num: 4, label: 'Payment' }
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

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 text-slate-800">

          {/* ================= STEP 1: Basic Details ================= */}
          {step === 1 && !bookingSuccess && (
            <div className="space-y-3 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Basic Details
                </h2>
                <p className="text-[12px] text-slate-500">
                  Tell us where you need staff and we'll arrange the right professionals.
                </p>
              </div>

              {/* Booking For Commercial / Domestic */}
              <div>
                <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                  Booking For <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div 
                    onClick={() => setBookingType('Commercial')}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      bookingType === 'Commercial'
                        ? 'border-[#024a9d] bg-blue-50/40 shadow-sm ring-1 ring-[#024a9d]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <h4 className="text-[13px] font-extrabold text-[#0f2441]">Commercial</h4>
                    <p className="text-[11px] text-slate-500">Restaurant / Hotel / Cafe</p>
                  </div>
                  <div 
                    onClick={() => setBookingType('Domestic')}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      bookingType === 'Domestic'
                        ? 'border-[#024a9d] bg-blue-50/40 shadow-sm ring-1 ring-[#024a9d]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <h4 className="text-[13px] font-extrabold text-[#0f2441]">Domestic</h4>
                    <p className="text-[11px] text-slate-500">Home / Family requirement</p>
                  </div>
                </div>
              </div>

              {/* Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[13px] font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11.5px] font-bold text-slate-700">
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
                      className={`flex-1 px-3 py-1.5 rounded-xl border ${
                        isPhoneVerified ? 'bg-slate-50 text-slate-600 border-green-300' : 'border-slate-200'
                      } focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[13px] font-medium`}
                    />
                    {!isPhoneVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || phone.length < 10 || timer > 0}
                        className="px-3 py-1.5 bg-[#024a9d] hover:bg-[#013575] disabled:bg-slate-300 text-white font-bold text-[12px] rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 shadow-sm"
                      >
                        {isSendingOtp ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
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
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 animate-in fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11.5px] font-bold text-[#024a9d]">
                      Enter 6-Digit OTP:
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
                      placeholder="6-digit OTP"
                      className="flex-1 px-3 py-1 rounded-lg bg-white border border-blue-200 focus:border-[#024a9d] outline-none text-center font-bold tracking-widest text-[14px]"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingOtp || otpValue.length < 4}
                      className="px-3.5 py-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold text-[12px] rounded-lg transition-colors flex items-center gap-1"
                    >
                      {isVerifyingOtp ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Verify'}
                    </button>
                  </div>
                </div>
              )}

              {/* Outlet Name (if Commercial) */}
              {bookingType === 'Commercial' && (
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                    Outlet Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    value={outletName}
                    onChange={(e) => setOutletName(e.target.value)}
                    placeholder="Restaurant / Hotel / Cafe name"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[13px] font-medium"
                  />
                </div>
              )}

              {/* Address */}
              <div>
                <label className="block text-[11.5px] font-bold text-slate-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter complete address"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 focus:border-[#024a9d] focus:ring-2 focus:ring-blue-100 outline-none text-[13px] font-medium resize-none"
                />
              </div>

              {/* Next Button */}
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2 rounded-xl font-bold text-[13px] shadow-[0_4px_12px_rgba(214,36,35,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: Staff Requirement ================= */}
          {step === 2 && !bookingSuccess && (
            <div className="space-y-2.5 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Staff Requirement Details
                </h2>
                <p className="text-[12px] text-slate-500">
                  Select staff, number of staff, date, timing and number of days required.
                </p>
              </div>

              {/* Dynamic Staff Rows */}
              <div className="space-y-2.5">
                {staffRows.map((row, index) => {
                  const availableRoles = staffCategoryByService[row.serviceCategory] || ['Waiter'];
                  return (
                    <div 
                      key={row.id}
                      className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 relative space-y-2"
                    >
                      {staffRows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStaffRow(row.id)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Staff"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Top Grid: Service Category, Staff Category, No of Staff, No of Days */}
                      <div className="grid grid-cols-2 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                            Service Category <span className="text-red-500">*</span>
                          </label>
                          <select 
                            value={row.serviceCategory}
                            onChange={(e) => handleStaffChange(row.id, 'serviceCategory', e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 focus:border-[#024a9d] outline-none cursor-pointer"
                          >
                            {serviceCategoryOptions.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                            Staff Category <span className="text-red-500">*</span>
                          </label>
                          <select 
                            value={row.staffCategory}
                            onChange={(e) => handleStaffChange(row.id, 'staffCategory', e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 focus:border-[#024a9d] outline-none cursor-pointer"
                          >
                            {availableRoles.map(role => (
                              <option key={role} value={role}>
                                {role} — ₹{dailyRatesMap[role] || 999}/day
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                            No. of Staff <span className="text-red-500">*</span>
                          </label>
                          <select 
                            value={row.noOfStaff}
                            onChange={(e) => handleStaffChange(row.id, 'noOfStaff', Number(e.target.value))}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 focus:border-[#024a9d] outline-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                            No. of Days <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="number"
                            min={1}
                            max={30}
                            value={row.noOfDays}
                            onChange={(e) => handleStaffChange(row.id, 'noOfDays', Math.max(1, Number(e.target.value)))}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 focus:border-[#024a9d] outline-none"
                          />
                        </div>
                      </div>

                      {/* Bottom Grid: Start Date, Start Time, End Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200/60">
                        <div>
                          <label className="block text-[10.5px] font-bold text-slate-600 mb-0.5">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="date"
                            value={row.startDate}
                            onChange={(e) => handleStaffChange(row.id, 'startDate', e.target.value)}
                            className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-[12px] font-medium text-slate-800 focus:border-[#024a9d] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10.5px] font-bold text-slate-600 mb-0.5">
                            Start Time <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="time"
                            value={row.startTime}
                            onChange={(e) => handleStaffChange(row.id, 'startTime', e.target.value)}
                            className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-[12px] font-medium text-slate-800 focus:border-[#024a9d] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10.5px] font-bold text-slate-600 mb-0.5">
                            End Time <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="time"
                            value={row.endTime}
                            onChange={(e) => handleStaffChange(row.id, 'endTime', e.target.value)}
                            className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-[12px] font-medium text-slate-800 focus:border-[#024a9d] outline-none"
                          />
                        </div>
                      </div>

                      {/* Row Subtotal */}
                      <div className="flex justify-between items-center text-[11.5px] pt-1">
                        <span className="text-[#024a9d] font-bold">
                          Daily Rate: ₹{row.ratePerDay}/day
                        </span>
                        <span className="font-extrabold text-slate-800">
                          Subtotal: ₹{row.ratePerDay * row.noOfStaff * row.noOfDays}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add More Staff Button */}
              <div>
                <button
                  type="button"
                  onClick={handleAddStaffRow}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 text-[#024a9d] hover:bg-blue-50 text-[12px] font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add More Staff</span>
                </button>
              </div>

              {/* Daily Staff Rates Info Banner */}
              <div className="p-2 rounded-xl bg-blue-50/50 border border-blue-100 text-[11px] text-slate-600 leading-snug">
                <span className="font-bold text-[#024a9d]">Daily Staff Rates: </span>
                Chef ₹1,499/day | Head Chef ₹2,500/day | Helper ₹999/day | Waiter ₹999/day | Captain ₹999/day | Housekeeping ₹799/day | Restaurant Manager ₹1,999/day | F&B Manager ₹2,499/day | Home Cook ₹999/day
              </div>

              {/* Agreement Checkbox */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#024a9d] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-700 leading-tight">
                    <strong className="font-bold text-[#0f2441]">Important Note:</strong> I agree to the applicable booking terms and confirm that the staff requirement, dates and schedule entered above are correct.
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-[12.5px] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2 rounded-xl font-bold text-[13px] shadow-[0_4px_12px_rgba(214,36,35,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: Booking Summary ================= */}
          {step === 3 && !bookingSuccess && (
            <div className="space-y-2.5 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Booking Summary
                </h2>
                <p className="text-[12px] text-slate-500">
                  Review your requirement and booking amount before payment.
                </p>
              </div>

              {/* Customer Details */}
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <h3 className="text-[12.5px] font-extrabold text-[#0f2441] mb-1.5 border-b border-slate-100 pb-1">
                  Customer Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11.5px]">
                  <div>
                    <span className="text-slate-400">Name:</span>
                    <p className="font-bold text-slate-800">{name}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Mobile:</span>
                    <p className="font-bold text-slate-800">{phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Booking Type:</span>
                    <p className="font-bold text-slate-800">{bookingType}</p>
                  </div>
                  {bookingType === 'Commercial' && (
                    <div>
                      <span className="text-slate-400">Outlet:</span>
                      <p className="font-bold text-slate-800 truncate">{outletName}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="text-slate-400">Address:</span>
                    <p className="font-bold text-slate-800 truncate">{address}</p>
                  </div>
                </div>
              </div>

              {/* Staff Requirement Table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 font-extrabold text-[12.5px] text-[#0f2441]">
                  Staff Requirement
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11.5px]">
                    <thead className="bg-slate-100/70 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-1.5">Staff</th>
                        <th className="px-2 py-1.5">Rate / Day</th>
                        <th className="px-2 py-1.5">No.</th>
                        <th className="px-2 py-1.5">Start Date</th>
                        <th className="px-2 py-1.5">Timing</th>
                        <th className="px-2 py-1.5">Days</th>
                        <th className="px-3 py-1.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {staffRows.map(r => (
                        <tr key={r.id}>
                          <td className="px-3 py-1.5 font-bold text-[#0f2441]">{r.staffCategory}</td>
                          <td className="px-2 py-1.5">₹{r.ratePerDay}</td>
                          <td className="px-2 py-1.5 font-bold">{r.noOfStaff}</td>
                          <td className="px-2 py-1.5 whitespace-nowrap">{r.startDate}</td>
                          <td className="px-2 py-1.5 whitespace-nowrap">{r.startTime} – {r.endTime}</td>
                          <td className="px-2 py-1.5 font-bold">{r.noOfDays}</td>
                          <td className="px-3 py-1.5 font-extrabold text-slate-900 text-right">
                            ₹{(r.ratePerDay * r.noOfStaff * r.noOfDays).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pricing Breakdown Summary */}
              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-[12px]">
                <div className="flex justify-between text-slate-600">
                  <span>Staff Charges</span>
                  <span className="font-bold text-slate-800">₹{staffCharges.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%)</span>
                  <span className="font-bold text-slate-800">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Fee (10%)</span>
                  <span className="font-bold text-slate-800">₹{platformFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-extrabold text-[#0f2441] pt-1 border-t border-slate-200 text-[13px]">
                  <span>Total Booking Amount</span>
                  <span>₹{totalBookingAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-black text-[#d62423] text-[13.5px] pt-0.5">
                  <span>25% Advance to Confirm</span>
                  <span>₹{advanceAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-[12.5px] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2 rounded-xl font-bold text-[13px] shadow-[0_4px_12px_rgba(214,36,35,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: Payment ================= */}
          {step === 4 && !bookingSuccess && (
            <div className="space-y-3 animate-in fade-in">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#0f2441] tracking-tight">
                  Confirm Your Booking
                </h2>
                <p className="text-[12px] text-slate-500">
                  Pay 25% advance to confirm your daily staff booking.
                </p>
              </div>

              {/* 25% Advance Card */}
              <div className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 text-center">
                <p className="text-[11.5px] font-bold text-[#d62423] tracking-wide uppercase">
                  25% Booking Advance
                </p>
                <div className="text-[34px] font-black text-[#d62423] tracking-tight my-0.5">
                  ₹{advanceAmount.toLocaleString('en-IN')}
                </div>
                <p className="text-[11.5px] text-slate-500 max-w-md mx-auto">
                  Your booking will be confirmed after successful payment.
                </p>
              </div>

              {/* Checkmarks Box */}
              <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>Requirement verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>Staff booking processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>Booking confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#024a9d] font-bold" />
                    <span>ZomoCook support</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-[12.5px] transition-colors"
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
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Confirm & Pay ₹{advanceAmount.toLocaleString('en-IN')}</span>
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
                Thank you! Your daily staff booking advance of ₹{advanceAmount.toLocaleString('en-IN')} has been received. Our team will coordinate dispatch immediately.
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
