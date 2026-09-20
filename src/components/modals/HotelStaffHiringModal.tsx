"use client";
import React, { useState, useEffect } from 'react';
import { 
  X, Check, Plus, Trash2, ArrowRight, ArrowLeft, 
  CheckCircle2, Loader2, Calendar, Utensils
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

export interface PartyMealCategoryCount {
  starter: number;
  mainCourse: number;
  breads: number;
  rice: number;
  drinks: number;
  sides: number;
}

export interface PartyMealItem {
  name: string; // 'Breakfast' | 'Lunch' | 'Dinner'
  guests: number;
  menuMode: 'now' | 'later' | null;
  menu: string[];
  categories: PartyMealCategoryCount;
}

export interface PartyDateEvent {
  date: string;
  eventType: string;
  meals: PartyMealItem[];
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

// Party constants & Catalog matching reference HTML
const occasionTypes = [
  'Birthday Party',
  'Anniversary',
  'Wedding',
  'Engagement',
  'Corporate Event',
  'House Party',
  'Festival',
  'Other'
];

const GUEST_RATE = 55;

const CATEGORY_RATES: { [key: string]: number } = {
  starter: 250,
  mainCourse: 250,
  breads: 150,
  rice: 200,
  drinks: 100,
  sides: 100
};

const PLATFORM_FEE_PERCENT = 10;
const GST_PERCENT = 18;
const COUPON_PERCENT = 20;

export interface MenuItemCatalog {
  name: string;
  category: string;
  image: string;
}

const menuCatalog: MenuItemCatalog[] = [
  {
    name: "Poha",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200"
  },
  {
    name: "Sandwich",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200"
  },
  {
    name: "Aloo Paratha",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200"
  },
  {
    name: "Roti",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=200"
  },
  {
    name: "Dal",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200"
  },
  {
    name: "Rice",
    category: "Rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200"
  },
  {
    name: "Sabji",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=200"
  },
  {
    name: "Egg Curry",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=200"
  },
  {
    name: "Chicken Curry",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200"
  },
  {
    name: "Paneer Butter Masala",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200"
  },
  {
    name: "Dal Makhani",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200"
  },
  {
    name: "Jeera Rice",
    category: "Rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200"
  },
  {
    name: "Naan",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200"
  },
  {
    name: "Tea / Coffee",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=200"
  },
  {
    name: "Fruit Salad",
    category: "Sides",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=200"
  },
  {
    name: "Gulab Jamun",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1601303516534-4d1b5d9f2c15?w=200"
  }
];

export default function HotelStaffHiringModal({ isOpen, onClose, initialService = 'commercial' }: HotelStaffHiringModalProps) {
  const [activeTab, setActiveTab] = useState<ServiceTabType>(initialService);
  const [step, setStep] = useState<number>(1);

  // Common User & Auth states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lucknow');
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
  const [homeDuration, setHomeDuration] = useState('10 Hours');
  const [homeFamilyMembers, setHomeFamilyMembers] = useState('3-4 Members');
  const [homeStartDate, setHomeStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [homeAgreeTerms, setHomeAgreeTerms] = useState(true);

  // 3. Daily Staff State
  const [dailyOutletName, setDailyOutletName] = useState('');
  const [dailyAddress, setDailyAddress] = useState('');
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

  // 4. Party Chef State (Dynamic 5-Step multi-date & multi-meal system)
  const [partyVenueAddress, setPartyVenueAddress] = useState('');
  const [partyNewDateInput, setPartyNewDateInput] = useState('');
  const [partyDates, setPartyDates] = useState<PartyDateEvent[]>([
    {
      date: new Date().toISOString().split('T')[0],
      eventType: 'Birthday Party',
      meals: [
        {
          name: 'Dinner',
          guests: 20,
          menuMode: null,
          menu: [],
          categories: { starter: 0, mainCourse: 0, breads: 0, rice: 0, drinks: 0, sides: 0 }
        }
      ]
    }
  ]);

  // Menu Modal State for Party Chef
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);
  const [activeMealIndex, setActiveMealIndex] = useState<number | null>(null);
  const [tempSelectedMenu, setTempSelectedMenu] = useState<string[]>([]);

  // Payment Method and Terms
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [partyAgreeTerms, setPartyAgreeTerms] = useState<boolean>(false);

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
            if (parsed.email) setEmail(parsed.email);
            setIsPhoneVerified(true);
            setUserToken(storedToken);
          }
        }
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Date Formatting Helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Select Date';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Handle Send OTP
  const handleSendOtp = async () => {
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Mobile Number Required',
        text: 'Please enter a valid 10-digit mobile number.',
        confirmButtonColor: '#0866ed'
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
          confirmButtonColor: '#0866ed'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send OTP',
          text: data.message || 'Please check the mobile number and try again.',
          confirmButtonColor: '#0866ed'
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to connect to SMS server. Please try again later.',
        confirmButtonColor: '#0866ed'
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
        confirmButtonColor: '#0866ed'
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
          confirmButtonColor: '#0866ed'
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.message || 'Unable to connect to server. Please try again.',
        confirmButtonColor: '#0866ed'
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Party Date Management
  const addPartyDate = () => {
    if (!partyNewDateInput) {
      Swal.fire({ icon: 'warning', title: 'Select Date', text: 'Please select a date first.', confirmButtonColor: '#0866ed' });
      return;
    }
    if (partyDates.some(p => p.date === partyNewDateInput)) {
      Swal.fire({ icon: 'info', title: 'Already Added', text: 'This date is already selected.', confirmButtonColor: '#0866ed' });
      return;
    }
    setPartyDates(prev => [
      ...prev,
      {
        date: partyNewDateInput,
        eventType: 'Birthday Party',
        meals: [
          {
            name: 'Dinner',
            guests: 20,
            menuMode: null,
            menu: [],
            categories: { starter: 0, mainCourse: 0, breads: 0, rice: 0, drinks: 0, sides: 0 }
          }
        ]
      }
    ]);
    setPartyNewDateInput('');
  };

  const removePartyDate = (idx: number) => {
    setPartyDates(prev => prev.filter((_, i) => i !== idx));
  };

  const updatePartyEventType = (dateIdx: number, newType: string) => {
    setPartyDates(prev => prev.map((p, i) => i === dateIdx ? { ...p, eventType: newType } : p));
  };

  const addSpecificMeal = (dateIdx: number, mealName: string) => {
    setPartyDates(prev => prev.map((p, i) => {
      if (i !== dateIdx) return p;
      if (p.meals.some(m => m.name === mealName)) {
        Swal.fire({ icon: 'info', title: 'Meal Exists', text: `${mealName} is already added for this day.`, confirmButtonColor: '#0866ed' });
        return p;
      }
      return {
        ...p,
        meals: [
          ...p.meals,
          {
            name: mealName,
            guests: 20,
            menuMode: null,
            menu: [],
            categories: { starter: 0, mainCourse: 0, breads: 0, rice: 0, drinks: 0, sides: 0 }
          }
        ]
      };
    }));
  };

  const addNextAvailableMeal = (dateIdx: number) => {
    const existing = partyDates[dateIdx]?.meals.map(m => m.name) || [];
    const available = ['Breakfast', 'Lunch', 'Dinner'].filter(m => !existing.includes(m));
    if (available.length === 0) {
      Swal.fire({ icon: 'info', title: 'All Meals Added', text: 'All meals (Breakfast, Lunch, Dinner) are already selected for this date.', confirmButtonColor: '#0866ed' });
      return;
    }
    addSpecificMeal(dateIdx, available[0]);
  };

  const removePartyMeal = (dateIdx: number, mealIdx: number) => {
    setPartyDates(prev => prev.map((p, dI) => {
      if (dI !== dateIdx) return p;
      return { ...p, meals: p.meals.filter((_, mI) => mI !== mealIdx) };
    }));
  };

  const changePartyGuests = (dateIdx: number, mealIdx: number, delta: number) => {
    setPartyDates(prev => prev.map((p, dI) => {
      if (dI !== dateIdx) return p;
      return {
        ...p,
        meals: p.meals.map((m, mI) => {
          if (mI !== mealIdx) return m;
          const newGuests = Math.max(1, m.guests + delta);
          return { ...m, guests: newGuests };
        })
      };
    }));
  };

  // Menu Mode & Items Management
  const selectMenuMode = (dateIdx: number, mealIdx: number, mode: 'now' | 'later') => {
    setPartyDates(prev => prev.map((p, dI) => {
      if (dI !== dateIdx) return p;
      return {
        ...p,
        meals: p.meals.map((m, mI) => {
          if (mI !== mealIdx) return m;
          return { ...m, menuMode: mode };
        })
      };
    }));
  };

  const resetMenuMode = (dateIdx: number, mealIdx: number) => {
    setPartyDates(prev => prev.map((p, dI) => {
      if (dI !== dateIdx) return p;
      return {
        ...p,
        meals: p.meals.map((m, mI) => {
          if (mI !== mealIdx) return m;
          return { ...m, menuMode: null };
        })
      };
    }));
  };

  const changePartyCategoryCount = (dateIdx: number, mealIdx: number, catKey: keyof PartyMealCategoryCount, delta: number) => {
    setPartyDates(prev => prev.map((p, dI) => {
      if (dI !== dateIdx) return p;
      return {
        ...p,
        meals: p.meals.map((m, mI) => {
          if (mI !== mealIdx) return m;
          const current = m.categories[catKey] || 0;
          const nextVal = Math.max(0, current + delta);
          return {
            ...m,
            categories: {
              ...m.categories,
              [catKey]: nextVal
            }
          };
        })
      };
    }));
  };

  const openMenuModal = (dateIdx: number, mealIdx: number) => {
    setActiveDateIndex(dateIdx);
    setActiveMealIndex(mealIdx);
    const existing = partyDates[dateIdx]?.meals[mealIdx]?.menu || [];
    setTempSelectedMenu([...existing]);
    setIsMenuModalOpen(true);
  };

  const toggleMenuItemSelection = (itemName: string) => {
    setTempSelectedMenu(prev => 
      prev.includes(itemName) ? prev.filter(x => x !== itemName) : [...prev, itemName]
    );
  };

  const saveMenuModalItems = () => {
    if (activeDateIndex === null || activeMealIndex === null) return;
    setPartyDates(prev => prev.map((p, dI) => {
      if (dI !== activeDateIndex) return p;
      return {
        ...p,
        meals: p.meals.map((m, mI) => {
          if (mI !== activeMealIndex) return m;
          return { ...m, menu: [...tempSelectedMenu] };
        })
      };
    }));
    setIsMenuModalOpen(false);
  };

  const removeSingleMenuItem = (dateIdx: number, mealIdx: number, itemName: string) => {
    setPartyDates(prev => prev.map((p, dI) => {
      if (dI !== dateIdx) return p;
      return {
        ...p,
        meals: p.meals.map((m, mI) => {
          if (mI !== mealIdx) return m;
          return { ...m, menu: m.menu.filter(x => x !== itemName) };
        })
      };
    }));
  };

  // Party Calculation logic exactly matching reference
  const calculatePartyPricing = () => {
    let menuTotal = 0;
    let guestTotal = 0;

    partyDates.forEach(event => {
      event.meals.forEach(meal => {
        let mealMenuCharge = 0;
        if (meal.menuMode === 'now') {
          mealMenuCharge = meal.menu.length * CATEGORY_RATES.mainCourse;
        } else if (meal.menuMode === 'later') {
          const c = meal.categories;
          mealMenuCharge = (c.starter || 0) * CATEGORY_RATES.starter
            + (c.mainCourse || 0) * CATEGORY_RATES.mainCourse
            + (c.breads || 0) * CATEGORY_RATES.breads
            + (c.rice || 0) * CATEGORY_RATES.rice
            + (c.drinks || 0) * CATEGORY_RATES.drinks
            + (c.sides || 0) * CATEGORY_RATES.sides;
        }
        const mealGuestCharge = (meal.guests || 0) * GUEST_RATE;
        menuTotal += mealMenuCharge;
        guestTotal += mealGuestCharge;
      });
    });

    const subtotal = menuTotal + guestTotal;
    const discount = Math.round(subtotal * (COUPON_PERCENT / 100));
    const discountedAmount = Math.max(0, subtotal - discount);
    const platformFee = Math.round(discountedAmount * (PLATFORM_FEE_PERCENT / 100));
    const taxable = discountedAmount + platformFee;
    const gst = Math.round(taxable * (GST_PERCENT / 100));
    const finalAmount = taxable + gst;
    const advanceAmount = finalAmount; // or 25% if configured, here final amount

    return {
      menuTotal,
      guestTotal,
      subtotal,
      discount,
      platformFee,
      gst,
      finalAmount,
      advanceAmount
    };
  };

  const partyPricing = calculatePartyPricing();

  // Step 1 Validation across tabs
  const handleProceedToStep2 = () => {
    if (!name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Name Required', text: 'Please enter your full name.', confirmButtonColor: '#0866ed' });
      return;
    }
    if (!phone || phone.length < 10) {
      Swal.fire({ icon: 'warning', title: 'Phone Required', text: 'Please enter your 10-digit mobile number.', confirmButtonColor: '#0866ed' });
      return;
    }
    if (!isPhoneVerified) {
      Swal.fire({ icon: 'warning', title: 'Verification Required', text: 'Please verify your mobile number with OTP first.', confirmButtonColor: '#0866ed' });
      return;
    }

    if (activeTab === 'commercial') {
      if (!commercialBusinessName.trim()) {
        Swal.fire({ icon: 'warning', title: 'Business Name Required', text: 'Please enter your restaurant / hotel / business name.', confirmButtonColor: '#0866ed' });
        return;
      }
      if (!commercialAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Business Address Required', text: 'Please enter complete business address.', confirmButtonColor: '#0866ed' });
        return;
      }
    } else if (activeTab === 'homecook') {
      if (!homeAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Home Address Required', text: 'Please enter your residential address.', confirmButtonColor: '#0866ed' });
        return;
      }
    } else if (activeTab === 'daily') {
      if (!dailyOutletName.trim()) {
        Swal.fire({ icon: 'warning', title: 'Outlet / Event Name Required', text: 'Please enter your outlet or event name.', confirmButtonColor: '#0866ed' });
        return;
      }
      if (!dailyAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Address Required', text: 'Please enter location / address.', confirmButtonColor: '#0866ed' });
        return;
      }
    } else if (activeTab === 'party') {
      if (!partyVenueAddress.trim()) {
        Swal.fire({ icon: 'warning', title: 'Address Required', text: 'Please enter party venue / complete address.', confirmButtonColor: '#0866ed' });
        return;
      }
    }

    setStep(2);
  };

  // Step 2 Validation
  const handleProceedToStep3 = () => {
    if (activeTab === 'commercial') {
      if (commercialStaffList.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Staff Required', text: 'Please add at least 1 staff requirement.', confirmButtonColor: '#0866ed' });
        return;
      }
      if (!commercialAgreeTerms) {
        Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the salary and terms.', confirmButtonColor: '#0866ed' });
        return;
      }
    } else if (activeTab === 'homecook') {
      if (!homeAgreeTerms) {
        Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the terms & conditions.', confirmButtonColor: '#0866ed' });
        return;
      }
    } else if (activeTab === 'daily') {
      if (!dailyAgreeTerms) {
        Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please agree to the booking terms.', confirmButtonColor: '#0866ed' });
        return;
      }
    } else if (activeTab === 'party') {
      if (partyDates.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Select Date', text: 'Please select at least one event date.', confirmButtonColor: '#0866ed' });
        return;
      }
      let valid = true;
      partyDates.forEach(event => {
        if (!event.date || event.meals.length === 0) {
          valid = false;
        }
        event.meals.forEach(meal => {
          if (!meal.guests || meal.guests < 1) valid = false;
        });
      });
      if (!valid) {
        Swal.fire({ icon: 'warning', title: 'Meal Required', text: 'Please select a meal and guest count for every date.', confirmButtonColor: '#0866ed' });
        return;
      }
    }

    setStep(3);
  };

  // Step 3 Validation for Party Chef
  const handleProceedToStep4 = () => {
    if (activeTab === 'party') {
      let valid = true;
      partyDates.forEach(event => {
        event.meals.forEach(meal => {
          if (!meal.menuMode) {
            valid = false;
          }
          if (meal.menuMode === 'now' && meal.menu.length === 0) {
            valid = false;
          }
          if (meal.menuMode === 'later') {
            const totalItems = Object.values(meal.categories).reduce((sum, val) => sum + val, 0);
            if (totalItems === 0) {
              valid = false;
            }
          }
        });
      });

      if (!valid) {
        Swal.fire({
          icon: 'warning',
          title: 'Menu Incomplete',
          text: 'Please select a menu option and configure dishes/quantities for every meal.',
          confirmButtonColor: '#0866ed'
        });
        return;
      }
    }
    setStep(4);
  };

  // Daily calculations
  const dailyStaffAmount = dailyStaffRequirement.ratePerDay * dailyStaffRequirement.count * dailyStaffRequirement.days;
  const dailyGst = Math.round(dailyStaffAmount * 0.18);
  const dailyPlatformFee = Math.round(dailyStaffAmount * 0.10);
  const dailyTotalAmount = dailyStaffAmount + dailyGst + dailyPlatformFee;
  const dailyAdvanceAmount = Math.round(dailyTotalAmount * 0.25);

  // Trigger Live Backend Booking & Payment
  const handleFinalSubmitAndPay = async () => {
    if (activeTab === 'party' && !partyAgreeTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'Agreement Required',
        text: 'Please accept the booking terms and cancellation policy.',
        confirmButtonColor: '#0866ed'
      });
      return;
    }

    setIsSubmitting(true);
    let amountToPay = 299;
    let sourceType = 'Chef for Party Booking';
    let summaryMessage = '';
    const payloadEndpoint = `${API_BASE}/api/jobs/web-commercial-booking`;
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
        email: email.trim(),
        city: city.trim(),
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
        email: email.trim(),
        city: city.trim(),
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
        email: email.trim(),
        city: city.trim(),
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
      amountToPay = partyPricing.finalAmount;
      sourceType = 'Chef for Party Booking (5-Step Master Flow)';
      summaryMessage = `City: ${city}, Address: ${partyVenueAddress}, Dates: ${partyDates.map((d, i) => `Day ${i + 1} (${d.date} - ${d.eventType}): ${d.meals.map(m => `${m.name} [Guests: ${m.guests}, Mode: ${m.menuMode || 'none'}, Items: ${m.menuMode === 'now' ? m.menu.join(', ') : JSON.stringify(m.categories)}]`).join('; ')}`).join(' | ')}, Menu Charges: ₹${partyPricing.menuTotal}, Guests Charges: ₹${partyPricing.guestTotal}, Total: ₹${partyPricing.finalAmount}, Payment Mode: ${paymentMethod}`;

      requestPayload = {
        jobCategory: 'home',
        bookingType: 'party',
        name: name.trim(),
        phone: phone.trim().replace(/\D/g, ''),
        email: email.trim() || `${phone.replace(/\D/g, '')}@zomocook.in`,
        city: city.trim(),
        address: partyVenueAddress.trim(),
        partyRequirement: {
          city: city.trim(),
          paymentMethod,
          dates: partyDates,
          datesCount: partyDates.length,
          pricingBreakdown: partyPricing
        },
        pricing: {
          menuCharges: partyPricing.menuTotal,
          guestCharges: partyPricing.guestTotal,
          subtotal: partyPricing.subtotal,
          discount: partyPricing.discount,
          platformFee: partyPricing.platformFee,
          gst: partyPricing.gst,
          totalAmount: partyPricing.finalAmount,
          advance: partyPricing.advanceAmount
        }
      };
    }

    try {
      let generatedRef = `ZOMO-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Send to Backend Lead / Job API
      try {
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

        // 2. Open Live Cashfree Checkout if paymentSessionId returned
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
                text: `Payment was not completed. Please complete payment to confirm your booking.`,
                confirmButtonColor: '#0866ed'
              });
            } else {
              setBookingRef(generatedRef);
              setBookingSuccess(true);
              Swal.fire({
                icon: 'success',
                title: 'Booking Confirmed!',
                text: `Your chef booking request #${generatedRef} has been confirmed.`,
                confirmButtonColor: '#0866ed'
              });
            }
          });
          return;
        }
      } catch (e) {
        console.error('Job API error:', e);
      }

      // Also record in Next.js MongoDB Leads
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email: email.trim() || `${phone.replace(/\D/g, '')}@zomocook.in`,
            city,
            address: activeTab === 'party' ? partyVenueAddress : commercialAddress || homeAddress || dailyAddress,
            sourceType,
            message: summaryMessage,
            details: requestPayload
          })
        });
      } catch (err) {}

      // Fallback confirmation
      setBookingRef(generatedRef);
      setBookingSuccess(true);
      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed!',
        text: `Your Chef booking #${generatedRef} has been received successfully. Our team will connect with you immediately.`,
        confirmButtonColor: '#0866ed'
      });
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Booking Notice',
        text: err.message || 'Booking details recorded. Our team will contact you shortly.',
        confirmButtonColor: '#0866ed'
      });
      setBookingSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPartyTab = activeTab === 'party';

  return (
    <>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSubmitting) onClose();
        }}
      >
        <div 
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] border border-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
            <div>
              <div className="text-[22px] font-extrabold text-[#073b8f] tracking-tight">
                Zomo<span className="text-[#ed1c24]">Cook</span>
              </div>
              <p className="text-[12px] text-slate-500 mt-0.5 font-medium">
                Book a professional chef for your special occasion
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Service Tabs */}
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'commercial' as ServiceTabType, label: '🏨 Commercial Hiring' },
              { id: 'homecook' as ServiceTabType, label: '🏠 Domestic Home Cook' },
              { id: 'daily' as ServiceTabType, label: '📅 Daily Basis Staff' },
              { id: 'party' as ServiceTabType, label: '👨‍🍳 Chef for Party' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setStep(1);
                    setBookingSuccess(false);
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-[12.5px] transition-all text-center truncate ${
                    isActive
                      ? 'bg-[#0866ed] text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Stepper Progress Bar */}
          {!bookingSuccess && (
            <div className="px-6 py-3 bg-white border-b border-slate-100">
              {isPartyTab ? (
                /* 5 Steps for Party */
                <div className="flex items-center justify-between max-w-2xl mx-auto relative overflow-x-auto py-1">
                  {[
                    { num: 1, label: 'Basic Details' },
                    { num: 2, label: 'Event Details' },
                    { num: 3, label: 'Menu Details' },
                    { num: 4, label: 'Booking Summary' },
                    { num: 5, label: 'Payment' }
                  ].map((s, idx, arr) => (
                    <React.Fragment key={s.num}>
                      <div className="flex items-center gap-1.5 relative z-10 shrink-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                          step > s.num ? 'bg-green-600 text-white' : step === s.num ? 'bg-[#0866ed] text-white shadow-sm ring-2 ring-blue-200' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {step > s.num ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                        </div>
                        <span className={`text-[12px] font-bold hidden sm:inline ${step === s.num ? 'text-[#0866ed]' : step > s.num ? 'text-green-600' : 'text-slate-400'}`}>
                          {s.label}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className={`flex-1 h-[2px] mx-2 min-w-[20px] transition-colors ${step > s.num ? 'bg-green-500' : 'bg-slate-200'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                /* 4 Steps for Commercial / Home / Daily */
                <div className="flex items-center justify-between max-w-xl mx-auto relative">
                  {[
                    { num: 1, label: 'Basic Details' },
                    { num: 2, label: activeTab === 'commercial' ? 'Staff Requirement' : activeTab === 'homecook' ? 'Cook Details' : 'Staff Requirement' },
                    { num: 3, label: 'Booking Summary' },
                    { num: 4, label: activeTab === 'daily' ? 'Advance Payment' : 'Processing Fee' }
                  ].map((s, idx, arr) => (
                    <React.Fragment key={s.num}>
                      <div className="flex items-center gap-2 relative z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step > s.num ? 'bg-green-500 text-white' : step === s.num ? 'bg-[#0866ed] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {step > s.num ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                        </div>
                        <span className={`text-[12px] font-bold hidden sm:inline ${step === s.num ? 'text-[#0866ed]' : 'text-slate-500'}`}>
                          {s.label}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className={`flex-1 h-[2px] mx-2 transition-colors ${step > s.num ? 'bg-green-500' : 'bg-slate-200'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Modal Scrollable Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-800">

            {/* ================= STEP 1: Basic Details ================= */}
            {step === 1 && !bookingSuccess && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h2 className="text-[20px] font-extrabold text-[#132b5c] tracking-tight">
                    Basic Details
                  </h2>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    {isPartyTab ? 'Tell us about yourself and your event location.' : 'Please enter your contact details to get started.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866ed] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                    />
                  </div>

                  {/* Mobile Number with OTP */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[13px] font-bold text-slate-700">
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
                        } focus:border-[#0866ed] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all`}
                      />
                      {!isPhoneVerified && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp || phone.length < 10 || timer > 0}
                          className="px-4 py-2.5 bg-[#0866ed] hover:bg-[#0652ba] disabled:bg-slate-300 text-white font-bold text-[12.5px] rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          {isSendingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : timer > 0 ? `${timer}s` : 'Send OTP'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Inline OTP Box */}
                  {otpSent && !isPhoneVerified && (
                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-bold text-[#0866ed]">Enter 6-Digit Verification Code:</span>
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
                          className="flex-1 px-3 py-2 rounded-lg bg-white border border-blue-200 focus:border-[#0866ed] outline-none text-center font-bold tracking-widest text-[15px]"
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

                  {/* Email */}
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866ed] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866ed] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                    />
                  </div>

                  {/* Commercial Business Name */}
                  {activeTab === 'commercial' && (
                    <div className="sm:col-span-2">
                      <label className="block text-[13px] font-bold text-slate-700 mb-1">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        value={commercialBusinessName}
                        onChange={(e) => setCommercialBusinessName(e.target.value)}
                        placeholder="Restaurant / Hotel / Cafe / Cloud Kitchen"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866ed] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                      />
                    </div>
                  )}

                  {/* Daily Outlet Name */}
                  {activeTab === 'daily' && (
                    <div className="sm:col-span-2">
                      <label className="block text-[13px] font-bold text-slate-700 mb-1">
                        Outlet / Event Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        value={dailyOutletName}
                        onChange={(e) => setDailyOutletName(e.target.value)}
                        placeholder="e.g. Royal Grand Hotel, Banquet Hall, Cafe, Private Event"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866ed] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all"
                      />
                    </div>
                  )}

                  {/* Event Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1">
                      Event Address <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      rows={2}
                      value={activeTab === 'commercial' ? commercialAddress : activeTab === 'homecook' ? homeAddress : activeTab === 'daily' ? dailyAddress : partyVenueAddress}
                      onChange={(e) => {
                        if (activeTab === 'commercial') setCommercialAddress(e.target.value);
                        else if (activeTab === 'homecook') setHomeAddress(e.target.value);
                        else if (activeTab === 'daily') setDailyAddress(e.target.value);
                        else setPartyVenueAddress(e.target.value);
                      }}
                      placeholder="Enter complete event address"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0866ed] focus:ring-2 focus:ring-blue-100 outline-none text-[13.5px] font-medium transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Next Button */}
                <div className="pt-3 flex justify-end border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleProceedToStep2}
                    className="inline-flex items-center gap-2 bg-[#0866ed] hover:bg-[#0652ba] text-white px-8 py-2.5 rounded-xl font-bold text-[14px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                  >
                    <span>Continue →</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: Event Details ================= */}
            {step === 2 && !bookingSuccess && (
              <div className="space-y-4 animate-in fade-in">
                {isPartyTab ? (
                  /* TAB 4: Chef for Party -> Step 2: Event Details */
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-[20px] font-extrabold text-[#132b5c] tracking-tight">Event Details</h2>
                      <p className="text-[13px] text-slate-500">
                        First select all event dates. Then choose meals and guest count separately for every date.
                      </p>
                    </div>

                    {/* Date Selector Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#f8fbff] border border-[#dbe7f8] space-y-3">
                      <div>
                        <div className="font-extrabold text-[16px] text-slate-900">Select Event Dates</div>
                        <div className="text-[12.5px] text-slate-500">
                          Select one or multiple dates. You can add another date later as well.
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2.5">
                        <input 
                          type="date"
                          value={partyNewDateInput}
                          onChange={(e) => setPartyNewDateInput(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#dce3ed] bg-white text-[13.5px] font-medium outline-none focus:border-[#0866ed]"
                        />
                        <button
                          type="button"
                          onClick={addPartyDate}
                          className="px-6 py-2.5 bg-[#0866ed] hover:bg-[#0652ba] text-white font-bold text-[13.5px] rounded-xl shadow-sm transition-colors whitespace-nowrap"
                        >
                          + Add Date
                        </button>
                      </div>

                      {/* Selected Date Chips */}
                      {partyDates.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {partyDates.map((event, idx) => (
                            <div 
                              key={idx}
                              className="inline-flex items-center gap-2 bg-white border border-[#cfe0fb] text-[#17468e] px-3 py-1.5 rounded-full text-[12.5px] font-bold shadow-xs"
                            >
                              <span>📅 {formatDate(event.date)}</span>
                              <button
                                type="button"
                                onClick={() => removePartyDate(idx)}
                                className="w-5 h-5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center text-xs font-bold transition-colors"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Event Cards List */}
                    {partyDates.length === 0 ? (
                      <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 space-y-2">
                        <div className="text-[36px]">📅</div>
                        <h3 className="font-bold text-slate-700 text-[15px]">Select an event date above</h3>
                        <p className="text-[12.5px] text-slate-500">Your date-wise meal options will appear here.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {partyDates.map((event, dateIdx) => (
                          <div key={dateIdx} className="p-4 sm:p-5 rounded-2xl border border-[#dce4ef] bg-white shadow-xs space-y-4">
                            {/* Card Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#eaf2ff] text-[#0866ed] flex items-center justify-center font-extrabold text-[15px]">
                                  {dateIdx + 1}
                                </div>
                                <div>
                                  <span className="font-extrabold text-[16px] text-slate-900 block">Day {dateIdx + 1}</span>
                                  <span className="text-[12px] font-medium text-slate-500">{formatDate(event.date)}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => removePartyDate(dateIdx)}
                                className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[12px] transition-colors"
                              >
                                Remove Date
                              </button>
                            </div>

                            {/* Event Type Select */}
                            <div>
                              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                                Type of Event <span className="text-red-500">*</span>
                              </label>
                              <select 
                                value={event.eventType}
                                onChange={(e) => updatePartyEventType(dateIdx, e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium text-slate-800 outline-none focus:border-[#0866ed]"
                              >
                                {occasionTypes.map(opt => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </div>

                            {/* Meals List */}
                            <div className="space-y-3">
                              {event.meals.length === 0 ? (
                                <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-center">
                                  <span className="font-bold text-[13px] text-slate-700 block">Select Meal</span>
                                  <div className="flex flex-wrap justify-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => addSpecificMeal(dateIdx, 'Breakfast')}
                                      className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold text-[12.5px]"
                                    >
                                      ☀️ Breakfast
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => addSpecificMeal(dateIdx, 'Lunch')}
                                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl font-bold text-[12.5px]"
                                    >
                                      🍱 Lunch
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => addSpecificMeal(dateIdx, 'Dinner')}
                                      className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl font-bold text-[12.5px]"
                                    >
                                      🌙 Dinner
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                event.meals.map((meal, mealIdx) => {
                                  let icon = '☀️';
                                  let iconBg = 'bg-[#fff4d6] text-amber-800';
                                  if (meal.name === 'Lunch') {
                                    icon = '🍱';
                                    iconBg = 'bg-[#e7f8ed] text-emerald-800';
                                  } else if (meal.name === 'Dinner') {
                                    icon = '🌙';
                                    iconBg = 'bg-[#eee9ff] text-purple-800';
                                  }

                                  return (
                                    <div key={mealIdx} className="p-3.5 rounded-xl border border-slate-200 bg-[#fbfdff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[19px] ${iconBg}`}>
                                          {icon}
                                        </div>
                                        <div>
                                          <div className="font-extrabold text-[14.5px] text-slate-900">{meal.name}</div>
                                          <div className="text-[11.5px] text-slate-500">Configure guest count</div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[12.5px] font-semibold text-slate-500">Guests</span>
                                          <button
                                            type="button"
                                            onClick={() => changePartyGuests(dateIdx, mealIdx, -1)}
                                            className="w-8 h-8 rounded-lg bg-[#e8f0ff] hover:bg-blue-100 text-[#0866ed] font-bold text-[16px] flex items-center justify-center"
                                          >
                                            −
                                          </button>
                                          <span className="min-w-[32px] text-center font-extrabold text-[14px]">
                                            {meal.guests}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => changePartyGuests(dateIdx, mealIdx, 1)}
                                            className="w-8 h-8 rounded-lg bg-[#e8f0ff] hover:bg-blue-100 text-[#0866ed] font-bold text-[16px] flex items-center justify-center"
                                          >
                                            +
                                          </button>
                                        </div>

                                        {event.meals.length > 1 && (
                                          <button
                                            type="button"
                                            onClick={() => removePartyMeal(dateIdx, mealIdx)}
                                            className="text-slate-400 hover:text-red-500 p-1"
                                            title="Remove Meal"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>

                            {/* Add Another Meal Button */}
                            <button
                              type="button"
                              onClick={() => addNextAvailableMeal(dateIdx)}
                              className="w-full py-2.5 rounded-xl border border-dashed border-[#72a8ff] bg-[#f7fbff] hover:bg-blue-50 text-[#0866ed] font-bold text-[13px] transition-colors"
                            >
                              ＋ Add Another Meal
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add More Date Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.querySelector('input[type="date"]') as HTMLInputElement;
                        if (input) input.focus();
                      }}
                      className="w-full py-3 rounded-xl border-2 border-dashed border-[#72a8ff] bg-[#f9fcff] hover:bg-blue-50 text-[#0866ed] font-extrabold text-[14px] transition-colors"
                    >
                      ＋ Add More Date
                    </button>

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
                        className="inline-flex items-center gap-1.5 bg-[#0866ed] hover:bg-[#0652ba] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                      >
                        <span>Continue →</span>
                      </button>
                    </div>
                  </div>
                ) : activeTab === 'commercial' ? (
                  /* TAB 1: Commercial Requirement */
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
                        className="inline-flex items-center gap-1.5 bg-[#0866ed] hover:bg-[#0652ba] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                      >
                        <span>Continue →</span>
                      </button>
                    </div>
                  </>
                ) : activeTab === 'homecook' ? (
                  /* TAB 2: Home Cook Requirement */
                  <div className="space-y-3.5">
                    <div>
                      <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">Home Cook Requirements</h2>
                      <p className="text-[12.5px] text-slate-500">Choose the type of cook and preferences for your household.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {cookLevels.map(lvl => (
                        <div
                          key={lvl.id}
                          onClick={() => setHomeCookLevel(lvl.id)}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            homeCookLevel === lvl.id
                              ? 'border-[#0866ed] bg-blue-50/40 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-[13px] text-slate-900">{lvl.name}</span>
                            <span className="text-[10px] font-extrabold bg-[#0866ed]/10 text-[#0866ed] px-1.5 py-0.5 rounded">{lvl.badge}</span>
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
                        className="inline-flex items-center gap-1.5 bg-[#0866ed] hover:bg-[#0652ba] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                      >
                        <span>Continue →</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* TAB 3: Daily Basis Requirement */
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
                    </div>

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
                        className="inline-flex items-center gap-1.5 bg-[#0866ed] hover:bg-[#0652ba] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                      >
                        <span>Continue →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= STEP 3: Menu Details (For Party) OR Booking Summary (Others) ================= */}
            {step === 3 && !bookingSuccess && (
              <div className="space-y-4 animate-in fade-in">
                {isPartyTab ? (
                  /* TAB 4: Chef for Party -> Step 3: Menu Details */
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-[20px] font-extrabold text-[#132b5c] tracking-tight">Menu Details</h2>
                      <p className="text-[13px] text-slate-500">
                        For each meal, choose whether you want to select dishes now or decide the dishes later.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {partyDates.map((event, dateIdx) => (
                        <div key={dateIdx} className="p-4 sm:p-5 rounded-2xl border border-[#dce4ef] bg-white shadow-xs space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#eaf2ff] text-[#0866ed] flex items-center justify-center font-extrabold text-[14px]">
                                {dateIdx + 1}
                              </div>
                              <div>
                                <span className="font-extrabold text-[15.5px] text-slate-900">Day {dateIdx + 1}</span>
                                <span className="text-[12px] text-slate-500 ml-2">{formatDate(event.date)}</span>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-blue-50 text-[#0866ed] font-bold text-[12px] rounded-lg border border-blue-100">
                              {event.eventType}
                            </span>
                          </div>

                          {/* Meals for this Day */}
                          <div className="space-y-3.5">
                            {event.meals.map((meal, mealIdx) => (
                              <div key={mealIdx} className="p-4 rounded-xl border border-slate-200 bg-[#fbfdff] space-y-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-extrabold text-[15px] text-slate-900">{meal.name}</span>
                                    <span className="text-[12px] text-slate-500 ml-2 font-semibold">({meal.guests} Guests)</span>
                                  </div>

                                  {meal.menuMode && (
                                    <button
                                      type="button"
                                      onClick={() => resetMenuMode(dateIdx, mealIdx)}
                                      className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-[11.5px]"
                                    >
                                      Change Option
                                    </button>
                                  )}
                                </div>

                                {/* No Mode Selected */}
                                {!meal.menuMode && (
                                  <div className="space-y-2 pt-1">
                                    <div className="text-[13px] font-bold text-slate-700">How would you like to choose the menu?</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div 
                                        onClick={() => selectMenuMode(dateIdx, mealIdx, 'now')}
                                        className="p-3.5 rounded-xl border-2 border-[#dce4ef] hover:border-[#8bb7ff] bg-white cursor-pointer transition-all hover:bg-blue-50/20"
                                      >
                                        <div className="font-bold text-[14px] text-slate-900">Choose Menu Now</div>
                                        <div className="text-[11.5px] text-slate-500 mt-1">Select individual dishes from our menu.</div>
                                      </div>

                                      <div 
                                        onClick={() => selectMenuMode(dateIdx, mealIdx, 'later')}
                                        className="p-3.5 rounded-xl border-2 border-[#dce4ef] hover:border-[#8bb7ff] bg-white cursor-pointer transition-all hover:bg-blue-50/20"
                                      >
                                        <div className="font-bold text-[14px] text-slate-900">I'll Choose Later</div>
                                        <div className="text-[11.5px] text-slate-500 mt-1">Tell us how many items you need in each category.</div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Mode: Choose Now */}
                                {meal.menuMode === 'now' && (
                                  <div className="space-y-3 pt-1">
                                    <div className="p-3 rounded-xl border-2 border-[#0866ed] bg-[#f3f8ff]">
                                      <div className="font-bold text-[13.5px] text-[#0866ed]">✓ Choose Menu Now</div>
                                      <div className="text-[11.5px] text-slate-600 mt-0.5">Select dishes below.</div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => openMenuModal(dateIdx, mealIdx)}
                                      className="py-2.5 px-4 rounded-xl border border-dashed border-[#72a8ff] bg-[#f7fbff] hover:bg-blue-50 text-[#0866ed] font-bold text-[13px] transition-colors"
                                    >
                                      ＋ Select Menu Items
                                    </button>

                                    {meal.menu.length > 0 && (
                                      <div className="flex flex-wrap gap-2 pt-1">
                                        {meal.menu.map(item => {
                                          const food = menuCatalog.find(x => x.name === item);
                                          return (
                                            <div key={item} className="flex items-center gap-2 p-1.5 pr-2.5 border border-[#dce4ef] bg-white rounded-xl shadow-xs">
                                              {food && (
                                                <img src={food.image} alt={item} className="w-8 h-8 rounded-lg object-cover" />
                                              )}
                                              <span className="text-[12.5px] font-bold text-slate-800">{item}</span>
                                              <button
                                                type="button"
                                                onClick={() => removeSingleMenuItem(dateIdx, mealIdx, item)}
                                                className="w-5 h-5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center text-xs font-bold transition-colors ml-1"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Mode: Choose Later */}
                                {meal.menuMode === 'later' && (
                                  <div className="space-y-3 pt-1">
                                    <div className="p-3 rounded-xl border-2 border-[#0866ed] bg-[#f3f8ff]">
                                      <div className="font-bold text-[13.5px] text-[#0866ed]">✓ I'll Choose Later</div>
                                      <div className="text-[11.5px] text-slate-600 mt-0.5">Enter the number of dishes required in each category.</div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3">
                                      <div>
                                        <div className="font-bold text-[13.5px] text-slate-900">Number of Menu Items</div>
                                        <div className="text-[11.5px] text-slate-500">The amount will be calculated according to the number of items.</div>
                                      </div>

                                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                        {[
                                          { key: 'starter' as const, label: 'Starters (₹250)' },
                                          { key: 'mainCourse' as const, label: 'Main Course (₹250)' },
                                          { key: 'breads' as const, label: 'Breads (₹150)' },
                                          { key: 'rice' as const, label: 'Rice (₹200)' },
                                          { key: 'drinks' as const, label: 'Drinks (₹100)' },
                                          { key: 'sides' as const, label: 'Sides (₹100)' }
                                        ].map(cat => (
                                          <div key={cat.key} className="p-2.5 bg-white border border-[#dce4ef] rounded-xl flex items-center justify-between">
                                            <span className="text-[12px] font-bold text-slate-700">{cat.label}</span>
                                            <div className="flex items-center gap-1.5">
                                              <button
                                                type="button"
                                                onClick={() => changePartyCategoryCount(dateIdx, mealIdx, cat.key, -1)}
                                                className="w-7 h-7 rounded-lg bg-[#e8f0ff] hover:bg-blue-100 text-[#0866ed] font-extrabold text-[14px] flex items-center justify-center"
                                              >
                                                −
                                              </button>
                                              <span className="min-w-[20px] text-center font-extrabold text-[13px]">
                                                {meal.categories[cat.key] || 0}
                                              </span>
                                              <button
                                                type="button"
                                                onClick={() => changePartyCategoryCount(dateIdx, mealIdx, cat.key, 1)}
                                                className="w-7 h-7 rounded-lg bg-[#e8f0ff] hover:bg-blue-100 text-[#0866ed] font-extrabold text-[14px] flex items-center justify-center"
                                              >
                                                +
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Back & Next Navigation */}
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
                        onClick={handleProceedToStep4}
                        className="inline-flex items-center gap-1.5 bg-[#0866ed] hover:bg-[#0652ba] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                      >
                        <span>Continue →</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Non-Party Step 3: Booking Summary */
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-[19px] font-extrabold text-[#0f2441] tracking-tight">Booking Summary</h2>
                      <p className="text-[12.5px] text-slate-500">Review your requirement and amount before payment.</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[12.5px] space-y-1">
                      <div className="font-bold text-slate-900 mb-1">Customer Details</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-600">
                        <div><strong className="text-slate-800">Name:</strong> {name}</div>
                        <div><strong className="text-slate-800">Mobile:</strong> +91 {phone}</div>
                        {activeTab === 'commercial' && <div><strong className="text-slate-800">Business:</strong> {commercialBusinessName}</div>}
                        {activeTab === 'daily' && <div><strong className="text-slate-800">Outlet/Event:</strong> {dailyOutletName}</div>}
                        <div className="sm:col-span-2">
                          <strong className="text-slate-800">Address:</strong>{' '}
                          {activeTab === 'commercial' ? commercialAddress : activeTab === 'homecook' ? homeAddress : dailyAddress}
                        </div>
                      </div>
                    </div>

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
                        className="inline-flex items-center gap-1.5 bg-[#0866ed] hover:bg-[#0652ba] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                      >
                        <span>Proceed to Payment →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= STEP 4: Booking Summary (For Party) OR Payment (Others) ================= */}
            {step === 4 && !bookingSuccess && (
              <div className="space-y-4 animate-in fade-in">
                {isPartyTab ? (
                  /* TAB 4: Chef for Party -> Step 4: Booking Summary */
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-[20px] font-extrabold text-[#132b5c] tracking-tight">Booking Summary</h2>
                      <p className="text-[13px] text-slate-500">
                        Review all dates, meals, guests, menu selections and charges.
                      </p>
                    </div>

                    {/* Date-wise Summary Breakdown */}
                    <div className="space-y-4 max-h-[36vh] overflow-y-auto pr-1">
                      {partyDates.map((event, dateIdx) => {
                        let dateMealSum = 0;
                        return (
                          <div key={dateIdx} className="rounded-2xl border border-[#dce4ef] overflow-hidden bg-white shadow-xs">
                            <div className="bg-[#f2f6fc] px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between">
                              <span className="font-extrabold text-[14px] text-slate-900">
                                Day {dateIdx + 1} — {formatDate(event.date)}
                              </span>
                              <span className="text-[12px] font-bold text-[#0866ed] bg-white px-2.5 py-0.5 rounded-full border border-blue-100">
                                {event.eventType}
                              </span>
                            </div>

                            <div className="divide-y divide-[#edf0f5]">
                              {event.meals.map((meal, mealIdx) => {
                                let mealMenuPrice = 0;
                                let desc = '';
                                if (meal.menuMode === 'now') {
                                  mealMenuPrice = meal.menu.length * CATEGORY_RATES.mainCourse;
                                  desc = `${meal.menu.length} selected dishes (${meal.menu.join(', ')})`;
                                } else if (meal.menuMode === 'later') {
                                  const c = meal.categories;
                                  mealMenuPrice = (c.starter || 0) * CATEGORY_RATES.starter
                                    + (c.mainCourse || 0) * CATEGORY_RATES.mainCourse
                                    + (c.breads || 0) * CATEGORY_RATES.breads
                                    + (c.rice || 0) * CATEGORY_RATES.rice
                                    + (c.drinks || 0) * CATEGORY_RATES.drinks
                                    + (c.sides || 0) * CATEGORY_RATES.sides;
                                  desc = `Starters: ${c.starter}, Main: ${c.mainCourse}, Breads: ${c.breads}, Rice: ${c.rice}, Drinks: ${c.drinks}, Sides: ${c.sides}`;
                                }
                                const mealGuestPrice = meal.guests * GUEST_RATE;
                                const mealTotalPrice = mealMenuPrice + mealGuestPrice;
                                dateMealSum += mealTotalPrice;

                                return (
                                  <div key={mealIdx} className="p-3.5 text-[12.5px] space-y-1">
                                    <div className="flex justify-between items-center font-extrabold text-slate-900">
                                      <span>{meal.name}</span>
                                      <span className="text-[#0866ed]">₹{mealTotalPrice.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="text-slate-500 font-medium">
                                      Guests: {meal.guests} × ₹{GUEST_RATE} = ₹{(meal.guests * GUEST_RATE).toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-slate-600 text-[11.5px]">
                                      {desc}
                                    </div>
                                  </div>
                                );
                              })}

                              <div className="p-3 bg-slate-50/50 flex justify-between items-center text-[13px] font-bold text-slate-900">
                                <span>Day {dateIdx + 1} Total</span>
                                <span>₹{dateMealSum.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Price Calculation Box */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-[#dce4ef] bg-[#f8fafc] text-[13px] space-y-2">
                      <div className="flex justify-between text-slate-600">
                        <span>Menu Charges</span>
                        <strong className="text-slate-900">₹{partyPricing.menuTotal.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Guest Charges</span>
                        <strong className="text-slate-900">₹{partyPricing.guestTotal.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <strong className="text-slate-900">₹{partyPricing.subtotal.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-green-600 font-bold">
                        <span>Coupon (HOLI20)</span>
                        <strong>- ₹{partyPricing.discount.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Platform Fee (10%)</span>
                        <strong className="text-slate-900">₹{partyPricing.platformFee.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>GST (18%)</span>
                        <strong className="text-slate-900">₹{partyPricing.gst.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between items-center font-extrabold text-[#132b5c] text-[18px] sm:text-[20px] pt-3 border-t border-slate-200">
                        <span>Final Amount</span>
                        <span className="text-[#0866ed]">₹{partyPricing.finalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Back & Next Navigation */}
                    <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px]"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="inline-flex items-center gap-1.5 bg-[#0866ed] hover:bg-[#0652ba] text-white px-7 py-2.5 rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(8,102,232,0.3)] transition-all"
                      >
                        <span>Continue →</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Non-Party Step 4: Payment Confirmation */
                  <div className="space-y-4 animate-in fade-in text-center max-w-md mx-auto py-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0866ed] flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
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
                      <span className="text-[32px] font-black text-[#0866ed] tracking-tight block">
                        ₹{activeTab === 'daily' ? dailyAdvanceAmount : '299'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleFinalSubmitAndPay}
                      disabled={isSubmitting}
                      className="w-full bg-[#0866ed] hover:bg-[#0652ba] disabled:bg-slate-300 text-white py-3 rounded-xl font-extrabold text-[15px] shadow-[0_6px_20px_rgba(8,102,232,0.35)] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                      <span>Pay ₹{activeTab === 'daily' ? dailyAdvanceAmount : '299'} & Confirm</span>
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
              </div>
            )}

            {/* ================= STEP 5: Payment (For Party Chef) ================= */}
            {step === 5 && !bookingSuccess && isPartyTab && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h2 className="text-[20px] font-extrabold text-[#132b5c] tracking-tight">Payment</h2>
                  <p className="text-[13px] text-slate-500">
                    Complete your payment to confirm your chef booking.
                  </p>
                </div>

                {/* Total Payable Card */}
                <div className="p-4 sm:p-5 rounded-2xl border border-[#dce4ef] bg-white shadow-xs space-y-2">
                  <h3 className="font-extrabold text-[15px] text-slate-900">Booking Amount</h3>
                  <div className="flex justify-between items-center font-extrabold text-[18px] sm:text-[21px] text-[#132b5c] pt-2 border-t border-slate-100">
                    <span>Total Payable</span>
                    <span className="text-[#0866ed]">₹{partyPricing.finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment Options Card */}
                <div className="p-4 sm:p-5 rounded-2xl border border-[#dce4ef] bg-white shadow-xs space-y-3">
                  <h3 className="font-extrabold text-[15px] text-slate-900">Select Payment Method</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'card' as const, label: '💳 Credit / Debit Card' },
                      { id: 'upi' as const, label: '📱 UPI' },
                      { id: 'netbanking' as const, label: '🏦 Net Banking' },
                      { id: 'wallet' as const, label: '💰 Wallet' }
                    ].map(opt => (
                      <label 
                        key={opt.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === opt.id ? 'border-[#0866ed] bg-blue-50/50 font-bold text-[#0866ed]' : 'border-slate-200 hover:border-slate-300 bg-white font-medium text-slate-700'
                        }`}
                      >
                        <input 
                          type="radio"
                          name="partyPaymentMethod"
                          checked={paymentMethod === opt.id}
                          onChange={() => setPaymentMethod(opt.id)}
                          className="w-4 h-4 text-[#0866ed]"
                        />
                        <span className="text-[13.5px]">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terms Confirmation Card */}
                <div className="p-4 sm:p-5 rounded-2xl border border-[#dce4ef] bg-white shadow-xs space-y-3">
                  <h3 className="font-extrabold text-[15px] text-slate-900">Booking Confirmation</h3>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed">
                    Please confirm that all dates, meals, guest counts and menu selections are correct.
                  </p>
                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-[12.5px] text-slate-700 font-semibold cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={partyAgreeTerms}
                      onChange={(e) => setPartyAgreeTerms(e.target.checked)}
                      className="w-4 h-4 text-[#0866ed] rounded mt-0.5"
                    />
                    <span>I agree to the booking terms and cancellation policy.</span>
                  </label>
                </div>

                {/* Back & Pay Now Navigation */}
                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px]"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmitAndPay}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-[#0866ed] hover:bg-[#0652ba] disabled:bg-slate-300 text-white px-8 py-3 rounded-xl font-extrabold text-[14.5px] shadow-[0_4px_14px_rgba(8,102,232,0.35)] transition-all"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    <span>Pay Now →</span>
                  </button>
                </div>
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
                    Your requirement has been received with Reference ID: <strong className="text-[#0866ed]">{bookingRef}</strong>.
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
                  className="bg-[#0866ed] hover:bg-[#0652ba] text-white px-8 py-2.5 rounded-xl font-bold text-[14px] shadow-md transition-all"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ================= MENU SELECTION MODAL ================= */}
      {isMenuModalOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsMenuModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg max-h-[85vh] bg-white rounded-2xl shadow-2xl p-5 overflow-y-auto flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-[17px] font-extrabold text-slate-900">Select Menu Items</h3>
                <p className="text-[12px] text-slate-500">Select dishes for this meal.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1">
              {menuCatalog.map(food => {
                const isChecked = tempSelectedMenu.includes(food.name);
                return (
                  <label
                    key={food.name}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked ? 'border-[#0866ed] bg-blue-50/40' : 'border-[#e1e7ef] hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleMenuItemSelection(food.name)}
                      className="w-4 h-4 text-[#0866ed] rounded"
                    />
                    <img 
                      src={food.image} 
                      alt={food.name} 
                      className="w-12 h-12 rounded-lg object-cover shadow-2xs" 
                    />
                    <div>
                      <div className="font-extrabold text-[13.5px] text-slate-900">{food.name}</div>
                      <div className="text-[11.5px] text-slate-500 font-medium">{food.category}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            <button
              type="button"
              onClick={saveMenuModalItems}
              className="w-full bg-[#0866ed] hover:bg-[#0652ba] text-white py-2.5 rounded-xl font-bold text-[14px] shadow-sm transition-colors"
            >
              Save Menu ({tempSelectedMenu.length} Selected)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
