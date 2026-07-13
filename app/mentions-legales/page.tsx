import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/mentions-legales" }, title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <LegalShell title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>plaques-collection.fr</strong> est édité par :
      </p>
      <ul>
        <li><strong>EASYMARK68</strong> — SARL au capital de 10 000 €</li>
        <li>Siège social : 2 rue de Prague, 68000 Colmar, France</li>
        <li>SIRET : 985 070 739 00018</li>
        <li>RCS : 985 070 739 R.C.S. Colmar</li>
        <li>N° TVA intracommunautaire : FR44 985 070 739</li>
        <li>Représentant légal / Directeur de la publication : Abdelatif Ziouche</li>
        <li>Contact : info@easymark68.com — 06 61 19 19 16</li>
      </ul>
      <p>
        « Plaques Collection » est une marque commerciale exploitée par EASYMARK68.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133,
        Walnut, CA 91789, États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
        Le traitement des commandes et des paiements est opéré via <strong>Shopify</strong>
        (Shopify International Ltd.).
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du site (textes, visuels, logo, mise en page,
        configurateur) est la propriété d&apos;EASYMARK68, sauf mention contraire.
        Toute reproduction ou utilisation sans autorisation préalable est interdite.
      </p>

      <h2>Crédits photographiques</h2>
      <p>
        Certaines photographies d&apos;illustration proviennent de Wikimedia Commons
        et sont utilisées sous licence Creative Commons (images recadrées et
        retouchées) :
      </p>
      <ul>
        <li>
          Citroën DS 21 cabriolet — photo{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Citro%C3%ABn_DS_21_27_Quai_Anatole_France_license_plate_blanked_2012-06-02.jpg" target="_blank" rel="noopener noreferrer">Slaunger, Wikimedia Commons</a>, licence{" "}
          <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>
        </li>
        <li>
          Jaguar E-Type Roadster 4.2 (1970) — photo{" "}
          <a href="https://commons.wikimedia.org/wiki/File:1970_Jaguar_E-Type_Roadster_4.2.jpg" target="_blank" rel="noopener noreferrer">Vauxford, Wikimedia Commons</a>, licence{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
        </li>
        <li>
          Porsche 911 Carrera RS (1972-73) — photo{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Porsche_911_Carrera_RS,_Bj._1972-73_(2016-07-02_01_Sp).JPG" target="_blank" rel="noopener noreferrer">Lothar Spurzem, Wikimedia Commons</a>, licence{" "}
          <a href="https://creativecommons.org/licenses/by-sa/2.0/de/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 DE</a>
        </li>
      </ul>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données personnelles est détaillé dans notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>Responsabilité</h2>
      <p>
        EASYMARK68 s&apos;efforce d&apos;assurer l&apos;exactitude des informations
        diffusées sur le site mais ne saurait être tenue responsable des erreurs,
        omissions ou d&apos;une indisponibilité temporaire du service.
      </p>
    </LegalShell>
  );
}
