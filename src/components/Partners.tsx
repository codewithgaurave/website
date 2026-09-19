import React from 'react';

export default function Partners() {
  const partners = [
    {
      id: 1,
      name: "Swiggy",
      colors: "text-[#fc8019]",
      fakeLogo: (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-[#fc8019] flex items-center justify-center -skew-x-[12deg]">
            <div className="w-3 h-3 bg-white rounded-full translate-x-1"></div>
          </div>
          <span className="font-bold text-[22px] tracking-tight text-[#fc8019]">Swiggy</span>
        </div>
      )
    },
    {
      id: 2,
      name: "Zomato",
      colors: "text-[#e23744]",
      fakeLogo: (
        <span className="font-extrabold italic text-3xl tracking-tighter text-[#e23744]">zomato</span>
      )
    },
    {
      id: 3,
      name: "Zorko",
      colors: "text-orange-500",
      fakeLogo: (
        <div className="flex flex-col items-center leading-none">
          <span className="font-black text-2xl tracking-tighter text-[#f7941d]">ZORKO</span>
          <span className="text-[8px] font-bold text-[#00a3e0] uppercase tracking-widest mt-1">Brand of Food Lovers</span>
        </div>
      )
    },
    {
      id: 4,
      name: "Barbeque Nation",
      colors: "text-orange-600",
      fakeLogo: (
        <div className="flex flex-col items-center">
          <div className="text-orange-600 text-xs font-black">BN</div>
          <span className="font-black text-sm uppercase text-[#e45d25] tracking-widest border-t border-b border-[#e45d25] p-0.5 mt-1">Barbeque</span>
          <span className="font-medium text-[8px] tracking-widest text-[#e45d25]">NATION</span>
        </div>
      )
    },
    {
      id: 5,
      name: "Chai Sutta",
      colors: "text-amber-800",
      fakeLogo: (
        <div className="flex flex-col items-center opacity-80">
          <span className="font-black text-[12px] text-green-700 tracking-tighter leading-none mb-0.5">CHAI</span>
          <span className="font-black text-[12px] text-green-700 tracking-tighter leading-none">SUTTA</span>
          <div className="w-10 h-[10px] border-b-[8px] border-[#653b1b] rounded-b-full mt-1"></div>
          <div className="w-12 h-1 bg-amber-600 rounded-full mt-0.5"></div>
        </div>
      )
    },
    {
      id: 6,
      name: "Bikaner",
      colors: "text-red-700",
      fakeLogo: (
        <div className="w-14 h-14 bg-[#d01c28] rounded-full flex flex-col items-center justify-center border-2 border-yellow-400">
          <span className="text-yellow-400 font-bold text-[11px] uppercase tracking-tight">Bikaner</span>
          <span className="text-white text-[6px]">express</span>
        </div>
      )
    }
  ];

  return (
    <section className="pt-12 pb-8 bg-white relative overflow-hidden">
      
      {/* Very faint background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[200px] bg-slate-100/50 blur-[80px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-6">
            Supporting Partners
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-8 max-w-2xl mx-auto">
            Trusted by leading hospitality brands, restaurants and food businesses across India.
          </p>
          <div className="w-24 h-1.5 rounded-full mx-auto bg-gradient-to-r from-[#024a9d] to-[#d62423]"></div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="bg-white border border-slate-100 rounded-2xl h-28 sm:h-32 flex items-center justify-center p-4 shadow-[0_4px_15px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 filter hover:grayscale-0 grayscale-[20%] group"
            >
              <div className="transform transition-transform duration-500 group-hover:scale-105">
                {partner.fakeLogo}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
