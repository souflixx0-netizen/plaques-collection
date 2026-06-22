import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <LegalShell title="Politique de confidentialité">
      <p>
        EASYMARK68 (« Plaques Collection ») accorde une grande importance à la
        protection de vos données personnelles, conformément au Règlement général
        sur la protection des données (RGPD) et à la loi Informatique et Libertés.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        EASYMARK68, 2 rue de Prague, 68000 Colmar — info@easymark68.com.
      </p>

      <h2>Données collectées</h2>
      <p>Dans le cadre d&apos;une commande, nous collectons :</p>
      <ul>
        <li>vos coordonnées (nom, prénom, e-mail, téléphone) ;</li>
        <li>votre adresse de livraison et de facturation ;</li>
        <li>le détail de votre commande (formats, personnalisation) ;</li>
        <li>les données de paiement, traitées directement par notre prestataire et jamais stockées par nos soins.</li>
      </ul>

      <h2>Finalités et base légale</h2>
      <p>
        Ces données servent au traitement et au suivi de vos commandes, à la
        livraison, à la facturation et au service client (exécution du contrat),
        ainsi qu&apos;au respect de nos obligations légales et comptables.
      </p>

      <h2>Destinataires</h2>
      <p>
        Vos données sont transmises uniquement aux prestataires nécessaires à
        l&apos;exécution de votre commande : la plateforme de commande et de paiement
        (Shopify) et les transporteurs (Colissimo, Chronopost, Mondial Relay). Elles
        ne sont jamais vendues à des tiers.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données liées aux commandes sont conservées le temps nécessaire au
        traitement puis archivées conformément aux obligations légales (notamment
        comptables).
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
        de limitation, d&apos;opposition et de portabilité de vos données. Pour les
        exercer, écrivez à info@easymark68.com. Vous pouvez également introduire une
        réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
      </p>

      <h2>Cookies</h2>
      <p>
        Le site utilise des cookies nécessaires à son fonctionnement (panier,
        sécurité) et, le cas échéant, des cookies de mesure d&apos;audience. Vous
        pouvez configurer votre navigateur pour les refuser.
      </p>
    </LegalShell>
  );
}
