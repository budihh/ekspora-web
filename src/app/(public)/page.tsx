"use client";

import { CinematicHero } from "@/components/ui/cinematic-hero";
import { GlobalNetwork } from "@/components/public/discover/GlobalNetwork";
import { FeaturedSectorsAccordion } from "@/components/ui/interactive-image-accordion";
import { EksporaStandard } from "@/components/public/discover/EksporaStandard";
import { FinalCTA } from "@/components/public/discover/FinalCTA";

export default function DiscoverPage() {
  return (
    <>
      <CinematicHero />
      <GlobalNetwork />
      <section className="bg-[#050505] relative overflow-hidden">
        <FeaturedSectorsAccordion />
      </section>
      <EksporaStandard />
      <FinalCTA />
    </>
  );
}
