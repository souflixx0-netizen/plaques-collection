import { MapPin, Infinity as InfinityIcon, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

const ITEMS = [
  { icon: MapPin,       label: "Fabriqué en Alsace" },
  { icon: InfinityIcon, label: "Tient à vie" },
  { icon: BadgeCheck,   label: "Satisfait ou remboursé" },
  { icon: ShieldCheck,  label: "Paiement sécurisé" },
  { icon: Truck,        label: "Expédition 24-48h" },
] as const;

export default function ReassuranceBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-y border-forge-border bg-forge-black/40 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5">
            <Icon className="w-4 h-4 text-forge-gold shrink-0" strokeWidth={1.5} />
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-forge-secondary">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
