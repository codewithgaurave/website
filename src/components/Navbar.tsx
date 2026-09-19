"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ChevronDown, Phone, Mail, UserRound, 
  ChefHat, Utensils, Home, PartyPopper, ConciergeBell, 
  Briefcase, Handshake, Verified, MapPin, Clock, Search,
  ArrowRight, User
} from "lucide-react";
import HotelStaffHiringModal from "@/components/modals/HotelStaffHiringModal";

// Massive Services Data Array for Megamenu
const servicesData = [
  {
    title: "Hire Chef For Restaurant",
    icon: <ChefHat className="w-4 h-4" />,
    items: [
      { name: "Hire Chef For New Opening", badge: "Trusted" },
      { name: "Hire Chef For Running Outlet" },
      { name: "Hire Executive Chef" },
      { name: "Hire CDP/DCDP" },
      { name: "Hire Commi's Staff for Hotel/Restaurant" },
      { name: "Hire Waiter For Hotel/Restaurant" },
      { name: "Hire Restaurant Manager" },
      { name: "Hire Housekeeping For Hotel" },
      { name: "Hire Female Captain For Hotel" },
      { name: "Hire Female Waiter For Hotel" },
      { name: "Hire Female Restaurant Manager" }
    ]
  },
  {
    title: "Hire Cook For Canteen/Mess",
    icon: <Utensils className="w-4 h-4" />,
    items: [
      { name: "Hire All Rounder cook for canteen" },
      { name: "Hire Female Cook For Hostel/PG" },
      { name: "Hire Professional Chef For Canteen" },
      { name: "Hire Team For Corporate Canteen" }
    ]
  },
  {
    title: "Domestic House Help Service",
    icon: <Home className="w-4 h-4" />,
    items: [
      { name: "Hire Male Cook For 12/24 Hours", badge: "Verified" },
      { name: "Hire Female Cook For 12/24 Hours" },
      { name: "Hire Professional Chef For Home" },
      { name: "Hire Cook for Daily Basis" }
    ]
  },
  {
    title: "Private Chef Service",
    icon: <PartyPopper className="w-4 h-4" />,
    items: [
      { name: "Book Chef On Birthday Party", badge: "Trending" },
      { name: "Book Chef On Cultural Events" },
      { name: "Book Chef On Kitty Party" },
      { name: "Book Waiter On Occasion" },
      { name: "Book Chef on Family Get Together" },
      { name: "Book Chef on Marriage Anniversary" }
    ]
  },
  {
    title: "Category Wise Cook",
    icon: <ConciergeBell className="w-4 h-4" />,
    items: [
      { name: "Hire North Indian Chef" },
      { name: "Hire Chinese chef" },
      { name: "Hire Tandoor Chef" },
      { name: "Hire Continental Chef" },
      { name: "Hire South Indian Chef" }
    ]
  },
  {
    title: "Manpower Services",
    icon: <Briefcase className="w-4 h-4" />,
    items: [
      { name: "Hire Kitchen Team For Hotel" },
      { name: "Hire Cook on Agreement Basis" },
      { name: "Hotel Chefs/Waiter Provider" },
      { name: "Cook for 1 Years Contract" },
      { name: "Top Cook on Rent in India" },
      { name: "Hire Cook for Catering/Events Service" }
    ]
  },
  {
    title: "Placement Consultancy Services",
    icon: <Handshake className="w-4 h-4" />,
    items: [
      { name: "Restaurant Cook Service" },
      { name: "Chinese Cook Service" },
      { name: "Nepali Chinese Chef" },
      { name: "Fast Food Cook service" }
    ]
  },
  {
    title: "Other Services",
    icon: <Verified className="w-4 h-4" />,
    items: [
      { name: "Apply for FSSAI", badge: "Premium" },
      { name: "Swiggy/Zomato Registration" },
      { name: "Menu designing" },
      { name: "Kitchen Setup" },
      { name: "Digital Support" }
    ]
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
    setOpenDropdown(null);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About Us", href: "/about", hasDropdown: true },
    { name: "Services", href: "#", hasDropdown: true },
    { name: "Packages", href: "/packages", hasDropdown: true },
    { name: "Training", href: "/training", hasDropdown: true },
    { name: "For Job Seekers", href: "/partner", hasDropdown: true },
    { name: "Contact Us", href: "/contact", hasDropdown: false },
  ];

  if (pathname?.startsWith('/zomo-admin')) {
    return null;
  }

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      {/* ================= 1. Top Bar (Dark Navy) ================= */}
      <div className="bg-[#001529] text-white py-2 text-[12px] font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
          
          {/* Left Info: PAN India & Timing */}
          <div className="flex items-center gap-3 text-slate-300">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-slate-300" />
              <span>PAN India Service</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span>Mon - Sat (9:00 AM - 7:00 PM)</span>
            </div>
          </div>

          {/* Right Info: Phone, Email, Socials & Download App */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Phone & Email */}
            <div className="hidden md:flex items-center gap-3 text-slate-300">
              <a href="tel:+919519808734" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 951 980 8734</span>
              </a>
              <a href="mailto:zomocookhelp@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>zomocookhelp@gmail.com</span>
              </a>
            </div>

            <span className="hidden md:inline text-slate-600">|</span>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-1.5">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/919519808734" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full border border-slate-600 hover:border-white flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.077-2.073-.497-1.745-.726-2.859-2.5-2.946-2.616-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.073.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full border border-slate-600 hover:border-white flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3 h-3 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full border border-slate-600 hover:border-white flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.593 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full border border-slate-600 hover:border-white flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full border border-slate-600 hover:border-white flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Download App Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=digi.coders.zomocook&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 text-[#001529] font-bold px-3 py-1 rounded-lg text-[11.5px] flex items-center gap-1.5 shadow-sm transition-all transform hover:scale-105"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" 
                alt="Play Store" 
                className="w-3.5 h-3.5"
              />
              <span>Download App</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================= 2. Main Navbar (White) ================= */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-2.5' : 'shadow-xs py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo area */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2.5 group">
                <img 
                  src="/logo.jpeg" 
                  alt="ZomoCook Logo" 
                  className="h-10 sm:h-12 w-auto object-contain rounded-lg" 
                />
                <div className="hidden sm:flex flex-col">
                  <div className="flex items-center">
                    <span className="text-[20px] font-black text-[#001529] tracking-tight">ZOMO</span>
                    <span className="text-[20px] font-black text-[#d62423] tracking-tight">COOK</span>
                    <span className="text-[10px] font-bold text-slate-400 ml-0.5 align-super">TM</span>
                  </div>
                  <span className="text-[9px] font-semibold text-slate-500 -mt-1 tracking-tight">
                    Chefs | Staff | Training | Hospitality Solutions
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-0.5">
              {navLinks.map((link) => {
                const isActive = (link.href === '/' && pathname === '/') || (link.href !== '/' && link.href !== '#' && pathname.startsWith(link.href));
                return (
                  <div 
                    key={link.name} 
                    className="relative px-3.5 py-4 -my-4 flex items-center"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      href={link.href}
                      className={`flex items-center gap-1 text-[14.5px] font-bold transition-colors ${
                        isActive 
                          ? 'text-[#d62423]' 
                          : 'text-[#0f2441] hover:text-[#d62423]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.hasDropdown && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === link.name ? 'rotate-180 text-[#d62423]' : 'text-slate-400'
                        }`} />
                      )}
                    </Link>

                    {/* Active Red Indicator Bar */}
                    {isActive && (
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-[3px] bg-[#d62423] rounded-full"></span>
                    )}

                    {/* Mega Menu: About Us */}
                    {link.name === "About Us" && (
                      <div className={`absolute top-[48px] left-1/2 -translate-x-[30%] mt-0 w-[580px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl transition-all duration-200 flex overflow-hidden border border-slate-100 z-50 ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                        <div className="w-[45%] py-6 px-6 bg-white flex flex-col">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-4 bg-[#024a9d]"></div>
                            <h4 className="font-extrabold text-[13px] uppercase text-slate-900 tracking-wide">ABOUT US</h4>
                          </div>
                          <ul className="space-y-3 text-[13.5px] font-semibold text-slate-700">
                            <li><Link href="/experts" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block">Our Experts</Link></li>
                            <li><Link href="/partner" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block">Join as Partner</Link></li>
                            <li><Link href="/about" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block">About Company</Link></li>
                            <li><Link href="/agent" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block">Join As Agent</Link></li>
                          </ul>
                        </div>
                        <div className="w-[55%] bg-gradient-to-br from-[#001529] to-[#024a9d] p-6 flex flex-col justify-center text-white">
                          <h3 className="text-[20px] font-extrabold leading-tight mb-2">
                            Hire A Cook! In Just Few Clicks...
                          </h3>
                          <p className="text-blue-100 text-[12px] mb-4 font-medium">
                            Trained | Trusted | Verified
                          </p>
                          <button 
                            onClick={() => { setActiveDropdown(null); setIsHireModalOpen(true); }}
                            className="bg-[#d62423] hover:bg-[#b81d1c] text-white font-bold px-5 py-2 rounded-xl text-[13px] w-fit shadow-md transition-transform hover:scale-105"
                          >
                            Hire Now!
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Mega Menu: Services */}
                    {link.name === "Services" && (
                      <div className={`absolute top-[48px] left-1/2 -translate-x-1/2 mt-0 w-[960px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl transition-all duration-200 overflow-hidden border border-slate-100 z-50 ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                        <div className="p-6">
                          <div className="columns-1 md:columns-3 lg:columns-4 gap-6 space-y-5">
                            {servicesData.map((category, idx) => (
                              <div key={idx} className="break-inside-avoid">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-1 h-3.5 bg-[#d62423]"></div>
                                  <h4 className="font-extrabold text-[11px] uppercase text-slate-900 tracking-wider">
                                    {category.title}
                                  </h4>
                                </div>
                                <ul className="space-y-1.5">
                                  {category.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-center gap-1.5">
                                      <Link 
                                        href={`/services/${item.name.toLowerCase().replace(/[\s/]+/g, '-')}`} 
                                        onClick={() => setActiveDropdown(null)}
                                        className="text-[12px] font-medium text-slate-600 hover:text-[#d62423] transition-colors leading-snug"
                                      >
                                        {item.name}
                                      </Link>
                                      {item.badge && (
                                        <span className="bg-[#d62423] text-white px-1 py-0.2 rounded text-[8px] font-extrabold uppercase tracking-wider">
                                          {item.badge}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          
                          {/* Bottom CTA */}
                          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-[#001529] font-black text-[13px] tracking-wide">
                              Trained ! Trusted ! Verified
                            </div>
                            <button 
                              onClick={() => { setActiveDropdown(null); setIsHireModalOpen(true); }} 
                              className="bg-[#d62423] hover:bg-[#b81d1c] text-white text-[13px] font-bold py-2 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
                            >
                              Hire Staff Now
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mega Menu: Packages */}
                    {link.name === "Packages" && (
                      <div className={`absolute top-[48px] left-1/2 -translate-x-[30%] mt-0 w-[580px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl transition-all duration-200 flex overflow-hidden border border-slate-100 z-50 ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                        <div className="w-[50%] py-6 px-6 bg-white flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-3.5 bg-[#001529]"></div>
                            <h4 className="font-extrabold text-[10.5px] uppercase text-slate-800 tracking-wider">CHOOSE PACKAGE</h4>
                          </div>
                          <ul className="space-y-2.5 text-[13px] font-medium text-slate-700 mb-5">
                            <li><Link href="/packages/basic-package" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block font-semibold">Basic Package</Link></li>
                            <li>
                              <Link href="/packages/standard-package" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors flex items-center gap-1.5 font-semibold">
                                Standard Package 
                                <span className="bg-[#d62423] text-white px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase">Top</span>
                              </Link>
                            </li>
                            <li><Link href="/packages/premium-package" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block font-semibold">Premium Package</Link></li>
                          </ul>

                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-3.5 bg-[#001529]"></div>
                            <h4 className="font-extrabold text-[10.5px] uppercase text-slate-800 tracking-wider">REGISTRATION</h4>
                          </div>
                          <ul className="space-y-2 text-[13px] font-medium text-slate-700">
                            <li><Link href="/packages/pay-registration-charge" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block">Pay Registration Charge</Link></li>
                            <li><Link href="/packages/book-a-trial" onClick={() => setActiveDropdown(null)} className="hover:text-[#d62423] transition-colors block">Book a Trial</Link></li>
                          </ul>
                        </div>
                        <div className="w-[50%] bg-[#001529] p-6 flex flex-col justify-center text-white">
                          <h3 className="text-[20px] font-black leading-tight mb-2">
                            Hire A Cook! In Just Few Clicks...
                          </h3>
                          <p className="text-blue-100 text-[12px] mb-4 font-medium">
                            Trained | Trusted | Verified
                          </p>
                          <button 
                            onClick={() => { setActiveDropdown(null); setIsHireModalOpen(true); }}
                            className="bg-[#d62423] hover:bg-[#b81d1c] text-white font-bold px-5 py-2 rounded-xl text-[13px] w-fit shadow-md transition-transform hover:scale-105"
                          >
                            Hire Now!
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Menu: Training */}
                    {link.name === "Training" && (
                      <div className={`absolute top-[48px] left-1/2 -translate-x-1/2 mt-0 w-[240px] bg-white shadow-xl rounded-xl transition-all duration-200 p-3 border border-slate-100 z-50 ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                        <ul className="space-y-1 text-[13px] font-semibold text-slate-700">
                          <li><Link href="/training" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#d62423] transition-colors">All Training Programs</Link></li>
                          <li><Link href="/training/hotel-chef-training" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#d62423] transition-colors">Hotel Chef Training</Link></li>
                          <li><Link href="/training/fast-food-training" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#d62423] transition-colors">Fast Food & QSR Training</Link></li>
                        </ul>
                      </div>
                    )}

                    {/* Menu: For Job Seekers */}
                    {link.name === "For Job Seekers" && (
                      <div className={`absolute top-[48px] left-1/2 -translate-x-1/2 mt-0 w-[240px] bg-white shadow-xl rounded-xl transition-all duration-200 p-3 border border-slate-100 z-50 ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                        <ul className="space-y-1 text-[13px] font-semibold text-slate-700">
                          <li><Link href="/partner" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#d62423] transition-colors">Join as Chef Partner</Link></li>
                          <li><Link href="/agent" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#d62423] transition-colors">Join as Agent</Link></li>
                          <li><Link href="/contact" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#d62423] transition-colors">Job Openings</Link></li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#001529] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Hire Staff Now Button */}
              <button
                type="button"
                onClick={() => setIsHireModalOpen(true)}
                className="bg-[#d62423] hover:bg-[#b81d1c] text-white px-5 py-2.5 rounded-full font-extrabold text-[14px] flex items-center gap-2 shadow-[0_4px_14px_rgba(214,36,35,0.35)] transition-all transform hover:scale-105 cursor-pointer"
              >
                <User className="w-4 h-4 fill-white" />
                <span>Hire Staff Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsHireModalOpen(true)}
                className="bg-[#d62423] text-white px-3 py-1.5 rounded-full font-bold text-[12px] flex items-center gap-1 shadow-sm"
              >
                <span>Hire</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  if (isOpen) setOpenDropdown(null);
                }}
                className="text-slate-700 hover:text-slate-900 p-2 bg-slate-100 rounded-xl"
                aria-label="Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Quick Search Overlay Bar */}
          {isSearchOpen && (
            <div className="mt-3 p-2 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in duration-150">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/services?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-400 ml-2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chefs, cooks, waiters, restaurant managers, packages..." 
                  className="flex-1 bg-transparent text-[13.5px] font-medium outline-none text-slate-800 placeholder-slate-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#001529] hover:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-[12.5px] font-bold"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden transition-all duration-300 overflow-y-auto ${isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-4 bg-white border-t border-slate-100 shadow-xl space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (link.hasDropdown) {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === link.name ? null : link.name);
                    } else {
                      setIsOpen(false);
                      setOpenDropdown(null);
                    }
                  }}
                  className="block px-4 py-2.5 rounded-xl text-[14.5px] font-bold text-slate-700 hover:text-[#d62423] hover:bg-red-50 transition-colors flex justify-between items-center"
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                
                {/* Mobile Submenu for Services */}
                {link.name === "Services" && openDropdown === "Services" && (
                  <div className="pl-4 space-y-3 mt-2 border-l-2 border-red-100 ml-4 mb-3 overflow-hidden">
                    {servicesData.slice(0, 4).map((category, idx) => (
                      <div key={idx}>
                        <h4 className="font-extrabold text-[11px] uppercase text-[#001529] mb-1">
                          {category.title}
                        </h4>
                        <ul className="space-y-1.5 pl-2">
                          {category.items.slice(0, 4).map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link 
                                href={`/services/${item.name.toLowerCase().replace(/[\s/]+/g, '-')}`} 
                                onClick={() => { setIsOpen(false); setOpenDropdown(null); }}
                                className="text-[12.5px] font-medium text-slate-600 hover:text-[#d62423] block"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile Submenu for Packages */}
                {link.name === "Packages" && openDropdown === "Packages" && (
                  <div className="pl-4 space-y-2 mt-2 border-l-2 border-red-100 ml-4 mb-2 text-[13px] font-medium text-slate-600">
                    <Link href="/packages/basic-package" onClick={() => { setIsOpen(false); }} className="block py-1">Basic Package</Link>
                    <Link href="/packages/standard-package" onClick={() => { setIsOpen(false); }} className="block py-1">Standard Package</Link>
                    <Link href="/packages/premium-package" onClick={() => { setIsOpen(false); }} className="block py-1">Premium Package</Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Hotel / Staff Hiring Modal Triggered by Hire Staff Now */}
      <HotelStaffHiringModal 
        isOpen={isHireModalOpen} 
        onClose={() => setIsHireModalOpen(false)} 
      />
    </header>
  );
}
