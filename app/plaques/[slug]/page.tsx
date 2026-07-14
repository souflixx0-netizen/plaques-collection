import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PLATE_FORMATS, formatPrice } from "@/lib/formats";
import {
  getFormatBySlug,
  formatUrl,
  seoTitle,
  seoDescription,
  intro,
  specs,
  faq,
  relatedFormats,
  catNoun,
} from "@/lib/formatSeo";
import PlateShowcase from "@/components/plaques/PlateShowcase";
import ReassuranceBar from "@/components/ReassuranceBar";

export function generateStaticParams() {
  return PLATE_FORMATS.map((f) => ({ slug: f.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFormatBySlug(params.slug);
  if (!f) return {};
  return {
    title: { absolute: seoTitle(f) },
    description: seoDescription(f),
    alternates: { canonical: formatUrl(f) },
  };
}

export default function FormatPage({ params }: { params: { slug: string } }) {
  const f = getFormatBySlug(params.slug);
  if (!f) notFound();

  const paragraphs = intro(f);
  const specRows = specs(f);
  const faqItems = faq(f);
  const related = relatedFormats(f);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Plaque d'immatriculation collection ${f.label}`,
      description: seoDescription(f),
      // Image générique en attendant les vraies photos par format
      image: "https://plaques-collection.fr/opengraph-image",
      sku: f.id,
      brand: { "@type": "Brand", name: "Plaques Collection" },
      material: "Aluminium brossé",
      offers: {
        "@type": "Offer",
        url: `https://plaques-collection.fr${formatUrl(f)}`,
        priceCurrency: "EUR",
        price: f.price.toFixed(2),
        // MadeToOrder n'est pas reconnu par Google : InStock = commandable
        // immédiatement, le délai de fabrication vit dans handlingTime
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "FR",
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 14,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
          refundType: "https://schema.org/FullRefund",
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "FR" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
          },
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://plaques-collection.fr/" },
        { "@type": "ListItem", position: 2, name: "Catalogue", item: "https://plaques-collection.fr/catalogue" },
        { "@type": "ListItem", position: 3, name: f.label, item: `https://plaques-collection.fr${formatUrl(f)}` },
      ],
    },
  ];

  return (
    <div className="pt-24 pb-24 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto">

        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-[11px] text-forge-dim">
            <li><Link href="/" className="hover:text-forge-text transition-colors">Accueil</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/catalogue" className="hover:text-forge-text transition-colors">Catalogue</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-forge-secondary">{f.label}</li>
          </ol>
        </nav>

        {/* En-tête + visuel */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start mb-16">
          <div className="mb-8 lg:mb-0">
            <p className="eyebrow mb-3">
              {f.category === "us" ? "Format US" : f.category === "moto" ? "Format moto" : "Format auto"}
            </p>
            <h1 className="heading-display text-4xl md:text-5xl font-bold mb-5 text-balance">
              Plaque collection {f.label}
            </h1>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-forge-text font-body leading-relaxed mb-4"
                    : "text-forge-secondary font-body leading-relaxed mb-4"
                }
              >
                {p}
              </p>
            ))}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link href={`/configurateur?format=${f.id}`} className="btn-cta">
                Personnaliser ma plaque {f.label}
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
            <p className="font-sans text-[11px] text-forge-dim mt-3">
              {formatPrice(f.price)} l&apos;unité · aperçu en temps réel avant commande
            </p>
            <p className="font-sans text-xs text-forge-secondary mt-5">
              Un doute sur la réglementation ou le format ? Lisez notre{" "}
              <Link href="/guide-plaque-collection" className="text-forge-gold hover:underline">
                guide de la plaque de véhicule de collection
              </Link>
              .
            </p>
          </div>

          <PlateShowcase format={f} />
        </div>

        {/* Caractéristiques */}
        <div className="mb-16">
          <h2 className="heading-display text-2xl font-bold mb-6">Caractéristiques</h2>
          <div className="card divide-y divide-forge-border overflow-hidden">
            {specRows.map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-3">
                <span className="font-sans text-[10px] text-forge-dim uppercase tracking-widest sm:w-40 shrink-0">
                  {label}
                </span>
                <span className="font-sans text-sm text-forge-text">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ du format */}
        <div className="mb-16">
          <h2 className="heading-display text-2xl font-bold mb-6">Questions fréquentes</h2>
          <div className="space-y-5">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="card p-5">
                <h3 className="font-display text-base font-bold text-forge-text mb-2">{q}</h3>
                <p className="text-forge-secondary text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formats proches */}
        <div className="mb-16">
          <h2 className="heading-display text-2xl font-bold mb-6">Formats proches</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={formatUrl(r)}
                  className="card-hover flex items-center justify-between gap-2 px-4 py-3.5"
                >
                  <span className="font-sans text-sm text-forge-text">{r.label}</span>
                  <span className="font-sans text-[10px] text-forge-dim uppercase">
                    {r.category === "us" ? "US" : r.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-sans text-xs text-forge-secondary mt-5">
            Ou parcourez{" "}
            <Link href="/catalogue" className="text-forge-gold hover:underline">
              les {PLATE_FORMATS.length} formats du catalogue
            </Link>
            , pour {catNoun(f)} et tous les autres véhicules.
          </p>
        </div>

        {/* Réassurance + garantie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 border-t border-forge-border pt-8 mb-12">
          {[
            "Fabrication artisanale en Alsace",
            "Expédition 24-48 h",
            "Paiement sécurisé",
            "Satisfait ou remboursé 14 jours",
          ].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-forge-gold shrink-0" strokeWidth={2} />
              <span className="font-sans text-[12px] text-forge-secondary tracking-wide">{t}</span>
            </div>
          ))}
        </div>

        <ReassuranceBar className="rounded-lg" />
      </div>
    </div>
  );
}
