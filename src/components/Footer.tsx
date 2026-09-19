"use client";
import React from 'react';
import { Phone, Mail, MapPin, Play, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const presenceLinks = [
    "Cook in Lucknow", "Cook in Delhi", "Cook in Noida", "Cook in Ghaziabad", "Cook in Mumbai",
    "Cook in Hyderabad", "Cook in Kolkata", "Cook in Kanpur", "Cook in Agra", "Cook in Ayodhya",
    "Cook in Bengaluru", "Cook in Ludhiana", "Cook in Bhopal", "Cook in Gorakhpur", "Cook in Prayagraj", "Cook in Varanasi"
  ];

  const occasionLinks = [
    { name: "Chef for Birthday Party", href: "/services/chef-for-birthday-party" },
    { name: "Chef for House Party", href: "/services/chef-for-house-party" },
    { name: "Chef for Wedding Functions", href: "/services/chef-for-wedding-functions" },
    { name: "Chef for Corporate Event", href: "/services/chef-for-corporate-event" },
    { name: "Chef for Anniversary Party", href: "/services/chef-for-anniversary-party" },
    { name: "Chef for Kids Party", href: "/services/chef-for-kids-party" },
    { name: "Chef for Kitty Party", href: "/services/chef-for-kitty-party" },
    { name: "Chef for Bachelor Party", href: "/services/chef-for-bachelor-party" }
  ];

  const aboutLinks = [
    { name: "What We Do", href: "/about" },
    { name: "Blogs", href: "/" },
    { name: "Privacy Policy", href: "/" },
    { name: "Cancellation & Refunds", href: "/" },
    { name: "Complaints", href: "/contact" },
    { name: "Terms & Conditions", href: "/" },
    { name: "Contact us", href: "/contact" },
    { name: "How it works ?", href: "/" },
    { name: "Delete My Account", href: "/contact" }
  ];

  const chefLinks = [
    { name: "Join As Chef", href: "/experts" },
    { name: "Top Chefs", href: "/experts" },
    { name: "Code of Conduct", href: "/about" },
    { name: "Training Program", href: "/training" },
    { name: "Chef's Gallery", href: "/experts" },
    { name: "Find SRN (Staff Regi. Number)", href: "/experts" },
    { name: "Order Chef Kit", href: "/contact" }
  ];

  const serviceLinks = [
    { name: "Home Cook", href: "/services/hire-professional-chef-for-home" },
    { name: "Book for Occasion/Party", href: "/services/book-chef-on-birthday-party" },
    { name: "Book a Chef for Hotel/Restaurant", href: "/services/hire-chef-for-running-outlet" },
    { name: "List of Services", href: "/" },
    { name: "Packages", href: "/packages/pay-registration-charge" },
    { name: "Package Terms & Conditions", href: "/packages/pay-registration-charge" },
    { name: "Raise Replacement Request", href: "/contact" }
  ];

  const pathname = usePathname();
  if (pathname?.startsWith('/zomo-admin')) {
    return null;
  }

  return (
    <footer className="relative bg-[#020b18] text-slate-300 font-sans mt-auto overflow-hidden">
      
      {/* Top Banner (Locations & Occasions) */}
      <div className="border-b border-slate-800/80 bg-[#041225]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          
          <div className="mb-6 animate-fade-in-up">
            <h3 className="text-white font-bold text-[15px] mb-4 flex items-center gap-2">
               <span className="w-1 h-5 bg-[#1877f2] rounded-full"></span> Our Presence
            </h3>
            <div className="flex flex-wrap gap-2">
              {presenceLinks.map((cityString, i) => {
                const cityTarget = cityString.replace('Cook in ', '').toLowerCase();
                return (
                  <Link key={i} href={`/cook-in-${cityTarget.replace(/\s+/g, '-')}`} className="text-[13px] font-medium text-slate-400 bg-slate-800/40 border border-slate-700/50 hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-colors rounded-full px-4 py-1.5">
                    {cityString}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-white font-bold text-[15px] mb-4 flex items-center gap-2">
               <span className="w-1 h-5 bg-[#ef4444] rounded-full"></span> For Occasions
            </h3>
            <div className="flex flex-wrap gap-2">
              {occasionLinks.map((link, i) => (
                <Link key={i} href={link.href} className="text-[13px] font-medium text-slate-400 bg-slate-800/40 border border-slate-700/50 hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-colors rounded-full px-4 py-1.5">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Column 1: Brand & Contact (takes wider space on LG) */}
          <div className="lg:col-span-4 max-w-sm">
            <Link href="/" className="inline-block mb-4">
              <img 
                src="/logo.jpeg" 
                alt="Zomocook Logo" 
                className="h-[56px] w-auto object-contain rounded-xl shadow-lg border border-slate-800"
              />
            </Link>
            <p className="text-[14px] leading-relaxed text-slate-400 mb-8 font-medium">
              India's leading hospitality staffing and recruitment partner. Finding professional chefs, cooks, and specialized kitchen staff made easy and reliable.
            </p>
            
            <div className="space-y-4">
              <h4 className="text-white font-bold text-[15px] uppercase tracking-wider mb-2">Connect With Us</h4>
              <li className="flex items-start gap-4 text-[14px] group">
                <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-[#1877f2] group-hover:border-[#1877f2] transition-colors text-white">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="mt-1.5 font-medium">+91 951 980 8734</span>
              </li>
              <li className="flex items-start gap-4 text-[14px] group">
                <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-[#1877f2] group-hover:border-[#1877f2] transition-colors text-white">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="mt-1.5 font-medium hover:text-white transition-colors cursor-pointer">zomocookhelp@gmail.com</span>
              </li>
              <li className="flex items-start gap-4 text-[14px] group">
                <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-[#1877f2] group-hover:border-[#1877f2] transition-colors text-white">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="mt-1 font-medium leading-relaxed">Jankipuram, Lucknow,<br/>Uttar Pradesh, India</span>
              </li>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-[15px] mb-4 pb-2 border-b border-slate-800/80 inline-block">Company</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center text-[14px] font-medium hover:text-white transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#1877f2] transition-all duration-300 mr-1.5" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Chef & Services */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-white font-bold text-[15px] mb-4 pb-2 border-b border-slate-800/80 inline-block">For Chef & Cook</h3>
              <ul className="space-y-2">
                {chefLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="group flex items-center text-[13px] font-medium hover:text-white transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#1877f2] transition-all duration-300 mr-1.5" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: App Download & Services */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-[15px] mb-4 pb-2 border-b border-slate-800/80 inline-block">Our Services</h3>
            <ul className="space-y-2 mb-6">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center text-[13px] font-medium hover:text-white transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#1877f2] transition-all duration-300 mr-1.5" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Premium Glassmorphic App Box */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-4 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">For Quick Hiring</span>
                    <strong className="text-white font-black text-xs">Download App</strong>
                  </div>
                </div>
                
                <button className="w-full bg-white text-slate-900 flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:scale-[1.02] hover:bg-slate-50 transition-all font-bold text-xs">
                  <Play className="w-4 h-4 fill-current" />
                  Google Play
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Final Copyright Bar */}
      <div className="bg-white/5 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[13px] font-medium text-slate-500">
            Copyright &copy; {new Date().getFullYear()} <span className="text-slate-300 font-bold">Zomocook</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <Link href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877f2] hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162A4 4 0 1112 8a4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/></svg>
            </Link>
          </div>
        </div>

        <Link 
          href="https://wa.me/919519808734"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-6 bottom-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-none flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform cursor-pointer group"
        >
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-none border border-[#25D366] animate-ping opacity-75 group-hover:opacity-100"></span>
          <svg className="w-8 h-8 fill-current relative z-10" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.571c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
