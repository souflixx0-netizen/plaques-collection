import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATE_FORMATS } from "@/lib/formats";
import ReassuranceBar from "@/components/ReassuranceBar";

export const metadata: Metadata = {
  title: { absolute: "Quelle plaque pour un véhicule de collection ? Le guide" },
  description:
    "Plaque noire, carte grise collection, formats homologués ou d'époque : le guide complet pour choisir la plaque d'immatriculation de votre voiture ou moto de collection.",
  alternates: { canonical: "/guide-plaque-collection" },
};

// Questions/réponses du guide — affichées en H3 et reprises dans le JSON-LD FAQPage.
const GUIDE_FAQ = [
  {
    q: "Un véhicule de plus de 30 ans peut-il porter une plaque noire ?",
    a: "Pas automatiquement. L'âge ne suffit pas : c'est la mention « véhicule de collection » sur le certificat d'immatriculation qui autorise la plaque à fond noir sur la voie publique. Un véhicule de 35 ans resté en carte grise normale reste soumis aux plaques standard à fond blanc et jaune. Si votre ancienne remplit les conditions, la démarche de passage en carte grise collection est simple et ouvre droit au fond noir.",
  },
  {
    q: "Comment obtenir la carte grise collection ?",
    a: "Trois conditions cumulatives : le véhicule a plus de 30 ans (date de première mise en circulation), il n'est plus produit, et il est conservé dans son état d'origine, sans modification majeure du châssis, du moteur ou de la carrosserie. La demande se fait en ligne sur le site de l'ANTS, accompagnée d'une attestation délivrée par la FFVE (Fédération Française des Véhicules d'Époque) ou par le constructeur.",
  },
  {
    q: "Quelles dimensions de plaque sont homologuées aujourd'hui ?",
    a: "L'arrêté du 9 février 2009 fixe les dimensions officielles : 52 × 11 cm, 45,5 × 10 cm et 27,5 × 20 cm pour les voitures, 21 × 13 cm pour les motos. Ce sont les quatre formats marqués « Homologué route » dans notre catalogue. Tous nos autres formats reprennent des dimensions d'époque, portées par les véhicules avant l'uniformisation des tailles.",
  },
  {
    q: "Peut-on garder le format d'époque sur une moto ancienne ?",
    a: "Oui, c'est même l'intérêt du statut collection : un véhicule immatriculé en collection peut porter une plaque conforme aux règles applicables à la date de sa première mise en circulation. Une moto des années 60 peut donc retrouver son petit format d'origine, comme le 17 × 13 cm ou le 14 × 13 cm, au lieu du 21 × 13 cm unique imposé aux motos modernes.",
  },
  {
    q: "Et si mon véhicule n'est pas immatriculé en collection ?",
    a: "Nos plaques restent faites pour lui, mais pas pour la route : exposition, garage, décoration d'atelier, rassemblements, ou en attendant le passage en carte grise collection. Beaucoup de nos clients commandent leur plaque fond noir au moment où ils déposent leur dossier FFVE, pour équiper le véhicule dès l'obtention de la mention collection.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GUIDE_FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://plaques-collection.fr/" },
      { "@type": "ListItem", position: 2, name: "Guide", item: "https://plaques-collection.fr/guide-plaque-collection" },
    ],
  },
];

function FormatLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Link href={`/plaques/${id}`} className="text-forge-gold hover:underline">
      {children}
    </Link>
  );
}

