import React from 'react';
import Link from 'next/link';

export default function PackagePage({ params }: { params: { slug: string } }) {
  
  // Custom titles based on the slug
  const pageContent: Record<string, { title: string; subtitle: string }> = {
    'basic-package': {
      title: 'Basic Hiring Package',
      subtitle: 'Ideal for small cafes and quick hiring needs with standard support.'
    },
    'standard-package': {
      title: 'Standard Hiring Package',
      subtitle: 'Our recommended package for growing restaurants with extended replacement support.'
    },
    'premium-package': {
      title: 'Premium Hiring Package',
      subtitle: 'Comprehensive staffing solution with priority support and maximum replacement validity.'
    }
  };

  const content = pageContent[params.slug] || {
    title: 'Zomocook Packages',
    subtitle: 'Choose the right plan or proceed with the registration process seamlessly.'
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-2 bg-blue-100/50 border border-blue-200 text-blue-800 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-none-none mb-6">
           <span className="w-1.5 h-1.5 bg-blue-600 rounded-none-none animate-pulse"></span>
           Zomocook Premium
        </div>
        
        <h1 className="text-[36px] sm:text-[48px] font-black text-slate-900 leading-tight mb-5 tracking-tight">
          {content.title}
        </h1>
        
        <p className="text-slate-600 text-[16px] sm:text-[18px] font-medium leading-relaxed max-w-2xl mx-auto mb-10">
          {content.subtitle}
        </p>

        {/* Content Box */}
        <div className="bg-white rounded-none-none p-10 sm:p-16 border-2 border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
           <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 to-red-600"></div>
           
           <div className="w-20 h-20 bg-blue-50 rounded-none-none flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
           </div>
           
           <h3 className="text-[20px] font-bold text-slate-800 mb-2">Page Under Development</h3>
           <p className="text-slate-500 text-[14px]">
             We are building a highly customized experience for the <strong className="text-slate-800">{content.title}</strong> module.
           </p>

           <div className="mt-8 pt-8 border-t border-slate-100">
             <Link href="/" className="bg-[#004bb4] text-white font-bold py-3.5 px-8 rounded-none-none shadow-md hover:-translate-y-1 hover:shadow-lg transition-all">
                Go Back to Home
             </Link>
           </div>
        </div>

      </div>
    </main>
  );
}
