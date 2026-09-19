"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Mail, UserRound, ChefHat, Utensils, Home, PartyPopper, ConciergeBell, Briefcase, Handshake, Verified, ChevronRight } from "lucide-react";

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
  
  // Custom state for Desktop hover to allow forced closing on navigation
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close all menus whenever the route changes
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Add shadow on scroll for a premium feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About Us", href: "/about", hasDropdown: true },
    { name: "Services", href: "#", hasDropdown: true },
    { name: "Packages", href: "/packages", hasDropdown: true },
    { name: "Training", href: "/training", hasDropdown: false },
  ];

  if (pathname?.startsWith('/zomo-admin')) {
    return null;
  }

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      {/* Top Bar - Classic Service Vibe */}
      <div className={`bg-slate-900 text-gray-300 py-2 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-6">
            <a href="tel:+919519808734" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 951 980 8734</span>
            </a>
            <a href="mailto:zomocookhelp@gmail.com" className="hidden sm:flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <span>zomocookhelp@gmail.com</span>
            </a>
          </div>
          {/* Login hidden for now based on user request */}
          <div className="flex items-center gap-4 hidden">
            <Link href="/login" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <UserRound className="w-4 h-4" />
              <span>Login / Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'shadow-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo area - Referencing uploaded image */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img src="/logo.jpeg" alt="Zomocook Logo" className="h-12 md:h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Menu - Classic Typography & Hover Effects */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative px-4 py-8 -my-8 flex items-center"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href={link.href}
                    className="flex items-center gap-1 text-[15px] font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-colors ${activeDropdown === link.name ? 'text-blue-700 rotate-180' : ''}`} />
                    )}
                  </Link>
                  {/* Classic underline animation */}
                  <span className={`absolute bottom-6 left-4 h-0.5 bg-blue-700 transition-all duration-300 ${activeDropdown === link.name ? 'w-[calc(100%-2rem)]' : 'w-0'}`}></span>

                  {/* Mega Menu Specifically for About Us */}
                  {link.name === "About Us" && (
                    <div className={`absolute top-[80px] left-1/2 -translate-x-[30%] mt-0 w-[600px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-none-none transition-all duration-300 flex overflow-hidden cursor-default border border-slate-100 z-50 ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                      
                      {/* Left Sidebar Links */}
                      <div className="w-[40%] py-8 px-8 bg-white flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-5 bg-[#3b82f6]"></div>
                          <h4 className="font-extrabold text-[15px] uppercase text-slate-900 tracking-wide">ABOUT US</h4>
                        </div>
                        <ul className="space-y-4 text-[14px] font-medium text-slate-700">
                          <li><Link href="/experts" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors block">Our Experts</Link></li>
                          <li><Link href="/partner" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors block">Join as Partner</Link></li>
                          <li><Link href="/about" onClick={() => setActiveDropdown(null)} className="text-blue-500 font-semibold block">About Company</Link></li>
                          <li><Link href="/agent" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors block">Join As Agent</Link></li>
                        </ul>
                      </div>

                      {/* Right Promo Banner */}
                      <div className="w-[60%] bg-[#024a9d] p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                          Hire A Cook! In Just Few Clicks...
                        </h3>
                        <p className="text-blue-100/90 text-[13px] mb-6 font-medium tracking-wide">
                          Trained | Trusted | Verified
                        </p>
                        <Link href="/contact" onClick={() => setActiveDropdown(null)} className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-none-none text-sm w-fit hover:bg-slate-100 transition-transform hover:scale-105 shadow-sm block text-center">
                          Hire Now!
                        </Link>
                      </div>

                    </div>
                  )}

                  {/* Mega Menu Specifically for Services */}
                  {link.name === "Services" && (
                    <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 mt-0 w-[960px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-none-none transition-all duration-300 overflow-hidden border border-slate-200 z-50 cursor-default ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                      <div className="p-6">
                        <div className="columns-1 md:columns-3 lg:columns-4 gap-6 space-y-6">
                          {servicesData.map((category, idx) => (
                             <div key={idx} className="break-inside-avoid">
                               <div className="flex items-center gap-2 mb-3">
                                 <div className="w-1.5 h-3.5 bg-[#024a9d]"></div>
                                 <h4 className="font-extrabold text-[11px] uppercase text-slate-900 tracking-wide">
                                   {category.title}
                                 </h4>
                               </div>
                               <ul className="space-y-1.5">
                                 {category.items.map((item, itemIdx) => (
                                   <li key={itemIdx} className="flex flex-wrap items-center gap-1.5 hidden:max-w-full">
                                     <Link 
                                       href={`/services/${item.name.toLowerCase().replace(/[\s/]+/g, '-')}`} 
                                       onClick={() => setActiveDropdown(null)}
                                       className="text-[12px] font-medium text-slate-700 hover:text-[#024a9d] transition-colors leading-snug break-words max-w-full block"
                                     >
                                       {item.name}
                                     </Link>
                                     {item.badge && (
                                       <span className="bg-[#db2777] text-white px-1 py-0.5 rounded-none text-[8px] font-bold uppercase tracking-wider shadow-sm mt-0.5 shrink-0">
                                         {item.badge}
                                       </span>
                                     )}
                                   </li>
                                 ))}
                               </ul>
                             </div>
                          ))}
                        </div>
                        
                        {/* Global CTA in Dropdown */}
                        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                           <div className="text-[#024a9d] font-bold text-sm tracking-wide">Trained ! Trusted ! Verified</div>
                           <Link href="/contact" onClick={() => setActiveDropdown(null)} className="bg-[#1a73e8] hover:bg-blue-600 font-sans text-white text-[15px] font-medium py-2 px-6 rounded-none transition-colors shadow-sm">
                             Hire Now
                           </Link>
                        </div>
                     </div>
                    </div>
                  )}

                  {/* Mega Menu Specifically for Packages */}
                  {link.name === "Packages" && (
                    <div className={`absolute top-[80px] left-1/2 -translate-x-[30%] mt-0 w-[600px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-none-none transition-all duration-300 flex overflow-hidden cursor-default border border-slate-100 z-50 ${activeDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                      
                      {/* Left Sidebar Links */}
                      <div className="w-[45%] py-8 px-6 bg-white flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1 h-4 bg-[#024a9d]"></div>
                          <h4 className="font-extrabold text-[10px] uppercase text-slate-900 tracking-wider">CHOOSE HIGHER FOR HIGHER BENEFITS</h4>
                        </div>
                        <ul className="space-y-3.5 text-[14px] font-medium text-slate-700 mb-8">
                          <li><Link href="/packages/basic-package" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors block">Basic Package</Link></li>
                          <li>
                            <Link href="/packages/standard-package" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors flex items-center gap-2">
                              Standard Package 
                              <span className="bg-[#db2777] text-white px-1.5 py-0.5 rounded-none text-[8px] font-bold uppercase tracking-wider">Recommended</span>
                            </Link>
                          </li>
                          <li><Link href="/packages/premium-package" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors block">Premium Package</Link></li>
                        </ul>

                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1 h-4 bg-[#024a9d]"></div>
                          <h4 className="font-extrabold text-[10px] uppercase text-slate-900 tracking-wider">REGISTRATION PROCESS</h4>
                        </div>
                        <ul className="space-y-3.5 text-[14px] font-medium text-slate-700">
                          <li><Link href="/packages/pay-registration-charge" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors block">Pay Registration Charge</Link></li>
                          <li><Link href="/packages/book-a-trial" onClick={() => setActiveDropdown(null)} className="hover:text-blue-600 transition-colors block">Book a Trial</Link></li>
                        </ul>
                      </div>

                      {/* Right Promo Banner */}
                      <div className="w-[55%] bg-[#024a9d] p-8 flex flex-col justify-center">
                        <h3 className="text-[26px] font-extrabold text-white mb-2 leading-tight">
                          Hire A Cook! In Just Few Clicks...
                        </h3>
                        <p className="text-blue-100/90 text-[13px] mb-6 font-medium tracking-wide">
                          Trained | Trusted | Verified
                        </p>
                        <Link href="/contact" onClick={() => setActiveDropdown(null)} className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-none-none text-sm w-fit hover:bg-slate-100 transition-transform hover:scale-105 shadow-sm block text-center">
                          Hire Now!
                        </Link>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <div className="bg-black hover:bg-slate-800 text-white cursor-pointer px-6 py-2.5 rounded-none-none flex items-center gap-3 transition-transform hover:scale-105 shadow-md">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" 
                  alt="Play Store"
                  className="w-5 h-5"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase leading-none opacity-80">Get it on</span>
                  <span className="text-sm font-bold leading-none mt-0.5">Google Play</span>
                </div>
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  if (isOpen) setOpenDropdown(null);
                }}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 bg-slate-50 rounded-none-none border border-slate-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden transition-all duration-500 overflow-y-auto ${isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'}`}>
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
                  className="block px-4 py-3 rounded-none-none text-base font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50 transition-colors flex justify-between items-center"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                
                {/* Mobile Submenu for About Us */}
                {link.name === "About Us" && openDropdown === "About Us" && (
                  <div className="pl-6 space-y-1 mt-1 border-l-2 border-red-100 ml-4 overflow-hidden">
                    <Link href="/experts" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block px-4 py-2.5 rounded-none-none text-sm font-semibold text-slate-600 hover:text-[#024a9d] hover:bg-blue-50 transition-colors">Our Experts</Link>
                    <Link href="/partner" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block px-4 py-2.5 rounded-none-none text-sm font-semibold text-slate-600 hover:text-[#024a9d] hover:bg-blue-50 transition-colors">Join as Partner</Link>
                    <Link href="/about" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block px-4 py-2.5 rounded-none-none text-sm font-semibold text-[#024a9d] hover:bg-blue-50 transition-colors">About Company</Link>
                    <Link href="/agent" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block px-4 py-2.5 rounded-none-none text-sm font-semibold text-slate-600 hover:text-[#024a9d] hover:bg-blue-50 transition-colors">Join As Agent</Link>
                  </div>
                )}
                
                {/* Mobile Submenu for Services (Massive Tree) */}
                {link.name === "Services" && openDropdown === "Services" && (
                  <div className="pl-6 space-y-5 mt-3 border-l-2 border-blue-100 ml-4 mb-4 overflow-hidden">
                    {servicesData.map((category, idx) => (
                      <div key={idx}>
                         <div className="flex items-center gap-2 mb-2.5">
                           <div className="w-1 h-3.5 bg-[#024a9d] rounded-none-none shrink-0"></div>
                           <h4 className="font-extrabold text-[12px] uppercase text-slate-800 tracking-wider">
                             {category.title}
                           </h4>
                         </div>
                         <ul className="space-y-3 pl-3">
                           {category.items.map((item, itemIdx) => (
                             <li key={itemIdx} className="flex flex-col">
                               <Link 
                                 href={`/services/${item.name.toLowerCase().replace(/[\s/]+/g, '-')}`} 
                                 onClick={() => { setIsOpen(false); setOpenDropdown(null); }}
                                 className="text-[13px] font-medium text-slate-600 hover:text-[#024a9d] transition-colors leading-tight block"
                               >
                                 {item.name}
                               </Link>
                               {item.badge && (
                                 <span className="inline-flex items-center px-1.5 py-0.5 mt-1 rounded-none bg-[#db2777] text-white text-[8px] font-extrabold uppercase tracking-widest w-max ring-1 ring-inset ring-pink-500/20 shadow-sm">
                                   {item.badge}
                                 </span>
                               )}
                             </li>
                           ))}
                         </ul>
                      </div>
                    ))}
                    
                    {/* Mobile Global CTA */}
                    <div className="mt-5 pt-4 border-t border-blue-100 pr-4">
                       <div className="text-center font-bold text-[#024a9d] text-xs mb-3 tracking-wide">Trained ! Trusted ! Verified</div>
                       <Link href="/contact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#1a73e8] hover:bg-blue-600 text-white font-sans text-sm font-medium py-2.5 rounded-none shadow-sm transition-colors">
                         Hire Now
                       </Link>
                     </div>
                  </div>
                )}
                
                {/* Mobile Submenu for Packages */}
                {link.name === "Packages" && openDropdown === "Packages" && (
                  <div className="pl-6 space-y-4 mt-3 border-l-2 border-slate-100 ml-4 mb-2 overflow-hidden">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-3.5 bg-[#024a9d]"></div>
                        <h4 className="font-extrabold text-[10px] uppercase text-slate-500 tracking-wider">CHOOSE HIGHER FOR HIGHER BENEFITS</h4>
                      </div>
                      <ul className="space-y-1 pl-3">
                        <li><Link href="/packages/basic-package" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block py-1.5 text-[13px] font-medium text-slate-600 hover:text-blue-600">Basic Package</Link></li>
                        <li>
                          <Link href="/packages/standard-package" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="flex items-center gap-2 py-1.5 text-[13px] font-medium text-slate-600 hover:text-blue-600">
                            Standard Package
                            <span className="bg-[#db2777] text-white px-1.5 py-0.5 rounded-none text-[8px] font-bold uppercase">Recommended</span>
                          </Link>
                        </li>
                        <li><Link href="/packages/premium-package" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block py-1.5 text-[13px] font-medium text-slate-600 hover:text-blue-600">Premium Package</Link></li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-3.5 bg-[#024a9d]"></div>
                        <h4 className="font-extrabold text-[10px] uppercase text-slate-500 tracking-wider">REGISTRATION PROCESS</h4>
                      </div>
                      <ul className="space-y-1 pl-3">
                        <li><Link href="/packages/pay-registration-charge" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block py-1.5 text-[13px] font-medium text-slate-600 hover:text-blue-600">Pay Registration Charge</Link></li>
                        <li><Link href="/packages/book-a-trial" onClick={() => { setIsOpen(false); setOpenDropdown(null); }} className="block py-1.5 text-[13px] font-medium text-slate-600 hover:text-blue-600">Book a Trial</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 px-4 pt-4 border-t border-slate-100">
              <button className="w-full bg-black text-white px-5 py-3 rounded-none-none flex items-center justify-center gap-3 shadow-md">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" 
                  alt="Play Store"
                  className="w-5 h-5"
                />
                <div className="flex flex-col text-left font-sans">
                  <span className="text-[10px] uppercase leading-none opacity-80">Get it on</span>
                  <span className="text-sm font-bold leading-none mt-0.5">Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
