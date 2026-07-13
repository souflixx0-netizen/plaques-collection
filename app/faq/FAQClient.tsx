"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_SECTIONS as FAQ } from "@/lib/faqData";


export default function FAQClient() {
  const [open, setOpen] = useState<string | null>(null);

  function toggle(key: string) {
    setOpen((prev) => (prev === key ? null : key));
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="eyebrow mb-3">
            Questions fréquentes
          </p>
          <h1 className="heading-display text-4xl md:text-5xl font-bold mb-3">FAQ</h1>
          <p className="text-forge-secondary font-body leading-relaxed">
            Tout ce que vous voulez savoir sur nos plaques et notre atelier.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {FAQ.map((section) => (
            <div key={section.category}>
              <h2 className="font-sans text-xs text-forge-secondary uppercase tracking-widest mb-4">
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div
                      key={key}
                      className={cn(
                        "card rounded-lg transition-all duration-200",
                        isOpen && "border-forge-gold/40"
                      )}
                    >
                      <button
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span
                          className={cn(
                            "font-display text-base font-semibold transition-colors duration-200",
                            isOpen ? "text-forge-gold" : "text-forge-text"
                          )}
                        >
                          {item.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            "flex-shrink-0 w-4 h-4 mt-0.5 text-forge-secondary transition-transform duration-200",
                            isOpen && "rotate-180 text-forge-gold"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          isOpen ? "max-h-96" : "max-h-0"
                        )}
                      >
                        <p className="px-5 pb-5 text-forge-secondary text-sm leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 card rounded-xl p-8 text-center">
          <h3 className="heading-display text-xl font-bold mb-2">Pas trouvé votre réponse ?</h3>
          <p className="text-forge-secondary text-sm mb-5">
            Notre équipe répond en moins de 24h.
          </p>
          <a href="mailto:contact@plaques-collection.fr" className="btn-primary">
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}
