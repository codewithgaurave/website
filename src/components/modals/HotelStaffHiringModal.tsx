"use client";
import React, { useState, useEffect } from 'react';
import { 
  X, Check, Plus, Trash2, ArrowRight, ArrowLeft, 
  ShieldCheck, CheckCircle2, Store, Home, Calendar, 
  ChefHat, Phone, User, MapPin, Clock, AlertCircle, 
  Loader2, IndianRupee, Sparkles, PartyPopper, Utensils
} from 'lucide-react';
import Swal from 'sweetalert2';
import { getApiBaseUrl } from '@/lib/apiConfig';

export type ServiceTabType = 'commercial' | 'homecook' | 'daily' | 'party';

interface HotelStaffHiringModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceTabType;
}

interface CommercialStaffItem {
  id: string;
  serviceCategory: string;
  staffCategory: string;
  salaryRange: string;
  noOfStaff: number;
}

interface DailyStaffItem {
  role: string;
  count: number;
  ratePerDay: number;
  startDate: string;
  startTime: string;
  endTime: string;
  days: number;
}

const commercialServiceCategories = [
  'Kitchen Staff',
  'Service Staff',
  'Housekeeping Staff',
  'Management Staff',
  'Utility / Other Staff'
];

const commercialStaffCategoriesMap: { [key: string]: string[] } = {
  'Kitchen Staff': [
    'Head Chef / Master Chef',
    'Executive Chef',
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
    'Kitchen Helper / Commis 3'
  ],
  'Service Staff': [
    'Captain / Supervisor',
    'Waiter / Steward',
    'Bartender / Barista',
    'Food Runner / Busser',
    'Host / Hostess'
  ],
  'Housekeeping Staff': [
    'Housekeeping Staff',
    'Room Boy / Attendant',
    'Cleaning Staff',
    'Laundry Staff'
  ],
  'Management Staff': [
    'Restaurant Manager',
    'General Manager',
    'Assistant Manager',
    'Floor Supervisor',
    'Cashier / Billing Staff'
  ],
  'Utility / Other Staff': [
    'Dishwasher / Utility Staff',
    'Kitchen Cleaner',
    'Store Helper / Loader',
    'Security Guard'
  ]
};

const salaryRanges = [
  '₹10,000 - ₹15,000',
  '₹15,000 - ₹20,000',
  '₹20,000 - ₹25,000',
  '₹25,000 - ₹35,000',
  '₹35,000 - ₹50,000',
  '₹50,000+'
];

// Homecook constants
const cookLevels = [
  { id: 'basic', name: 'Basic Cook', desc: 'Simple home-made food with good experience.', salary: '₹15,000 – ₹18,000/month', badge: '₹15K – ₹18K/mo' },
  { id: 'standard', name: 'Standard Cook', desc: 'Multi-cuisine cooking with highly experienced staff.', salary: '₹20,000 – ₹25,000/month', badge: '₹20K – ₹25K/mo' },
  { id: 'premium', name: 'Premium Chef', desc: 'Expert multi-cuisine private chef with high experience.', salary: '₹30,000+/month', badge: '₹30K+/mo' }
];

const foodPreferences = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain Food', 'Both Veg & Non-Veg'];
const genderPreferences = ['Male', 'Female', 'Anyone'];
const serviceDurations = ['10 Hours', '24 Hours (Live-in)'];
const familyMemberOptions = ['1-2 Members', '3-4 Members', '5-6 Members', '7+ Members'];

// Daily staff constants
const dailyRoles = [
  { role: 'Waiter', rate: 999 },
  { role: 'Captain / Supervisor', rate: 1499 },
  { role: 'Bartender', rate: 1799 },
  { role: 'Kitchen Helper', rate: 899 },
  { role: 'All-Rounder Cook', rate: 1999 },
  { role: 'Tandoor / Chinese Chef', rate: 2499 },
  { role: 'Head Chef', rate: 3499 }
];

// Party constants
const occasionTypes = [
  'Birthday Party',
  'Anniversary Party',
  'House Party / Gathering',
  'Kitty Party',
  'Family Get Together',
  'Wedding / Pre-Wedding',
  'Cocktail / Bachelor Party',
  'Corporate Event / Dinner'
];

const guestCounts = [
  '10 – 25 Guests',
  '25 – 50 Guests',
  '50 – 100 Guests',
  '100 – 200 Guests',
  '200+ Guests'
];

const cuisineOptions = [
  'North Indian & Mughlai',
  'Chinese & Pan-Asian',
  'South Indian Delicacies',
  'Tandoor & Starters',
  'Continental & Italian',
  'Chaat & Street Food',
  'Desserts & Bakery'
];

