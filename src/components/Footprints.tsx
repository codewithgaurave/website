import React from 'react';

export default function Footprints() {
  const stats = [
    { value: "250+", label: "Cities" },
    { value: "2,580+", label: "Serving Restaurants" },
    { value: "12,500+", label: "Chefs Onboarded" },
    { value: "125,000+", label: "People Served" }
  ];

  // Exact coordinates matching the provided solid grey map layout
  const dots = [
    { top: '23%', left: '30%' }, // North (Punjab region)
    { top: '31%', left: '29%' }, // North Center (Delhi/Haryana)
    { top: '37%', left: '21%' }, // West (Rajasthan)
    { top: '36%', left: '40%' }, // Center (MP/UP border)
    { top: '48%', left: '33%' }, // Center-West (Maharashtra)
    { top: '47%', left: '52%' }, // East (Bengal/Odisha)
    { top: '38%', left: '72%' }, // Far East (Assam)
    { top: '74%', left: '26%' }, // South (Karnataka/Kerala)
  ];

  return (
    <section className="pt-8 pb-16 bg-slate-50 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight mb-8">
              Our Footprints
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-12">
              Zomocook extends its expertise in chef consultancy services to a wide array of establishments, including hotels, restaurants, cafes and individuals. We boast a cadre of highly experienced chefs adapt to catering to commercial and personal culinary needs, offering personalized home cooking and convenient food deliver services.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-3xl sm:text-[40px] font-black text-[#0f52ba] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[15px] font-bold text-slate-800">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Map */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto aspect-[4/5] flex items-center justify-center">
            
            {/* Extremely precise Map Image Structure using CSS Masking for exact grey color */}
            <div className="relative w-[340px] h-[380px] sm:w-[420px] sm:h-[480px]">
              {/* Perfectly Solid Smooth Grey Map using Mask-Image */}
              <div 
                className="absolute inset-0 bg-[#c4c6ca] pointer-events-none"
                style={{
                  maskImage: 'url(https://raw.githubusercontent.com/djaiss/mapsicon/master/all/in/vector.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(https://raw.githubusercontent.com/djaiss/mapsicon/master/all/in/vector.svg)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              ></div>
              
              {/* Floating Active Dots over the Map - Perfectly matched to User's Latest Image */}
              {dots.map((dot, index) => (
                <div 
                  key={index} 
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: dot.top, left: dot.left }}
                >
                  <div className="relative flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                    {/* Flat Solid Light Blue Dot with White Border casting shadow */}
                    <span className="relative inline-flex rounded-full h-[18px] w-[18px] bg-[#4285f4] border-[2px] border-white transition-transform hover:scale-125 duration-300 cursor-pointer"></span>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
