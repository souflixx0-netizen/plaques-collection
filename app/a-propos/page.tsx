import type { Metadata } from "next";
import { Wrench, Award, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "L'Atelier",
  description: "L'histoire de Plaques Collection, atelier métallurgique français fondé à Lyon.",
};

const TIMELINE = [
  {
    year: "1952",
    title: "L'origine du savoir-faire",
    desc: "Les plaques d'immatriculation françaises sont alors en aluminium embossé, fabriquées dans de petits ateliers régionaux. C'est dans cet univers que naît notre tradition du pochoir.",
  },
  {
    year: "1987",
    title: "L'atelier prend forme",
    desc: "Notre fondateur, passionné d'automobiles anciennes, commence à fabriquer des répliques de plaques d'époque pour les collectionneurs. La demande explose.",
  },
  {
    year: "2005",
    title: "Le tournant artisanal",
    desc: "Refus catégorique de l'impression numérique. Nous investissons dans des pochoirs aluminium de précision et affinons notre technique de brossage manuel.",
  },
  {
    year: "2019",
    title: "L'atelier en ligne",
    desc: "Plaques Collection ouvre sa boutique en ligne, permettant à chacun de commander une plaque personnalisée directement depuis chez soi.",
  },
  {
    year: "Aujourd'hui",
    title: "24 formats, 1 atelier",
    desc: "Toujours à Lyon, toujours à la main. Chaque plaque quitte l'atelier avec l'empreinte de son fabricant.",
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
            Soixante-dix ans de{" "}
            <span className="italic">métal et de pochoir</span>
          </h1>
          <div className="gold-line" />
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-5">
            <p className="text-forge-text text-lg leading-relaxed">
              Plaques Collection, c&apos;est l&apos;histoire d&apos;une obsession pour le métal travaillé à la main,
              dans la tradition des ateliers lyonnais du milieu du XX<sup>e</sup> siècle.
            </p>
            <p className="text-forge-muted leading-relaxed">
              À une époque où tout se fabrique à la machine et s&apos;imprime au laser, nous avons
              choisi l&apos;inverse : garder la chaleur du geste, l&apos;irrégularité du pochoir,
              l&apos;authenticité du métal brossé.
            </p>
          </div>
          <div className="space-y-5">
            <p className="text-forge-muted leading-relaxed">
              Nos plaques ne ressemblent à aucune autre parce qu&apos;elles ne sont fabriquées
              comme aucune autre. Chaque pièce est unique — le grain du métal, la légère
              variation du pochoir, les micro-traces de brossage.
            </p>
            <p className="text-forge-muted leading-relaxed">
              C&apos;est ça, la collection : posséder un objet qui a été fait par quelqu&apos;un,
              pas par quelque chose.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { icon: Wrench, num: "24", label: "Formats disponibles" },
            { icon: Award, num: "100%", label: "Fabriqué en France" },
            { icon: MapPin, num: "Lyon", label: "Atelier unique" },
            { icon: Clock, num: "3–5j", label: "Délai de fabrication" },
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
