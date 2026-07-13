import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/livraison" }, title: "Livraison" };

export default function LivraisonPage() {
  return (
    <LegalShell title="Livraison">
      <h2>Fabrication à la demande</h2>
      <p>
        Chaque plaque étant fabriquée sur commande dans notre atelier en Alsace, un
        délai de fabrication de <strong>24 à 48 heures</strong> s&apos;applique avant
        l&apos;expédition.
      </p>

      <h2>Modes de livraison</h2>
      <p>
        À ce délai s&apos;ajoute le délai d&apos;acheminement selon le transporteur
        choisi au moment de la commande :
      </p>
      <ul>
        <li><strong>Colissimo</strong> — livraison à domicile (La Poste) ;</li>
        <li><strong>Chronopost</strong> — livraison express ;</li>
        <li><strong>Mondial Relay</strong> — livraison en point relais.</li>
      </ul>
      <p>
        Le mode de livraison, son tarif et son délai estimé sont indiqués lors du
        paiement, avant la validation de votre commande.
      </p>

      <h2>Suivi</h2>
      <p>
        Dès l&apos;expédition, un e-mail de confirmation contenant le numéro de suivi
        vous est envoyé, lorsque le transporteur le permet.
      </p>

      <h2>Retours</h2>
      <p>
        Nos plaques étant personnalisées, elles ne bénéficient pas du droit de
        rétractation et ne sont ni reprises ni échangées (voir nos{" "}
        <a href="/cgv">conditions générales de vente</a>). En cas de produit
        défectueux ou d&apos;erreur de notre part, contactez-nous à
        info@easymark68.com : nous procédons au remplacement ou au remboursement.
      </p>
    </LegalShell>
  );
}
