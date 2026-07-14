"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const PILLARS = [
  {
    n: "01",
    title: "Atelier familial",
    desc: "Depuis 2005, de père en fils. Chaque plaque est fabriquée à la main dans notre atelier, en Alsace. Aucune sous-traitance, aucun intermédiaire.",
  },
  {
    n: "02",
    title: "Aluminium brossé, écriture pochoir",
    desc: "Une matière noble et une finition soignée, qui ne s'altèrent pas : votre plaque est faite pour durer toute une vie, dehors comme dedans.",
  },
  {
    n: "03",
    title: "Pour les passionnés",
    desc: "Voitures anciennes, youngtimers, motos : nos plaques sont faites par des passionnés, pour des passionnés de belles mécaniques.",
  },
];

function Pillar({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal"
      style={{ transitionDelay: `${delay}ms`, ...(inView ? { opacity: 1, transform: "none" } : {}) }}
    >
      <div className="border-t border-forge-border pt-7 space-y-3">
        <span className="font-sans text-[10px] text-forge-dim tracking-widest">{n}</span>
        <h3 className="heading-display text-lg font-bold">{title}</h3>
        <p className="text-forge-secondary font-body text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function SavoirFaire() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section className="py-28 px-6 md:px-10 bg-forge-dark">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div
            ref={headRef as React.RefObject<HTMLDivElement>}
            className="reveal"
            style={headIn ? { opacity: 1, transform: "none" } : {}}
          >
            <p className="eyebrow mb-4">
              Savoir-faire
            </p>
            <h2 className="heading-display text-4xl md:text-5xl font-bold text-balance">
              Ce que nos mains font,{" "}
              <em className="text-gold not-italic" style={{ fontStyle: "italic" }}>
                les machines ne peuvent pas
              </em>
            </h2>
          </div>
          <div
            className="reveal delay-200"
            style={headIn ? { opacity: 1, transform: "none" } : {}}
          >
            <p className="text-forge-secondary font-body text-base leading-relaxed pt-8 lg:pt-12">
              La plaque d&apos;immatriculation artisanale est un objet à part. Elle n&apos;est pas produite
              — elle est fabriquée. Chaque pièce porte la trace du geste qui l&apos;a créée.
            </p>
          </div>
        </div>

        {/* Cinematic image band (placeholder — classic car) */}
        <div
          className="reveal relative h-[260px] md:h-[440px] rounded-2xl overflow-hidden mb-20 border border-forge-border"
          style={headIn ? { opacity: 1, transform: "none" } : {}}
        >
          <Image
            src="/images/atelier-car.jpg"
            alt=""
            aria-hidden="true"
            fill
            quality={70}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(10,9,8,0.15) 0%, rgba(10,9,8,0.15) 55%, rgba(10,9,8,0.92) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <p className="eyebrow mb-2">
              Fait pour durer
            </p>
            <p className="heading-display text-2xl md:text-3xl font-bold max-w-md">
              Une plaque à la hauteur de votre véhicule
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {PILLARS.map((p, i) => (
            <Pillar key={p.n} {...p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
