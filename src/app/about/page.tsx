import React from 'react';
import AboutHero from '@/components/AboutHero';
import AboutStory from '@/components/AboutStory';
import AboutTimeline from '@/components/AboutTimeline';
import AboutVisionMission from '@/components/AboutVisionMission';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden pt-[60px] lg:pt-[72px]">
      {/* 
        Ensuring smooth layout structure. 
        Added pt-[60px] lg:pt-[72px] assuming navbar is fixed. 
      */}

      {/* Section 1: Hero */}
      <AboutHero />

      {/* Section 2: Story */}
      <AboutStory />

      {/* Section 3: Timeline */}
      <AboutTimeline />
      
      {/* Section 4: Vision & Mission */}
      <AboutVisionMission />
    </div>
  );
}
