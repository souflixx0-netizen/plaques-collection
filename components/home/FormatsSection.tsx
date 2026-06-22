"use client";

import Link from "next/link";
import { PLATE_FORMATS, FORMAT_CATEGORIES, formatPrice } from "@/lib/formats";
import type { PlateFormat } from "@/types";
import PlateCanvas from "@/components/configurateur/PlateCanvas";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

const SHOWCASE: Array<{ cat: PlateFormat["category"]; pick: string }> = [
  { cat: "auto", pick: "auto-52x11"  },
  { cat: "moto", pick: "moto-21x13"  },
  { cat: "us",   pick: "us-30x15"    },
];

// Constrain both width and height so text is never clipped
function getScale(format: PlateFormat, maxW: number, maxH = 72): number {
  return Math.min(maxW / (format.width * 28), maxH / (format.height * 28), 1.2);
}

function CategoryCard({
  cat,
  pickId,
  delay,
}: {
  cat: PlateFormat["category"];
  pickId: string;
  delay: number;
}) {
  const { ref, inView } = useInView();
  const meta    = FORMAT_CATEGORIES[cat];
  const format  = PLATE_FORMATS.find((f) => f.id === pickId)!;
  const count   = PLATE_FORMATS.filter((f) => f.category === cat).length;
  const scale   = getScale(format, 220, 80);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal"
      style={{ transitionDelay: `${delay}ms`, ...(inView ? { opacity: 1, transform: "none" } : {}) }}
    >
      <Link
        href={`/catalogue?cat=${cat}`}
        className="card-hover group block p-6 md:p-8"
      >
        {/* Mini canvas — full demo text */}
        <div className="flex justify-center items-center h-24 mb-6">
          <PlateCanvas format={format} text="AB-123-CD" scale={scale} />
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-baseline justify-between">
            <h3 className="heading-display text-xl font-bold">{meta.label}</h3>
            <span className="font-mono text-[10px] text-forge-dim uppercase tracking-widest">
              {count} formats
            </span>
          </div>
          <p className="text-forge-secondary text-sm leading-relaxed font-body">
            {meta.description}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-forge-secondary uppercase tracking-widest group-hover:text-forge-gold transition-colors duration-200">
          Voir les formats
          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.5} />
        </span>
      </Link>
    </div>
  );
}

export default function FormatsSection() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-16"
          style={headIn ? { opacity: 1, transform: "none" } : {}}
        >
          <p className="font-mono text-[10px] text-forge-gold tracking-[0.5em] uppercase mb-4">
            Catalogue
          </p>
          <h2 className="heading-display text-4xl md:text-5xl font-bold mb-4 text-balance">
            Votre format, votre histoire
          </h2>
          <p className="text-forge-secondary font-body text-base max-w-lg leading-relaxed">
            {PLATE_FORMATS.length} formats en aluminium brossé, du standard homologué au format custom.
            Chaque dimension façonnée à la main dans notre atelier.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SHOWCASE.map(({ cat, pick }, i) => (
            <CategoryCard key={cat} cat={cat} pickId={pick} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
