"use client";

import Link from "next/link";
import Image from "next/image";
import { PLATE_FORMATS, FORMAT_CATEGORIES } from "@/lib/formats";
import type { PlateFormat } from "@/types";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

// Realistic plate renders per category (Blender)
const CAT_IMG: Record<PlateFormat["category"], string> = {
  auto: "/images/plates/long-34.png",
  moto: "/images/plates/square-34.png",
  us:   "/images/plates/long-14.png",
};

const SHOWCASE: Array<PlateFormat["category"]> = ["auto", "moto", "us"];

function CategoryCard({ cat, delay }: { cat: PlateFormat["category"]; delay: number }) {
  const { ref, inView } = useInView();
  const meta  = FORMAT_CATEGORIES[cat];
  const count = PLATE_FORMATS.filter((f) => f.category === cat).length;

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
        {/* Realistic plate render */}
        <div className="flex justify-center items-center h-28 mb-6">
          <Image
            src={CAT_IMG[cat]}
            alt={`Plaque ${meta.label} en aluminium`}
            width={400}
            height={240}
            className="w-auto h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            style={{ filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.5))" }}
          />
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-baseline justify-between">
            <h3 className="heading-display text-xl font-bold">{meta.label}</h3>
            <span className="font-sans text-[10px] text-forge-dim uppercase tracking-widest">
              {count} formats
            </span>
          </div>
          <p className="text-forge-secondary text-sm leading-relaxed font-body">
            {meta.description}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 font-sans text-[10px] text-forge-secondary uppercase tracking-widest group-hover:text-forge-gold transition-colors duration-200">
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
          <p className="font-sans text-[10px] text-forge-gold tracking-[0.2em] uppercase mb-4">
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
          {SHOWCASE.map((cat, i) => (
            <CategoryCard key={cat} cat={cat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
