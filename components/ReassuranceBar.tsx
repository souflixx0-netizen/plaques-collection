import { MapPin, Infinity as InfinityIcon, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = { icon: LucideIcon; label: string; highlight?: boolean };

const ITEMS: Item[] = [
  { icon: MapPin,       label: "Fabriqué en Alsace" },
  { icon: InfinityIcon, label: "Tient à vie" },
  { icon: BadgeCheck,   label: "Satisfait ou remboursé", highlight: true },
  { icon: ShieldCheck,  label: "Paiement sécurisé" },
  { icon: Truck,        label: "Expédition 24-48h" },
];

export default function ReassuranceBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-y border-forge-gold/20 bg-forge-gold/[0.04] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        {ITEMS.map(({ icon: Icon, label, highlight }) => (
          <div
            key={label}
            className={`flex items-center gap-2.5 ${
              highlight
                ? "px-4 py-2 rounded-full border border-forge-gold/40 bg-forge-gold/10"
                : ""
            }`}
          >
            <Icon className="w-5 h-5 text-forge-gold shrink-0" strokeWidth={1.5} />
            <span
              className={`font-mono text-[11px] md:text-xs uppercase tracking-widest ${
                highlight ? "text-forge-gold font-bold" : "text-forge-text"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