export default function HotelStaffHiringModal({ isOpen, onClose, initialService = 'commercial' }: HotelStaffHiringModalProps) {
  const [activeTab, setActiveTab] = useState<ServiceTabType>(initialService);
  const [step, setStep] = useState<number>(1);

  // Common User & Auth states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userToken, setUserToken] = useState<string | null>(null);

  // 1. Commercial State
  const [commercialBusinessName, setCommercialBusinessName] = useState('');
  const [commercialAddress, setCommercialAddress] = useState('');
  const [commercialStaffList, setCommercialStaffList] = useState<CommercialStaffItem[]>([
    {
      id: '1',
      serviceCategory: 'Kitchen Staff',
      staffCategory: 'Head Chef / Master Chef',
      salaryRange: '₹25,000 - ₹35,000',
      noOfStaff: 1
    }
  ]);
  const [commercialFacilities, setCommercialFacilities] = useState<{ [key: string]: boolean }>({
    food: false,
    accommodation: false,
    pf: false,
    esi: false,
    uniform: false
  });
  const [commercialAgreeTerms, setCommercialAgreeTerms] = useState(true);

  // 2. Homecook State
  const [homeAddress, setHomeAddress] = useState('');
  const [homeCookLevel, setHomeCookLevel] = useState('standard');
  const [homeFoodPref, setHomeFoodPref] = useState('Both Veg & Non-Veg');
  const [homeGenderPref, setHomeGenderPref] = useState('Anyone');
  const [homeDuration, setHomeDuration] = useState('10 Hours');
  const [homeFamilyMembers, setHomeFamilyMembers] = useState('3-4 Members');
  const [homeStartDate, setHomeStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [homeAgreeTerms, setHomeAgreeTerms] = useState(true);

  // 3. Daily Staff State
  const [dailyOutletName, setDailyOutletName] = useState('');
  const [dailyAddress, setDailyAddress] = useState('');
  const [dailyBookingType, setDailyBookingType] = useState('Commercial');
  const [dailyStaffRequirement, setDailyStaffRequirement] = useState<DailyStaffItem>({
    role: 'Waiter',
    count: 1,
    ratePerDay: 999,
    startDate: new Date().toISOString().split('T')[0],
    startTime: '19:00',
    endTime: '23:00',
    days: 1
  });
  const [dailyAgreeTerms, setDailyAgreeTerms] = useState(true);

  // 4. Party Chef State
  const [partyVenueAddress, setPartyVenueAddress] = useState('');
  const [partyOccasionType, setPartyOccasionType] = useState('Birthday Party');
  const [partyGuestCount, setPartyGuestCount] = useState('25 – 50 Guests');
  const [partyMealType, setPartyMealType] = useState('Dinner');
  const [partyCuisines, setPartyCuisines] = useState<string[]>(['North Indian & Mughlai', 'Tandoor & Starters']);
  const [partyDate, setPartyDate] = useState(new Date().toISOString().split('T')[0]);
  const [partyTime, setPartyTime] = useState('19:00');
  const [partyAgreeTerms, setPartyAgreeTerms] = useState(true);

  // Global Submission & Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const API_BASE = getApiBaseUrl();

  // Reset tab when initialService changes
  useEffect(() => {
    if (initialService) {
      setActiveTab(initialService);
      setStep(1);
      setBookingSuccess(false);
    }
  }, [initialService, isOpen]);

  // Timer countdown
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Check stored user
  useEffect(() => {
    if (isOpen) {
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
      } catch (e) {}
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
        text: 'Unable to connect to SMS server. Please try again later.',
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
          timer: 1600,
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

  // Step 1 Validation across tabs
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

    if (activeTab === 'commercial') {
      if (!commercialBusinessName.trim()) {
        Swal.fire({ icon: 'warning', title: 'Business Name Required', text: 'Please enter your restaurant / hotel / business name.', confirmButtonColor: '#d62423' });
        return;
      }
      if (!commercialAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Business Address Required', text: 'Please enter complete business address.', confirmButtonColor: '#d62423' });
        return;
      }
    } else if (activeTab === 'homecook') {
      if (!homeAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Home Address Required', text: 'Please enter your residential address.', confirmButtonColor: '#d62423' });
        return;
      }
    } else if (activeTab === 'daily') {
      if (!dailyOutletName.trim()) {
        Swal.fire({ icon: 'warning', title: 'Outlet / Event Name Required', text: 'Please enter your outlet or event name.', confirmButtonColor: '#d62423' });
        return;
      }
      if (!dailyAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Address Required', text: 'Please enter location / address.', confirmButtonColor: '#d62423' });
        return;
      }
    } else if (activeTab === 'party') {
      if (!partyVenueAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Event Venue Required', text: 'Please enter event address / venue location.', confirmButtonColor: '#d62423' });
        return;
      }
    }

    setStep(2);
  };

  // Step 2 Validation across tabs
  const handleProceedToStep3 = () => {
    if (activeTab === 'commercial') {
      if (commercialStaffList.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Staff Required', text: 'Please add at least 1 staff requirement.', confirmButtonColor: '#d62423' });
        return;
      }
      if (!commercialAgreeTerms) {
        Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the salary and terms.', confirmButtonColor: '#d62423' });
        return;
      }
    } else if (activeTab === 'homecook') {
      if (!homeAgreeTerms) {
        Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the terms & conditions.', confirmButtonColor: '#d62423' });
        return;
      }
    } else if (activeTab === 'daily') {
      if (!dailyAgreeTerms) {
        Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the booking terms.', confirmButtonColor: '#d62423' });
        return;
      }
    } else if (activeTab === 'party') {
      if (partyCuisines.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Cuisine Required', text: 'Please select at least 1 cuisine preference.', confirmButtonColor: '#d62423' });
        return;
      }
      if (!partyAgreeTerms) {
        Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the party chef terms.', confirmButtonColor: '#d62423' });
        return;
      }
    }

    setStep(3);
  };

  // Daily staff calculations
  const dailyStaffAmount = dailyStaffRequirement.ratePerDay * dailyStaffRequirement.count * dailyStaffRequirement.days;
  const dailyGst = Math.round(dailyStaffAmount * 0.18);
  const dailyPlatformFee = Math.round(dailyStaffAmount * 0.10);
  const dailyTotalAmount = dailyStaffAmount + dailyGst + dailyPlatformFee;
  const dailyAdvanceAmount = Math.round(dailyTotalAmount * 0.25);

  // Trigger Live Cashfree Checkout
  const handleFinalSubmitAndPay = async () => {
    setIsSubmitting(true);
    let amountToPay = 299;
    let sourceType = 'Commercial Staff Hiring (₹299 Processing Fee)';
    let summaryMessage = '';
    let payloadEndpoint = `${API_BASE}/api/jobs/web-commercial-booking`;
    let requestPayload: any = {};

    if (activeTab === 'commercial') {
      amountToPay = 299;
      sourceType = 'Commercial Staff Hiring (₹299 Processing Fee)';
      const selectedFacilities = Object.keys(commercialFacilities).filter(k => commercialFacilities[k]);
      summaryMessage = `Business: ${commercialBusinessName}, Address: ${commercialAddress}, Staff: ${commercialStaffList.map(s => `${s.staffCategory} (${s.noOfStaff})`).join(', ')}`;
      requestPayload = {
        jobCategory: 'hotel',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        address: commercialAddress.trim(),
        outletName: commercialBusinessName.trim(),
        facilities: selectedFacilities,
        staffList: commercialStaffList.map(s => ({
          category: s.staffCategory,
          serviceCategory: s.serviceCategory,
          salaryRange: s.salaryRange,
          count: Number(s.noOfStaff)
        })),
        pricing: { processingFee: 299, advance: 299 }
      };
    } else if (activeTab === 'homecook') {
      amountToPay = 299;
      sourceType = 'Domestic Home Cook Hiring (₹299 Processing Fee)';
      const selectedLevel = cookLevels.find(c => c.id === homeCookLevel);
      summaryMessage = `Address: ${homeAddress}, Level: ${selectedLevel?.name}, Food: ${homeFoodPref}, Duration: ${homeDuration}, Family: ${homeFamilyMembers}, Start: ${homeStartDate}`;
      requestPayload = {
        jobCategory: 'home',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        address: homeAddress.trim(),
        foodPreference: homeFoodPref,
        cookType: selectedLevel?.name,
        serviceDuration: homeDuration,
        familyMembers: homeFamilyMembers,
        startDate: homeStartDate,
        pricing: { processingFee: 299, advance: 299 }
      };
    } else if (activeTab === 'daily') {
      amountToPay = dailyAdvanceAmount;
      sourceType = 'Daily Basis Staff Hiring (25% Advance Booking)';
      summaryMessage = `Outlet: ${dailyOutletName}, Address: ${dailyAddress}, Role: ${dailyStaffRequirement.role} x ${dailyStaffRequirement.count}, Date: ${dailyStaffRequirement.startDate}, Timing: ${dailyStaffRequirement.startTime}-${dailyStaffRequirement.endTime}, Total: ₹${dailyTotalAmount}, Advance: ₹${dailyAdvanceAmount}`;
      requestPayload = {
        jobCategory: 'hotel',
        bookingType: 'daily',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        outletName: dailyOutletName.trim(),
        address: dailyAddress.trim(),
        dailyRequirement: dailyStaffRequirement,
        pricing: {
          staffCharges: dailyStaffAmount,
          gst: dailyGst,
          platformFee: dailyPlatformFee,
          totalAmount: dailyTotalAmount,
          advance: dailyAdvanceAmount
        }
      };
    } else if (activeTab === 'party') {
      amountToPay = 299;
      sourceType = 'Chef for Party / Occasion (₹299 Allocation Fee)';
      summaryMessage = `Venue: ${partyVenueAddress}, Occasion: ${partyOccasionType}, Guests: ${partyGuestCount}, Meal: ${partyMealType}, Cuisines: ${partyCuisines.join(', ')}, Date: ${partyDate} at ${partyTime}`;
      requestPayload = {
        jobCategory: 'home',
        bookingType: 'party',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        address: partyVenueAddress.trim(),
        partyRequirement: {
          occasion: partyOccasionType,
          guests: partyGuestCount,
          mealType: partyMealType,
          cuisines: partyCuisines,
          date: partyDate,
          time: partyTime
        },
        pricing: { processingFee: 299, advance: 299 }
      };
    }

    try {
      let generatedRef = `ZOMO-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Send to Backend Lead / Job API
      const res = await fetch(payloadEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userToken && { 'Authorization': `Bearer ${userToken}` })
        },
        body: JSON.stringify(requestPayload)
      });
      const data = await res.json();
      if (data.jobs && data.jobs[0]?.jobCode) {
        generatedRef = data.jobs[0].jobCode;
      }

      // Also record in Leads
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email: `${phone}@zomocook.in`,
            sourceType,
            message: summaryMessage
          })
        });
      } catch (err) {}

      // 2. Open Live Cashfree Checkout
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
              text: `Payment was not completed. Please pay ₹${amountToPay} to confirm your request.`,
              confirmButtonColor: '#d62423'
            });
          } else {
            setBookingRef(generatedRef);
            setBookingSuccess(true);
            Swal.fire({
              icon: 'success',
              title: 'Booking Confirmed!',
              text: `Your request #${generatedRef} has been confirmed. Our team is processing verified staff profiles for you.`,
              confirmButtonColor: '#d62423'
            });
          }
        });
      } else {
        // Fallback confirmation
        setBookingRef(generatedRef);
        setBookingSuccess(true);
        Swal.fire({
          icon: 'success',
          title: 'Request Submitted!',
          text: `Your requirement #${generatedRef} has been registered. Our representative will contact you right away.`,
          confirmButtonColor: '#d62423'
        });
      }

    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: err.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#d62423'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[94vh] flex flex-col font-sans">
        
        {/* Top Header */}
        <div className="relative px-6 pt-5 pb-3 border-b border-slate-100 text-center bg-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center mb-0.5">
            <span className="text-[22px] font-black text-[#0f2441] tracking-tight">Zomo</span>
            <span className="text-[22px] font-black text-[#d62423] tracking-tight">Cook</span>
          </div>
          <p className="text-[12px] font-semibold text-slate-400">
            Hire the right staff for your business
          </p>
        </div>

        {/* 4 Service Cards/Tabs at Top */}
        {!bookingSuccess && (
          <div className="px-5 sm:px-6 py-3 bg-slate-50/80 border-b border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Tab 1: Commercial */}
              <button
                type="button"
                onClick={() => { setActiveTab('commercial'); setStep(1); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-[12.5px] transition-all border ${
                  activeTab === 'commercial'
                    ? 'bg-[#0866e8] text-white border-[#0866e8] shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-white/80'
                }`}
              >
                <Store className={`w-4 h-4 shrink-0 ${activeTab === 'commercial' ? 'text-white' : 'text-[#0866e8]'}`} />
                <span className="truncate">Commercial Hiring</span>
              </button>

              {/* Tab 2: Domestic Home Cook */}
              <button
                type="button"
                onClick={() => { setActiveTab('homecook'); setStep(1); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-[12.5px] transition-all border ${
                  activeTab === 'homecook'
                    ? 'bg-[#0866e8] text-white border-[#0866e8] shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-white/80'
                }`}
              >
                <Home className={`w-4 h-4 shrink-0 ${activeTab === 'homecook' ? 'text-white' : 'text-[#ed1c24]'}`} />
                <span className="truncate">Domestic Home Cook</span>
              </button>

              {/* Tab 3: Daily Basis Staff */}
              <button
                type="button"
                onClick={() => { setActiveTab('daily'); setStep(1); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-[12.5px] transition-all border ${
                  activeTab === 'daily'
                    ? 'bg-[#0866e8] text-white border-[#0866e8] shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-white/80'
                }`}
              >
                <Calendar className={`w-4 h-4 shrink-0 ${activeTab === 'daily' ? 'text-white' : 'text-[#08b96d]'}`} />
                <span className="truncate">Daily Basis Staff</span>
              </button>

              {/* Tab 4: Chef for Party */}
              <button
                type="button"
                onClick={() => { setActiveTab('party'); setStep(1); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-[12.5px] transition-all border ${
                  activeTab === 'party'
                    ? 'bg-[#0866e8] text-white border-[#0866e8] shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-white/80'
                }`}
              >
                <ChefHat className={`w-4 h-4 shrink-0 ${activeTab === 'party' ? 'text-white' : 'text-[#7639e8]'}`} />
                <span className="truncate">Chef for Party</span>
              </button>
            </div>
          </div>
        )}

        {/* Stepper Progress Bar */}
        {!bookingSuccess && (
          <div className="px-6 py-3.5 bg-white border-b border-slate-100">
            <div className="flex items-center justify-between max-w-xl mx-auto relative">
              {/* Step 1 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > 1 ? 'bg-green-500 text-white' : step === 1 ? 'bg-[#0866e8] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 1 ? 'text-[#0866e8]' : 'text-slate-500'}`}>
                  Basic Details
                </span>
              </div>

              <div className={`flex-1 h-[2px] mx-2 transition-colors ${step > 1 ? 'bg-green-500' : 'bg-slate-200'}`} />

              {/* Step 2 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > 2 ? 'bg-green-500 text-white' : step === 2 ? 'bg-[#0866e8] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '2'}
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 2 ? 'text-[#0866e8]' : 'text-slate-500'}`}>
                  {activeTab === 'commercial' ? 'Staff Requirement' : activeTab === 'homecook' ? 'Cook Details' : activeTab === 'daily' ? 'Staff Requirement' : 'Party Details'}
                </span>
              </div>

              <div className={`flex-1 h-[2px] mx-2 transition-colors ${step > 2 ? 'bg-green-500' : 'bg-slate-200'}`} />

              {/* Step 3 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > 3 ? 'bg-green-500 text-white' : step === 3 ? 'bg-[#0866e8] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step > 3 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '3'}
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 3 ? 'text-[#0866e8]' : 'text-slate-500'}`}>
                  Booking Summary
                </span>
              </div>

              <div className={`flex-1 h-[2px] mx-2 transition-colors ${step > 3 ? 'bg-green-500' : 'bg-slate-200'}`} />

              {/* Step 4 */}
              <div className="flex items-center gap-2 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 4 ? 'bg-[#0866e8] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  4
                </div>
                <span className={`text-[12px] font-bold hidden sm:inline ${step === 4 ? 'text-[#0866e8]' : 'text-slate-500'}`}>
                  {activeTab === 'daily' ? 'Advance Payment' : 'Processing Fee'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-800">

          {/* ================= STEP 1: Basic Details (Dynamic by Tab) ================= */}
          {step === 1 && !bookingSuccess && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">
                  Basic Details
                </h2>
                <p className="text-[12.5px] text-slate-500 mt-0.5">
                  {activeTab === 'commercial' && 'Please enter your business details to get started.'}
                  {activeTab === 'homecook' && 'Please enter your contact & residential details.'}
                  {activeTab === 'daily' && 'Please enter your outlet / event location details.'}
                  {activeTab === 'party' && 'Please enter your party venue & contact details.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Your Name */}
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                  />
                </div>

                {/* Mobile Number with OTP */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[12.5px] font-bold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    {isPhoneVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                        <CheckCircle2 className="w-3 h-3" /> Verified
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
                      } focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all`}
                    />
                    {!isPhoneVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || phone.length < 10 || timer > 0}
                        className="px-4 py-2.5 bg-[#0866e8] hover:bg-[#0652ba] disabled:bg-slate-300 text-white font-bold text-[12.5px] rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        {isSendingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : timer > 0 ? `${timer}s` : 'Send OTP'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Inline OTP Box */}
              {otpSent && !isPhoneVerified && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-bold text-[#0866e8]">
                      Enter 6-Digit Verification Code:
                    </span>
                    {timer > 0 ? (
                      <span className="text-[11px] text-slate-500 font-medium">Resend in {timer}s</span>
                    ) : (
                      <button type="button" onClick={handleSendOtp} className="text-[11px] font-bold text-[#d62423] hover:underline">
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
                      placeholder="Enter OTP"
                      className="flex-1 px-3 py-2 rounded-lg bg-white border border-blue-200 focus:border-[#0866e8] outline-none text-center font-bold tracking-widest text-[15px]"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingOtp || otpValue.length < 4}
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold text-[12.5px] rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      {isVerifyingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab-Specific Form Fields */}
              {activeTab === 'commercial' && (
                <>
                  <div>
                    <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={commercialBusinessName}
                      onChange={(e) => setCommercialBusinessName(e.target.value)}
                      placeholder="Restaurant / Hotel / Cafe / Cloud Kitchen"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                      Business Address <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      rows={2}
                      value={commercialAddress}
                      onChange={(e) => setCommercialAddress(e.target.value)}
                      placeholder="Enter complete business address"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all resize-none"
                    />
                  </div>
                </>
              )}

              {activeTab === 'homecook' && (
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    rows={3}
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    placeholder="Enter complete residential address, flat/house number & landmark"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all resize-none"
                  />
                </div>
              )}

              {activeTab === 'daily' && (
                <>
                  <div>
                    <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                      Outlet / Event Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={dailyOutletName}
                      onChange={(e) => setDailyOutletName(e.target.value)}
                      placeholder="e.g. Royal Grand Hotel, Banquet Hall, Cafe, Private Event"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                      Address / Venue Location <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      rows={2}
                      value={dailyAddress}
                      onChange={(e) => setDailyAddress(e.target.value)}
                      placeholder="Enter complete venue or outlet address"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all resize-none"
                    />
                  </div>
                </>
              )}

              {activeTab === 'party' && (
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                    Party Venue / House Location <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    rows={3}
                    value={partyVenueAddress}
                    onChange={(e) => setPartyVenueAddress(e.target.value)}
                    placeholder="Enter full party location address, apartment name, floor & city"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866e8] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all resize-none"
                  />
                </div>
              )}

              {/* Next Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="inline-flex items-center gap-2 bg-[#d62423] hover:bg-[#b81d1c] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(214,36,35,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  <span>Proceed to Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: Requirement Selection ================= */}
          {step === 2 && !bookingSuccess && (
            <div className="space-y-4 animate-in fade-in">
              {/* TAB 1: Commercial Requirement */}
              {activeTab === 'commercial' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">Staff Requirement</h2>
                      <p className="text-[12.5px] text-slate-500">Select required positions for your hotel/restaurant.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCommercialStaffList(prev => [...prev, { id: Date.now().toString(), serviceCategory: 'Kitchen Staff', staffCategory: 'Sous Chef', salaryRange: '₹20,000 - ₹25,000', noOfStaff: 1 }])}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#0866e8] hover:bg-blue-100 font-bold text-[12px] rounded-lg border border-blue-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Staff
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[42vh] overflow-y-auto pr-1">
                    {commercialStaffList.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Service Category</label>
                          <select 
                            value={item.serviceCategory}
                            onChange={(e) => {
                              const newCat = e.target.value;
                              const defaultRole = commercialStaffCategoriesMap[newCat]?.[0] || 'Head Chef';
                              setCommercialStaffList(prev => prev.map(s => s.id === item.id ? { ...s, serviceCategory: newCat, staffCategory: defaultRole } : s));
                            }}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 outline-none"
                          >
                            {commercialServiceCategories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Staff Role</label>
                          <select 
                            value={item.staffCategory}
                            onChange={(e) => setCommercialStaffList(prev => prev.map(s => s.id === item.id ? { ...s, staffCategory: e.target.value } : s))}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 outline-none"
                          >
                            {(commercialStaffCategoriesMap[item.serviceCategory] || []).map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Salary Range</label>
                          <select 
                            value={item.salaryRange}
                            onChange={(e) => setCommercialStaffList(prev => prev.map(s => s.id === item.id ? { ...s, salaryRange: e.target.value } : s))}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-medium text-slate-800 outline-none"
                          >
                            {salaryRanges.map(sal => <option key={sal} value={sal}>{sal}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">No. of Staff</label>
                          <input 
                            type="number"
                            min={1}
                            max={50}
                            value={item.noOfStaff}
                            onChange={(e) => setCommercialStaffList(prev => prev.map(s => s.id === item.id ? { ...s, noOfStaff: Math.max(1, parseInt(e.target.value) || 1) } : s))}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[12.5px] font-bold text-slate-800 outline-none text-center"
                          />
                        </div>
                        <div className="sm:col-span-1 flex justify-center">
                          <button
                            type="button"
                            disabled={commercialStaffList.length === 1}
                            onClick={() => setCommercialStaffList(prev => prev.filter(s => s.id !== item.id))}
                            className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Facilities & Terms */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap gap-3 text-[12px] font-medium text-slate-700">
                    <span className="font-bold text-slate-900">Perks:</span>
                    {['food', 'accommodation', 'pf', 'esi', 'uniform'].map((fac) => (
                      <label key={fac} className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={commercialFacilities[fac]}
                          onChange={(e) => setCommercialFacilities(prev => ({ ...prev, [fac]: e.target.checked }))}
                          className="w-3.5 h-3.5 text-[#0866e8] rounded"
                        />
                        <span className="capitalize">{fac}</span>
                      </label>
                    ))}
                  </div>

                  <label className="flex items-start gap-2 text-[12px] text-slate-600 cursor-pointer pt-1">
                    <input 
                      type="checkbox"
                      checked={commercialAgreeTerms}
                      onChange={(e) => setCommercialAgreeTerms(e.target.checked)}
                      className="w-4 h-4 text-[#0866e8] rounded mt-0.5"
                    />
                    <span>I confirm standard hospitality work policies (weekly off & verified salary payout).</span>
                  </label>
                </>
              )}

              {/* TAB 2: Home Cook Requirement */}
              {activeTab === 'homecook' && (
                <div className="space-y-3.5">
                  <div>
                    <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">Home Cook Requirements</h2>
                    <p className="text-[12.5px] text-slate-500">Choose the type of cook and preferences for your household.</p>
                  </div>

                  {/* Cook Level Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {cookLevels.map(lvl => (
                      <div
                        key={lvl.id}
                        onClick={() => setHomeCookLevel(lvl.id)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          homeCookLevel === lvl.id
                            ? 'border-[#0866e8] bg-blue-50/40 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[13px] text-slate-900">{lvl.name}</span>
                          <span className="text-[10px] font-extrabold bg-[#0866e8]/10 text-[#0866e8] px-1.5 py-0.5 rounded">{lvl.badge}</span>
                        </div>
                        <p className="text-[11.5px] text-slate-500 line-clamp-2">{lvl.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Food Preference</label>
                      <select 
                        value={homeFoodPref}
                        onChange={(e) => setHomeFoodPref(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      >
                        {foodPreferences.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Service Timing</label>
                      <select 
                        value={homeDuration}
                        onChange={(e) => setHomeDuration(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      >
                        {serviceDurations.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Family Members</label>
                      <select 
                        value={homeFamilyMembers}
                        onChange={(e) => setHomeFamilyMembers(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      >
                        {familyMemberOptions.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Start Date</label>
                      <input 
                        type="date"
                        value={homeStartDate}
                        onChange={(e) => setHomeStartDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-[12px] text-slate-600 cursor-pointer pt-1">
                    <input 
                      type="checkbox"
                      checked={homeAgreeTerms}
                      onChange={(e) => setHomeAgreeTerms(e.target.checked)}
                      className="w-4 h-4 text-[#0866e8] rounded mt-0.5"
                    />
                    <span>I agree to ₹299 verification & matching fee with free candidate replacement support.</span>
                  </label>
                </div>
              )}

              {/* TAB 3: Daily Basis Requirement */}
              {activeTab === 'daily' && (
                <div className="space-y-3.5">
                  <div>
                    <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">Daily Staff Requirement</h2>
                    <p className="text-[12.5px] text-slate-500">Configure daily staff roles, hours and number of people.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Staff Role</label>
                      <select 
                        value={dailyStaffRequirement.role}
                        onChange={(e) => {
                          const selected = dailyRoles.find(r => r.role === e.target.value);
                          setDailyStaffRequirement(prev => ({
                            ...prev,
                            role: e.target.value,
                            ratePerDay: selected ? selected.rate : 999
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      >
                        {dailyRoles.map(r => <option key={r.role} value={r.role}>{r.role} (₹{r.rate}/day)</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Number of Staff</label>
                      <input 
                        type="number"
                        min={1}
                        max={30}
                        value={dailyStaffRequirement.count}
                        onChange={(e) => setDailyStaffRequirement(prev => ({ ...prev, count: Math.max(1, parseInt(e.target.value) || 1) }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-bold text-slate-800 outline-none text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Number of Days</label>
                      <input 
                        type="number"
                        min={1}
                        max={30}
                        value={dailyStaffRequirement.days}
                        onChange={(e) => setDailyStaffRequirement(prev => ({ ...prev, days: Math.max(1, parseInt(e.target.value) || 1) }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-bold text-slate-800 outline-none text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Event / Shift Date</label>
                      <input 
                        type="date"
                        value={dailyStaffRequirement.startDate}
                        onChange={(e) => setDailyStaffRequirement(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Start Time</label>
                      <input 
                        type="time"
                        value={dailyStaffRequirement.startTime}
                        onChange={(e) => setDailyStaffRequirement(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">End Time</label>
                      <input 
                        type="time"
                        value={dailyStaffRequirement.endTime}
                        onChange={(e) => setDailyStaffRequirement(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-[12px] text-slate-600 cursor-pointer pt-1">
                    <input 
                      type="checkbox"
                      checked={dailyAgreeTerms}
                      onChange={(e) => setDailyAgreeTerms(e.target.checked)}
                      className="w-4 h-4 text-[#0866e8] rounded mt-0.5"
                    />
                    <span>I understand that 25% advance confirms the booking and balance is payable upon staff arrival.</span>
                  </label>
                </div>
              )}

              {/* TAB 4: Chef for Party Requirement */}
              {activeTab === 'party' && (
                <div className="space-y-3.5">
                  <div>
                    <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">Party & Event Chef Details</h2>
                    <p className="text-[12.5px] text-slate-500">Select occasion type, guest estimate and cuisine preferences.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Occasion Type</label>
                      <select 
                        value={partyOccasionType}
                        onChange={(e) => setPartyOccasionType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      >
                        {occasionTypes.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Estimated Guests</label>
                      <select 
                        value={partyGuestCount}
                        onChange={(e) => setPartyGuestCount(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      >
                        {guestCounts.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Meal Service</label>
                      <select 
                        value={partyMealType}
                        onChange={(e) => setPartyMealType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      >
                        <option value="Dinner">Dinner</option>
                        <option value="Lunch">Lunch</option>
                        <option value="High Tea & Snacks">High Tea & Snacks</option>
                        <option value="Full Day (Lunch + Dinner)">Full Day (Lunch + Dinner)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Party Date</label>
                      <input 
                        type="date"
                        value={partyDate}
                        onChange={(e) => setPartyDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1">Serving Time</label>
                      <input 
                        type="time"
                        value={partyTime}
                        onChange={(e) => setPartyTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  {/* Cuisines Checkboxes */}
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Select Cuisines (Select all that apply)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {cuisineOptions.map(c => {
                        const isSelected = partyCuisines.includes(c);
                        return (
                          <div
                            key={c}
                            onClick={() => {
                              if (isSelected) {
                                setPartyCuisines(prev => prev.filter(item => item !== c));
                              } else {
                                setPartyCuisines(prev => [...prev, c]);
                              }
                            }}
                            className={`px-2.5 py-1.5 rounded-lg border text-[11.5px] font-semibold cursor-pointer text-center transition-all ${
                              isSelected ? 'bg-purple-50 text-[#7639e8] border-[#7639e8]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {c}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-[12px] text-slate-600 cursor-pointer pt-1">
                    <input 
                      type="checkbox"
                      checked={partyAgreeTerms}
                      onChange={(e) => setPartyAgreeTerms(e.target.checked)}
                      className="w-4 h-4 text-[#0866e8] rounded mt-0.5"
                    />
                    <span>I confirm booking of dedicated Master Chef for my occasion with complete ingredient guidance.</span>
                  </label>
                </div>
              )}

              {/* Back & Next Navigation */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(214,36,35,0.3)] transition-all"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: Booking Summary ================= */}
          {step === 3 && !bookingSuccess && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">Booking Summary</h2>
                <p className="text-[12.5px] text-slate-500">Review your requirement and amount before payment.</p>
              </div>

              {/* Customer Details Box */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[12.5px] space-y-1">
                <div className="font-bold text-slate-900 mb-1">Customer & Location Details</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-600">
                  <div><strong className="text-slate-800">Name:</strong> {name}</div>
                  <div><strong className="text-slate-800">Mobile:</strong> +91 {phone}</div>
                  {activeTab === 'commercial' && <div><strong className="text-slate-800">Business:</strong> {commercialBusinessName}</div>}
                  {activeTab === 'daily' && <div><strong className="text-slate-800">Outlet/Event:</strong> {dailyOutletName}</div>}
                  <div className="sm:col-span-2">
                    <strong className="text-slate-800">Address:</strong>{' '}
                    {activeTab === 'commercial' ? commercialAddress : activeTab === 'homecook' ? homeAddress : activeTab === 'daily' ? dailyAddress : partyVenueAddress}
                  </div>
                </div>
              </div>

              {/* Requirement Summary Box */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-[12.5px]">
                <div className="font-bold text-slate-900 mb-2">Requirement Summary</div>

                {activeTab === 'commercial' && (
                  <div className="space-y-1.5">
                    {commercialStaffList.map((s, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-none">
                        <span className="font-semibold text-slate-800">{s.staffCategory} ({s.serviceCategory})</span>
                        <span className="font-bold text-slate-900">Qty: {s.noOfStaff} • {s.salaryRange}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'homecook' && (
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div><strong className="text-slate-800">Cook Level:</strong> {cookLevels.find(c => c.id === homeCookLevel)?.name}</div>
                    <div><strong className="text-slate-800">Preference:</strong> {homeFoodPref}</div>
                    <div><strong className="text-slate-800">Timing:</strong> {homeDuration}</div>
                    <div><strong className="text-slate-800">Start Date:</strong> {homeStartDate}</div>
                  </div>
                )}

                {activeTab === 'daily' && (
                  <div className="space-y-2">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[12px]">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 font-bold">
                            <th className="pb-1">Role</th>
                            <th className="pb-1">Rate/Day</th>
                            <th className="pb-1">Count</th>
                            <th className="pb-1">Days</th>
                            <th className="pb-1 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-1 font-bold text-slate-800">{dailyStaffRequirement.role}</td>
                            <td className="py-1">₹{dailyStaffRequirement.ratePerDay}</td>
                            <td className="py-1">{dailyStaffRequirement.count}</td>
                            <td className="py-1">{dailyStaffRequirement.days}</td>
                            <td className="py-1 text-right font-bold text-slate-900">₹{dailyStaffAmount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'party' && (
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div><strong className="text-slate-800">Occasion:</strong> {partyOccasionType}</div>
                    <div><strong className="text-slate-800">Guests:</strong> {partyGuestCount}</div>
                    <div><strong className="text-slate-800">Meal:</strong> {partyMealType}</div>
                    <div><strong className="text-slate-800">Date & Time:</strong> {partyDate} at {partyTime}</div>
                    <div className="col-span-2"><strong className="text-slate-800">Cuisines:</strong> {partyCuisines.join(', ')}</div>
                  </div>
                )}
              </div>

              {/* Price Breakdown Box */}
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-[13px] space-y-1.5">
                {activeTab === 'daily' ? (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Staff Charges</span>
                      <span>₹{dailyStaffAmount}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST (18%)</span>
                      <span>₹{dailyGst}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Platform Fee (10%)</span>
                      <span>₹{dailyPlatformFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-blue-200">
                      <span>Total Amount</span>
                      <span>₹{dailyTotalAmount}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-[#0866e8] text-[15px] pt-0.5">
                      <span>25% Advance Payable</span>
                      <span>₹{dailyAdvanceAmount}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Staff Requirement Verification & Matching Fee</span>
                      <span>₹299</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-[#0866e8] text-[15px] pt-1 border-t border-blue-200">
                      <span>Payable Now</span>
                      <span>₹299</span>
                    </div>
                  </>
                )}
              </div>

              {/* Back & Pay Navigation */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-1.5 bg-[#d62423] hover:bg-[#b81d1c] text-white px-6 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(214,36,35,0.3)] transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: Payment Confirmation ================= */}
          {step === 4 && !bookingSuccess && (
            <div className="space-y-4 animate-in fade-in text-center max-w-md mx-auto py-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0866e8] flex items-center justify-center mx-auto shadow-sm">
                <IndianRupee className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-[20px] font-black text-[#0f2441] tracking-tight">Confirm Your Booking</h2>
                <p className="text-[12.5px] text-slate-500 mt-1">
                  {activeTab === 'daily'
                    ? `Pay ₹${dailyAdvanceAmount} (25% advance) to secure your daily staff requirement.`
                    : 'Pay ₹299 processing fee to confirm your requirement.'}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/40 rounded-2xl border border-blue-100 text-center">
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block">
                  {activeTab === 'daily' ? '25% Booking Advance' : 'Processing Fee'}
                </span>
                <span className="text-[32px] font-black text-[#0866e8] tracking-tight block">
                  ₹{activeTab === 'daily' ? dailyAdvanceAmount : '299'}
                </span>
                <span className="text-[11.5px] text-slate-500 block mt-1">
                  Your booking will be processed immediately upon payment.
                </span>
              </div>

              <div className="text-left bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5 text-[12px] font-semibold text-slate-600">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Instant requirement verification & candidate mapping</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Free replacement support within contract validity</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Dedicated ZomoCook support manager</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={handleFinalSubmitAndPay}
                disabled={isSubmitting}
                className="w-full bg-[#d62423] hover:bg-[#b81d1c] disabled:bg-slate-300 text-white py-3 rounded-xl font-extrabold text-[15px] shadow-[0_6px_20px_rgba(214,36,35,0.35)] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{activeTab === 'daily' ? dailyAdvanceAmount : '299'} & Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-[12.5px] font-bold text-slate-500 hover:text-slate-800"
              >
                ← Back to Summary
              </button>
            </div>
          )}

          {/* ================= SUCCESS SCREEN ================= */}
          {bookingSuccess && (
            <div className="py-8 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h2 className="text-[22px] font-black text-slate-900">Booking Confirmed Successfully!</h2>
                <p className="text-[13.5px] text-slate-600 mt-1 max-w-md mx-auto">
                  Your requirement has been received with Reference ID: <strong className="text-[#0866e8]">{bookingRef}</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-[13px] space-y-1.5 text-slate-600">
                <div><strong className="text-slate-800">Customer:</strong> {name} (+91 {phone})</div>
                <div><strong className="text-slate-800">Service:</strong> {activeTab === 'commercial' ? 'Commercial Staff Hiring' : activeTab === 'homecook' ? 'Domestic Home Cook' : activeTab === 'daily' ? 'Daily Basis Staff' : 'Chef for Party'}</div>
                <div><strong className="text-slate-800">Status:</strong> <span className="text-green-600 font-bold">Verified & Active</span></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(false);
                  onClose();
                }}
                className="bg-[#0866e8] hover:bg-[#0652ba] text-white px-8 py-2.5 rounded-xl font-bold text-[14px] shadow-md transition-all"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
