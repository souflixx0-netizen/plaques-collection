import type { Metadata } from "next";
import { Wrench, Award, MapPin, Clock } from "lucide-react";
import { PLATE_FORMATS } from "@/lib/formats";

export const metadata: Metadata = {
  title: "L'Atelier",
  description: "Plaques Collection, atelier familial alsacien depuis 2005. Plaques de collection fabriquées à la main en Alsace pour les passionnés de véhicules d'époque.",
};

const TIMELINE = [
  {
    year: "2005",
    title: "Tout commence avec mon père",
    desc: "Passionné de belles mécaniques, mon père lance l'atelier en Alsace et se met à fabriquer des plaques de collection pour les amateurs de voitures anciennes de la région. Le bouche-à-oreille fait le reste.",
  },
  {
    year: "Au fil des ans",
    title: "Un savoir-faire qui s'affine",
    desc: "Collectionneurs, motards, propriétaires de véhicules d'époque : la clientèle grandit. L'atelier se concentre sur une chose, la faire à la main et bien la faire.",
  },
  {
    year: "Aujourd'hui",
    title: "L'atelier en ligne",
    desc: "Je poursuis ce que mon père a construit. La fabrication reste en Alsace, à la main, et le configurateur permet désormais à chacun de commander sa plaque partout en France.",
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-forge-gold tracking-[0.4em] uppercase mb-3">
            L&apos;Atelier
          </p>
          <h1 className="heading-display text-4xl md:text-6xl font-bold mb-6 text-balance">
            Une affaire de famille,{" "}
            <span className="italic">depuis 2005</span>
          </h1>
          <div className="gold-line" />
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-5">
            <p className="text-forge-text text-lg leading-relaxed">
              Plaques Collection, c&apos;est une histoire de famille, née en Alsace
              en 2005. Mon père, passionné de véhicules d&apos;époque, a commencé
              par fabriquer des plaques de collection pour les amateurs de la région.
            </p>
            <p className="text-forge-muted leading-relaxed">
              Aujourd&apos;hui, je poursuis son travail avec la même exigence :
              chaque plaque est fabriquée à la main, dans notre atelier, en Alsace.
            </p>
          </div>
          <div className="space-y-5">
            <p className="text-forge-muted leading-relaxed">
              Nos clients sont des passionnés, comme nous : collectionneurs de
              voitures anciennes, propriétaires de youngtimers, motards. Des gens
              pour qui une belle mécanique mérite une belle plaque.
            </p>
            <p className="text-forge-muted leading-relaxed">
              Vingt ans plus tard, l&apos;esprit n&apos;a pas changé : du soin, de
              l&apos;exigence, et une plaque dont on est fier sur son véhicule comme
              dans son garage.
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
            <div key={label} className="card-forge p-5 text-center rounded-xl">
              <Icon className="w-5 h-5 text-forge-gold mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-forge-gold">{num}</p>
              <p className="font-mono text-[10px] text-forge-dim uppercase tracking-widest mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="heading-display text-2xl font-bold mb-10">Notre histoire</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-24 top-0 bottom-0 w-px bg-forge-border" />

            <div className="space-y-10 pl-6 md:pl-36">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative">
                  {/* Year badge */}
                  <div className="absolute -left-6 md:-left-36 flex items-start">
                    <span className="font-mono text-xs font-bold text-forge-gold bg-forge-dark border border-forge-gold/30 px-2 py-1 rounded whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="absolute -left-[9px] md:-left-[33px] top-2 w-3 h-3 rounded-full bg-forge-gold border-2 border-forge-dark" />

                  <div className="pt-0.5 pb-2">
                    <h3 className="font-display text-lg font-bold text-forge-text mb-2">
                      {item.title}
                    </h3>
                    <p className="text-forge-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
