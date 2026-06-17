"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type CompanyProfile = {
  name: string;
  tagline: string;
  vision: string;
  mission: string;
  aboutHtml: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
};

function TeamMemberItem({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  let finalUrl = member.imageUrl || '';

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border-hairline group">
      <div className="flex-shrink-0 w-16 h-16 rounded-full border border-border-hairline overflow-hidden relative bg-surface-2 flex items-center justify-center">
        {!imgError && finalUrl ? (
          <Image 
            src={finalUrl} 
            alt={member.name}
            width={64}
            height={64}
            unoptimized={true}
            onError={() => setImgError(true)}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="font-display font-bold text-text-muted text-h3 uppercase">
            {member.name.charAt(0)}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">{member.name}</h4>
        <p className="text-small text-text-secondary">{member.role}</p>
      </div>
    </div>
  );
}

export default function AboutClient({ profile, team }: { profile: CompanyProfile | null, team: TeamMember[] }) {
  const defaultAbout = "Ekspora is an Indonesian-based export company dedicated to supplying premium agricultural commodities to the world. We believe in sustainable trade that benefits both our global clients and local farmers.";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
      className="pt-32 pb-24 min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-display font-display font-bold text-text-primary tracking-tight mb-8">
          {profile?.tagline || <span>Bridging the gap between <span className="text-text-muted">local farmers</span> and <span className="text-text-muted">global markets.</span></span>}
        </h1>
        
        <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed prose-headings:text-text-primary prose-headings:font-display">
          <p className="text-h3 font-medium text-text-primary mb-12">
            {profile?.aboutHtml || defaultAbout}
          </p>

          <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-border-hairline rounded-2xl bg-surface hover:border-text-muted transition-colors">
              <h3 className="text-h3 font-semibold mb-3">Our Mission</h3>
              <p className="text-small text-text-secondary">{profile?.mission || "To provide transparent, efficient, and reliable sourcing of Indonesian commodities, while empowering local agricultural communities through fair trade practices."}</p>
            </div>
            <div className="p-8 border border-border-hairline rounded-2xl bg-surface hover:border-text-muted transition-colors">
              <h3 className="text-h3 font-semibold mb-3">Our Vision</h3>
              <p className="text-small text-text-secondary">{profile?.vision || "To be the most trusted global partner for Indonesian commodities, recognized for our unyielding commitment to quality, sustainability, and integrity."}</p>
            </div>
          </div>

          <h2 className="text-h2 font-semibold mb-6 mt-16">Meet Our Team</h2>
          <div className="flex flex-col not-prose border-t border-border-hairline">
            {team.length > 0 ? (
              team.map((member) => (
                <TeamMemberItem key={member.id} member={member} />
              ))
            ) : (
              <p className="py-8 text-text-secondary text-small">No team members listed.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
