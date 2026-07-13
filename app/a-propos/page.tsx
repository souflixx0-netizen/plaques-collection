import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Award, MapPin, Clock, ArrowRight, Gem, Stamp, PackageCheck, ShieldCheck } from "lucide-react";
import { PLATE_FORMATS } from "@/lib/formats";

export const metadata: Metadata = {
  alternates: { canonical: "/a-propos" },
  title: "L'Atelier",
  description: "Plaques Collection, atelier alsacien depuis 2005. Plaques de collection en aluminium brossé, fabriquées à la main en Alsace pour les passionnés de véhicules d'époque.",
};

const SAVOIR_FAIRE = [
  {
    icon: Gem,
    title: "Aluminium brossé",
    desc: "Chaque plaque part d'un aluminium brossé haute qualité, choisi pour sa tenue dans le temps : il ne s'altère pas, en intérieur comme en extérieur.",
  },
  {
    icon: Stamp,
    title: "Écriture en pochoir",
    desc: "Votre immatriculation est réalisée en écriture pochoir, fidèle aux plaques d'époque. Le rendu est net, profond, et tient à vie.",
  },
  {
    icon: PackageCheck,
    title: "Contrôle et expédition",
    desc: "Chaque plaque est fabriquée à la commande, contrôlée une par une, livrée sans perçage pour préserver sa finition, et expédiée sous 24 à 48 h.",
  },
];

const ENGAGEMENTS = [
  "Fabrication à la commande, dans notre atelier en Alsace",
  "Satisfait ou remboursé pendant 14 jours après réception",
  "Aucune sous-traitance : tout est fait sur place",
  "Un seul métier : la plaque de collection",
];

export default function AProposPage() {
  return (
    <div className="min-h-screen pb-16">
      {/* Cinematic header banner (placeholder — classic car) */}
      <div className="relative h-[58vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-car.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,9,8,0.7) 0%, rgba(10,9,8,0.25) 35%, rgba(10,9,8,0.85) 100%)",
          }}
        />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 pb-12">
          <p className="eyebrow mb-3">
            L&apos;Atelier
          </p>
          <h1 className="heading-display text-4xl md:text-6xl font-bold mb-4 text-balance">
            L&apos;atelier alsacien des plaques de collection,{" "}
            <span className="italic">depuis 2005</span>
          </h1>
          <div className="gold-line max-w-xs" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16">

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-5">
            <p className="text-forge-text text-lg leading-relaxed">
              Plaques Collection est un atelier familial alsacien, spécialisé
              depuis 2005 dans la plaque d&apos;immatriculation pour véhicules
              d&apos;époque.
            </p>
            <p className="text-forge-secondary leading-relaxed">
              Vingt ans plus tard, la méthode n&apos;a pas changé : chaque plaque
              est fabriquée à la main, à la commande, dans notre atelier en Alsace.
            </p>
          </div>
          <div className="space-y-5">
            <p className="text-forge-secondary leading-relaxed">
              Nos clients sont des passionnés : collectionneurs de voitures
              anciennes, propriétaires de youngtimers, motards. Des gens pour qui
              une belle mécanique mérite une belle plaque.
            </p>
            <p className="text-forge-secondary leading-relaxed">
              C&apos;est pour eux que nous ne faisons qu&apos;une seule chose, et
              que nous la faisons bien.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { icon: Wrench, num: String(PLATE_FORMATS.length), label: "Formats disponibles" },
            { icon: Award, num: "100%", label: "Fabriqué en France" },
            { icon: MapPin, num: "Alsace", label: "Notre atelier" },
            { icon: Clock, num: "Depuis 2005", label: "Savoir-faire familial" },
          ].map(({ icon: Icon, num, label }) => (
            <div key={label} className="card p-5 text-center rounded-xl">
              <Icon className="w-5 h-5 text-forge-secondary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-forge-text">{num}</p>
              <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Savoir-faire */}
        <div className="mb-20">
          <h2 className="heading-display text-2xl font-bold mb-10">Notre façon de faire</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SAVOIR_FAIRE.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 rounded-xl">
                <Icon className="w-5 h-5 text-forge-gold mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-bold text-forge-text mb-2">{title}</h3>
                <p className="text-forge-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engagements */}
        <div>
          <h2 className="heading-display text-2xl font-bold mb-8">Nos engagements</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {ENGAGEMENTS.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-forge-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-forge-secondary text-sm leading-relaxed">{e}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing CTA */}
        <div className="mt-24 text-center border-t border-forge-border pt-16">
          <h2 className="heading-display text-3xl md:text-4xl font-bold mb-4 text-balance">
            Offrez à votre véhicule la plaque qu&apos;il mérite
          </h2>
          <p className="text-forge-secondary font-body mb-8 max-w-md mx-auto leading-relaxed">
            Conçue par des passionnés, fabriquée à la main en Alsace.
          </p>
          <Link href="/configurateur" className="btn-cta">
            Configurer ma plaque
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
