import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function CGVPage() {
  return (
    <LegalShell title="Conditions générales de vente">
      <h2>1. Identité du vendeur</h2>
      <p>
        Les présentes conditions régissent les ventes réalisées sur
        plaques-collection.fr par <strong>EASYMARK68</strong>, SARL au capital de
        10 000 €, dont le siège est 2 rue de Prague, 68000 Colmar — SIRET
        985 070 739 00018 — RCS Colmar — TVA FR44 985 070 739 (ci-après « le Vendeur »).
        Contact : info@easymark68.com.
      </p>

      <h2>2. Produits</h2>
      <p>
        Le Vendeur propose des plaques d&apos;immatriculation <strong>de collection</strong>,
        en aluminium, personnalisables et fabriquées en Alsace. Ces plaques sont des
        produits personnalisés, confectionnés selon les indications du client.
      </p>
      <p>
        <strong>Usage :</strong> la pose sur la voie publique est strictement réservée
        aux véhicules immatriculés en collection conformément à la réglementation en
        vigueur. Pour tout autre véhicule, ces plaques sont destinées à un usage
        décoratif ou d&apos;exposition. Il appartient au client de s&apos;assurer de la
        conformité de son usage.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises (TVA française
        applicable). Les frais de livraison sont précisés avant la validation de la
        commande, lors du paiement. Le Vendeur se réserve le droit de modifier ses
        prix à tout moment, les produits étant facturés sur la base des tarifs en
        vigueur au moment de la commande.
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        La commande est validée après acceptation des présentes CGV et confirmation
        du paiement. Le paiement s&apos;effectue de manière sécurisée via la plateforme
        Shopify. La commande n&apos;est définitive qu&apos;après encaissement.
      </p>

      <h2>5. Fabrication et livraison</h2>
      <p>
        Chaque plaque étant fabriquée à la demande, le délai de fabrication est
        généralement de <strong>24 à 48 heures</strong>, auquel s&apos;ajoute le délai
        d&apos;expédition selon le mode de livraison choisi (Colissimo, Chronopost ou
        Mondial Relay). Les modalités détaillées figurent sur la page{" "}
        <a href="/livraison">Livraison</a>.
      </p>

      <h2>6. Droit de rétractation</h2>
      <p>
        Conformément à l&apos;<strong>article L221-28 3° du Code de la consommation</strong>,
        le droit de rétractation ne peut être exercé pour les biens confectionnés
        selon les spécifications du consommateur ou nettement personnalisés. Nos
        plaques étant personnalisées, <strong>elles ne sont ni reprises ni échangées</strong>
        au titre du droit de rétractation légal, sauf défaut de fabrication ou erreur de
        notre part. Cette exclusion légale est toutefois assortie de la garantie commerciale
        « satisfait ou remboursé » décrite à l&apos;article 7.
      </p>

      <h2>7. Garanties</h2>
      <p>
        Le client bénéficie des garanties légales de conformité (art. L217-3 et
        suivants du Code de la consommation) et des vices cachés (art. 1641 du Code
        civil). En cas de produit défectueux ou non conforme à la commande, le
        Vendeur procède au remplacement ou au remboursement.
      </p>
      <p>
        <strong>Garantie commerciale « satisfait ou remboursé ».</strong> Indépendamment
        des garanties légales ci-dessus et bien que les produits soient personnalisés, le
        Vendeur s&apos;engage, à titre commercial et volontaire, à reprendre toute plaque
        qui ne donnerait pas satisfaction au client. Pour en bénéficier, le client contacte
        le Vendeur à info@easymark68.com dans un délai de <strong>14 jours</strong> suivant
        la réception ; après retour de la plaque en bon état, le Vendeur procède, au choix
        du client, à une nouvelle fabrication ou au remboursement du produit. Cette garantie
        commerciale ne restreint ni ne remplace les garanties légales dont bénéficie le client.
      </p>

      <h2>8. Réclamations et médiation</h2>
      <p>
        Toute réclamation peut être adressée à info@easymark68.com. Le Vendeur
        s&apos;efforce de résoudre amiablement toute difficulté ; le client est
        invité à le contacter en priorité. Conformément à l&apos;article L612-1
        du Code de la consommation, le client peut recourir gratuitement à un
        médiateur de la consommation en vue de la résolution amiable d&apos;un
        litige. Les coordonnées du médiateur compétent seront communiquées au
        client sur demande et publiées sur cette page.
      </p>
      <p>
        Conformément au règlement (UE) n°524/2013, le client peut également
        utiliser la plateforme européenne de règlement en ligne des litiges :{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. À défaut de résolution
        amiable, tout litige relève des tribunaux compétents.
      </p>
    </LegalShell>
  );
}