export default function GuidePage() {
  const homologated = PLATE_FORMATS.filter((f) => f.homologated);

  return (
    <div className="pt-24 pb-24 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-[11px] text-forge-dim">
            <li><Link href="/" className="hover:text-forge-text transition-colors">Accueil</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-forge-secondary">Guide</li>
          </ol>
        </nav>

        <p className="eyebrow mb-3">Le guide</p>
        <h1 className="heading-display text-4xl md:text-5xl font-bold mb-7 text-balance">
          Quelle plaque d&apos;immatriculation pour un véhicule de collection&nbsp;?
        </h1>

        {/* Bloc réponse auto-suffisant (citable) */}
        <div className="card p-6 mb-12">
          <p className="text-forge-text font-body leading-relaxed mb-4">
            Sur un véhicule immatriculé en collection, c&apos;est-à-dire portant la mention
            «&nbsp;véhicule de collection&nbsp;» sur le certificat d&apos;immatriculation, vous pouvez
            poser une plaque à fond noir avec des caractères aluminium ou blancs, prévue par
            l&apos;arrêté du 9 février 2009 relatif aux plaques d&apos;immatriculation. Deux familles
            de formats s&apos;offrent alors à vous : les dimensions homologuées actuelles
            (52&nbsp;×&nbsp;11&nbsp;cm, 45,5&nbsp;×&nbsp;10&nbsp;cm ou 27,5&nbsp;×&nbsp;20&nbsp;cm pour une voiture,
            21&nbsp;×&nbsp;13&nbsp;cm pour une moto), et les formats d&apos;époque, admis sur les véhicules
            de collection lorsque la plaque correspond aux règles en vigueur à la date de première
            mise en circulation.
          </p>
          <p className="text-forge-secondary font-body leading-relaxed text-sm">
            Le bon choix dépend donc de trois critères : le statut administratif de votre véhicule,
            son année, et le rendu que vous recherchez. Ce guide les passe en revue ; en cas de
            doute, vérifiez votre situation au regard de la réglementation en vigueur.
          </p>
        </div>

        {/* Section 1 : plaque noire et carte grise collection */}
        <section className="mb-12">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-5">
            La plaque noire : à quelles conditions&nbsp;?
          </h2>
          <p className="text-forge-secondary font-body leading-relaxed mb-4">
            Le fond noir à caractères clairs, c&apos;est la plaque que portaient toutes les voitures
            françaises jusqu&apos;en 1993. Aujourd&apos;hui, elle est réservée aux véhicules dont la
            carte grise porte la mention «&nbsp;véhicule de collection&nbsp;». Cette règle découle de
            l&apos;arrêté du 9 février 2009, qui définit dans son annexe les plaques spécifiques
            aux véhicules de collection.
          </p>
          <p className="text-forge-secondary font-body leading-relaxed mb-4">
            Attention à une idée reçue : avoir un véhicule de plus de 30 ans ne suffit pas.
            Sans la mention collection sur la carte grise, le fond noir n&apos;est pas admis sur la
            voie publique, quel que soit l&apos;âge du véhicule. La plaque reste alors décorative :
            exposition, garage, rassemblements.
          </p>
          <p className="text-forge-secondary font-body leading-relaxed">
            La carte grise collection s&apos;obtient auprès de l&apos;ANTS avec une attestation de la
            FFVE, pour un véhicule de plus de 30 ans conservé dans son état d&apos;origine. Outre la
            plaque noire, elle apporte un contrôle technique espacé (tous les 5 ans pour les
            voitures) et des dérogations de circulation dans certaines zones à faibles émissions.
          </p>
        </section>

        {/* Section 2 : homologué vs époque */}
        <section className="mb-12">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-5">
            Formats homologués ou formats d&apos;époque&nbsp;?
          </h2>
          <p className="text-forge-secondary font-body leading-relaxed mb-5">
            Quatre dimensions sont homologuées pour la route par la réglementation actuelle.
            Ce sont les valeurs sûres : elles conviennent à tous les véhicules immatriculés en
            collection, sans question à se poser.
          </p>
          <div className="card divide-y divide-forge-border overflow-hidden mb-5">
            {homologated.map((f) => (
              <div key={f.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-3">
                <span className="font-sans text-sm text-forge-text sm:w-32 shrink-0">
                  <FormatLink id={f.id}>{f.label}</FormatLink>
                </span>
                <span className="font-sans text-sm text-forge-secondary">
                  {f.category === "moto" ? "Moto" : "Voiture"} · {f.usage}
                </span>
              </div>
            ))}
          </div>
          <p className="text-forge-secondary font-body leading-relaxed">
            Les formats d&apos;époque, eux, sont ceux que portaient réellement les véhicules avant
            l&apos;uniformisation des dimensions : petites plaques moto hautes, bandeaux étroits,
            formats carrés. Sur un véhicule immatriculé en collection, une plaque conforme aux
            règles applicables à sa première mise en circulation reste admise : c&apos;est ce qui
            permet à une moto des années 60 de retrouver sa plaque d&apos;origine plutôt que le
            format moderne unique.
          </p>
        </section>

        {/* Section 3 : par type de véhicule */}
        <section className="mb-12">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-5">
            Pour une voiture ancienne
          </h2>
          <p className="text-forge-secondary font-body leading-relaxed mb-4">
            Le <FormatLink id="auto-52x11">52 × 11 cm</FormatLink> est le format le plus répandu :
            c&apos;est celui des berlines et coupés classiques, à l&apos;avant comme à l&apos;arrière.
            Le <FormatLink id="auto-455x10">45,5 × 10 cm</FormatLink>, plus court, équipe les faces
            avant étroites et les pare-chocs fins des voitures des années 50 à 70. Le{" "}
            <FormatLink id="auto-275x20">27,5 × 20 cm</FormatLink>, presque carré, correspond aux
            emplacements hauts des anciennes : 4L, 2CV, certains coupés anglais et italiens.
          </p>
          <p className="text-forge-secondary font-body leading-relaxed">
            Ces trois formats reprennent des dimensions homologuées : sur un véhicule en carte
            grise collection, ils se posent à l&apos;avant comme à l&apos;arrière.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-5">
            Pour une moto de collection
          </h2>
          <p className="text-forge-secondary font-body leading-relaxed mb-4">
            Le <FormatLink id="moto-21x13">21 × 13 cm</FormatLink> est l&apos;unique format moto
            homologué aujourd&apos;hui : c&apos;est le choix naturel des grosses cylindrées routières.
            Pour rester fidèle à l&apos;époque, les classiques comme le{" "}
            <FormatLink id="moto-17x13">17 × 13 cm</FormatLink> ou le{" "}
            <FormatLink id="moto-14x13">14 × 13 cm</FormatLink> habillent motos vintage,
            cyclomoteurs et mobylettes. Les allongés type{" "}
            <FormatLink id="moto-17x10">17 × 10 cm</FormatLink> vont aux Harley et customs, les
            carrés comme le <FormatLink id="moto-10x10">10 × 10 cm</FormatLink> aux enduros et
            petits deux-roues, et les bandeaux étroits type{" "}
            <FormatLink id="moto-18x5">18 × 5 cm</FormatLink> aux customs et café racers en
            recherche d&apos;épure.
          </p>
          <p className="text-forge-secondary font-body leading-relaxed">
            Nos formats moto classiques et allongés se commandent aussi en pose verticale : la
            plaque pivote et l&apos;immatriculation passe sur trois lignes, un groupe de caractères
            par ligne, comme sur les garde-boue d&apos;époque.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-5">
            Pour un véhicule américain
          </h2>
          <p className="text-forge-secondary font-body leading-relaxed">
            Muscle cars, pickups et imports gardent souvent leur support d&apos;origine, taillé pour
            les dimensions américaines. Nos formats <FormatLink id="us-30x15">30 × 15 cm</FormatLink>{" "}
            et <FormatLink id="us-30x17">30 × 17 cm</FormatLink> s&apos;y logent sans adaptateur ni
            perçage supplémentaire, avec le même fond noir et la même écriture que le reste de la
            gamme.
          </p>
        </section>

        {/* Section 4 : matière */}
        <section className="mb-12">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-5">
            La matière compte autant que le format
          </h2>
          <p className="text-forge-secondary font-body leading-relaxed mb-4">
            Une plaque de collection se choisit comme une pièce du véhicule. Les nôtres sont en
            aluminium brossé, avec l&apos;immatriculation en écriture pochoir, fidèle aux plaques
            que montaient les carrossiers d&apos;époque. L&apos;aluminium ne rouille pas, le brossé
            garde son aspect en intérieur comme en extérieur, et la plaque tient toute la vie du
            véhicule.
          </p>
          <p className="text-forge-secondary font-body leading-relaxed">
            Chaque plaque est fabriquée à la commande dans notre atelier alsacien, livrée sans
            perçage pour préserver la finition, avec des rivets de pose en option. Et si le rendu
            ne vous convient pas, nous refabriquons ou nous remboursons pendant 14 jours, même sur
            un produit personnalisé.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-6">
            Questions fréquentes sur les plaques de collection
          </h2>
          <div className="space-y-5">
            {GUIDE_FAQ.map(({ q, a }) => (
              <div key={q} className="card p-5">
                <h3 className="font-display text-base font-bold text-forge-text mb-2">{q}</h3>
                <p className="text-forge-secondary text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-forge-border bg-forge-card/60 px-8 py-12 text-center mb-12">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3 text-balance">
            Votre format est quelque part dans nos {PLATE_FORMATS.length} modèles
          </h2>
          <p className="text-forge-secondary font-body mb-7 max-w-md mx-auto leading-relaxed">
            Auto, moto ou US, homologué ou d&apos;époque : choisissez votre format, saisissez votre
            immatriculation et visualisez le rendu en temps réel.
          </p>
          <Link href="/catalogue" className="btn-cta">
            Trouver mon format
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>

        <ReassuranceBar className="rounded-lg" />
      </div>
    </div>
  );
}
