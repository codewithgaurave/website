import React from 'react';
import AgentHero from '@/components/AgentHero';
import AgentBenefits from '@/components/AgentBenefits';
import AgentForm from '@/components/AgentForm';

export default function AgentPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden pt-[60px] lg:pt-[72px]">
      <AgentHero />
      <AgentBenefits />
      <AgentForm />
    </div>
  );
}
