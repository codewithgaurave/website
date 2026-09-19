import React from 'react';
import { Star } from 'lucide-react';

export default function TopChefs() {
  const chefs = [
    {
      id: 1,
      name: "Sanjay Singh",
      initials: "SS",
      avatarBg: "bg-blue-100 text-blue-700",
      rating: 5,
      experience: "8+ Years",
      specialty: "Indian, Chinese"
    },
    {
      id: 2,
      name: "Himanshu",
      initials: "H",
      avatarBg: "bg-orange-100 text-orange-700",
      rating: 5,
      experience: "6+ Years",
      specialty: "Chinese"
    },
    {
      id: 3,
      name: "Satyam Pandey",
      initials: "SP",
      avatarBg: "bg-emerald-100 text-emerald-700",
      rating: 4.5,
      experience: "15+ Year",
      specialty: "Multi cuisine"
    },
    {
      id: 4,
      name: "Mohit Kumar",
      initials: "MK",
      avatarBg: "bg-purple-100 text-purple-700",
      rating: 4.5,
      experience: "10+ Year",
      specialty: "Multi cuisine"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-6">
            Our Top Rated Chefs
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
            Experience culinary perfection with our top-rated chefs, crafting exquisite dishes that redefine taste and delight the senses.
          </p>
          <div className="w-24 h-1.5 rounded-full mx-auto bg-gradient-to-r from-[#024a9d] to-[#d62423]"></div>
        </div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {chefs.map((chef) => (
            <div 
              key={chef.id} 
              className="flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300 group cursor-pointer border border-transparent hover:border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              
              {/* Avatar Placeholder matching exactly the circular image look */}
              <div className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-black text-2xl sm:text-3xl shadow-inner ${chef.avatarBg} group-hover:scale-105 transition-transform duration-300 ring-4 ring-white`}>
                {chef.initials}
              </div>
              
              {/* Content */}
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-1 leading-tight group-hover:text-blue-700 transition-colors">
                  {chef.name}
                </h3>
                
                {/* Green Stars Row */}
                <div className="flex items-center gap-[2px] mb-2">
                  {[...Array(5)].map((_, i) => {
                    const isFull = i + 1 <= Math.floor(chef.rating);
                    const isHalf = !isFull && i < chef.rating;
                    return (
                      <div key={i} className="relative w-4 h-4">
                        <Star className="absolute w-4 h-4 text-slate-200 fill-slate-200" />
                        {(isFull || isHalf) && (
                          <div 
                            className="absolute overflow-hidden h-4" 
                            style={{ width: isHalf ? '50%' : '100%' }}
                          >
                            <Star className="w-4 h-4 text-[#10b981] fill-[#10b981]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Experience Text */}
                <span className="text-sm text-slate-500 font-medium leading-snug">
                  {chef.experience}<br/>
                  <span className="capitalize">{chef.specialty}</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
