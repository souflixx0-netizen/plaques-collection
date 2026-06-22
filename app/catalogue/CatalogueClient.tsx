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
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const SCALE = 5; // px per cm for catalogue preview

type Category = PlateFormat["category"];
const CATS: Category[] = ["auto", "moto", "us"];

function PlatePreview({ format }: { format: PlateFormat }) {
  const w = format.width * SCALE;
  const h = format.height * SCALE;
  const maxDim = 160;
  const ratio = Math.min(1, maxDim / Math.max(w, h));

  return (
    <div
      className="bg-[#0e0e0e] border border-forge-gold/20 rounded-sm flex items-center justify-center"
      style={{ width: `${w * ratio}px`, height: `${h * ratio}px` }}
    >
      <span className="font-mono text-[8px] text-forge-dim leading-none text-center px-1">
        {format.label}
      </span>
    </div>
  );
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
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-forge-gold tracking-[0.4em] uppercase mb-3">
            Catalogue
          </p>
          <h1 className="heading-display text-4xl md:text-5xl font-bold mb-3">
            Tous les formats
          </h1>
          <p className="text-forge-muted font-mono text-sm">
            {PLATE_FORMATS.length} formats disponibles · Fabriqué à la main en Alsace
          </p>
          <p className="font-mono text-[10px] text-forge-dim mt-2 max-w-xl">
            Plaques de collection : pose sur la voie publique réservée aux véhicules
            immatriculés en collection, sinon usage décoratif.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 border-b border-forge-border mb-10">
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={cn(
                "px-5 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-200 border-b-2 -mb-px",
                activeCategory === cat
                  ? "border-forge-gold text-forge-gold"
                  : "border-transparent text-forge-dim hover:text-forge-muted"
              )}
            >
              {FORMAT_CATEGORIES[cat].label}
              <span className="ml-2 text-forge-dim">
                ({PLATE_FORMATS.filter((f) => f.category === cat).length})
              </span>
            </button>
          ))}
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
                      <h2 className="font-mono text-xs text-forge-gold uppercase tracking-widest">
                        {subLabel}
                      </h2>
                      {sub === "homologué" && (
                        <span className="px-2 py-0.5 bg-forge-gold/10 border border-forge-gold/30 rounded text-[10px] font-mono text-forge-gold">
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
      </div>
    </div>
  );
}

function FormatGrid({ formats }: { formats: PlateFormat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
      className="card-forge grain p-4 rounded-lg hover:border-forge-gold/50 hover:shadow-gold transition-all duration-200 group flex flex-col items-center text-center gap-3"
    >
      <PlatePreview format={format} />
      <div>
        <p className="font-mono text-sm font-bold text-forge-text">{format.label}</p>
        <p className="font-mono text-xs text-forge-gold mt-0.5">{formatPrice(price)}</p>
      </div>
      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-forge-dim group-hover:text-forge-gold uppercase tracking-widest transition-colors">
        Configurer <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
