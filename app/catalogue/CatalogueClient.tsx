"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  PLATE_FORMATS,
  FORMAT_CATEGORIES,
  MOTO_SUBCATEGORIES,
  formatPrice,
} from "@/lib/formats";
import type { PlateFormat } from "@/types";
import { usePrice } from "@/components/PriceContext";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Category = PlateFormat["category"];
const CATS: Category[] = ["auto", "moto", "us"];

// Realistic Blender renders, by plate shape (1 line = long, 2 lines = square)
function plateImg(format: PlateFormat): string {
  return format.lines === 1
    ? "/images/plates/long-34.png"
    : "/images/plates/square-34.png";
}

export default function CatalogueClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>(
    (searchParams.get("cat") as Category) || "auto"
  );

  useEffect(() => {
    const cat = searchParams.get("cat") as Category;
    if (cat && CATS.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  function changeCategory(cat: Category) {
    setActiveCategory(cat);
    router.push(`/catalogue?cat=${cat}`, { scroll: false });
  }

  const formats = PLATE_FORMATS.filter((f) => f.category === activeCategory);
  const isMoto = activeCategory === "moto";

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-sans text-xs text-forge-secondary tracking-[0.17em] uppercase mb-3">
            Catalogue
          </p>
          <h1 className="heading-display text-4xl md:text-5xl font-bold mb-3">
            Tous les formats
          </h1>
          <p className="text-forge-muted font-sans text-sm">
            {PLATE_FORMATS.length} formats · Aluminium brossé · Écriture en pochoir · Fabriqué en Alsace
          </p>
          <p className="font-sans text-[10px] text-forge-dim mt-2 max-w-xl">
            Plaques de collection : pose sur la voie publique réservée aux véhicules
            immatriculés en collection, sinon usage décoratif.
          </p>
        </div>

        {/* Category tabs — pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATS.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => changeCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-full font-sans text-xs tracking-widest uppercase border transition-all duration-200",
                  active
                    ? "bg-forge-gold text-forge-black border-forge-gold shadow-gold-glow"
                    : "bg-forge-card/60 text-forge-secondary border-forge-border hover:border-forge-gold/50 hover:text-forge-text"
                )}
              >
                {FORMAT_CATEGORIES[cat].label}
                <span className={cn("ml-2", active ? "text-forge-black/60" : "text-forge-dim")}>
                  {PLATE_FORMATS.filter((f) => f.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {isMoto ? (
          <div className="space-y-12">
            {(Object.entries(MOTO_SUBCATEGORIES) as [keyof typeof MOTO_SUBCATEGORIES, string][]).map(
              ([sub, subLabel]) => {
                const subFormats = formats.filter((f) => f.subcategory === sub);
                return (
                  <div key={sub}>
                    <div className="flex items-center gap-4 mb-5">
                      <h2 className="font-sans text-xs text-forge-secondary uppercase tracking-widest">
                        {subLabel}
                      </h2>
                      {sub === "homologué" && (
                        <span className="px-2 py-0.5 bg-forge-gold/10 border border-forge-gold/30 rounded text-[10px] font-sans text-forge-gold">
                          Homologué route
                        </span>
                      )}
                      <div className="flex-1 h-px bg-forge-border" />
                    </div>
                    <FormatGrid formats={subFormats} />
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <FormatGrid formats={formats} />
        )}

        {/* Closing CTA */}
        <div className="mt-24 rounded-2xl border border-forge-border bg-forge-card/60 px-8 py-12 text-center">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3 text-balance">
            Chaque plaque est personnalisable
          </h2>
          <p className="text-forge-secondary font-body mb-7 max-w-md mx-auto leading-relaxed">
            Choisissez votre format, votre texte et visualisez le rendu en temps réel.
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

function FormatGrid({ formats }: { formats: PlateFormat[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {formats.map((f) => (
        <CatalogueCard key={f.id} format={f} />
      ))}
    </div>
  );
}

function CatalogueCard({ format }: { format: PlateFormat }) {
  const price = usePrice(format.id, format.price);
  return (
    <Link
      href={`/configurateur?format=${format.id}`}
      className="card-hover group p-5 flex flex-col text-center"
    >
      {/* Realistic plate render */}
      <div className="flex items-center justify-center h-28 mb-5">
        <Image
          src={plateImg(format)}
          alt={`Plaque de collection ${format.label}`}
          width={520}
          height={360}
          className="w-auto h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
          style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.6))" }}
        />
      </div>

      <h3 className="heading-display text-xl font-bold mb-1.5">{format.label}</h3>

      {/* Usage context */}
      {format.usage && (
        <p className="font-sans text-[11px] text-forge-secondary mb-3 truncate px-1" title={format.usage}>
          {format.usage}
        </p>
      )}

      {/* Badge */}
      <span
        className={cn(
          "self-center inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-wide mb-4 border",
          format.homologated
            ? "border-forge-gold/40 bg-forge-gold/10 text-forge-gold"
            : "border-forge-border bg-forge-card text-forge-secondary"
        )}
      >
        {format.homologated ? "Homologué route" : "Collection"}
      </span>

      <div className="border-t border-forge-border pt-4 mt-auto">
        <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest mb-1">
          À partir de
        </p>
        <p className="mb-4">
          <span className="font-display text-2xl font-bold text-forge-text">{formatPrice(price)}</span>
          <span className="font-sans text-[11px] text-forge-dim"> / plaque</span>
        </p>

        {/* Insistent CTA */}
        <span className="block w-full bg-forge-gold text-forge-black font-sans text-[11px] font-semibold tracking-widest-2 uppercase py-3 rounded transition-all duration-200 group-hover:bg-forge-gold-light group-hover:shadow-gold-glow">
          Configurer
        </span>
      </div>
    </Link>
  );
}
