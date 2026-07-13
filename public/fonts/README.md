# Polices du configurateur

Les 5 polices proposées au client sont servies en fichiers locaux
(les fichiers de production fournis par Abdel, rendu identique à l'impression) :

| Fichier | Police | Poids | Entrée configurateur |
|---|---|---|---|
| `UKNumberPlate.woff` | UK Number Plate | 400 | Plaque standard (défaut) |
| `CalibriBold.woff2` | Calibri Bold | 700 | Calibri Bold |
| `StencilRegular.woff2` | Stencil | 400 | Stencil |
| `AmericanTypewriterBold.woff2` | American Typewriter Bold | 700 | Machine à écrire |
| `GunplayRg.woff` | Gunplay RG | 400 | Gunplay RG |

- Sources TTF d'origine : `context/import/POLICE/` dans le workspace Jarvis.
- `CalibriBold.woff2` est un sous-ensemble Latin (U+0020-007E, U+00A0-00FF)
  pour rester léger (~32 Ko au lieu de 277 Ko).
- Déclarations `@font-face` : `app/globals.css` (familles `CalibriPlate`,
  `StencilPlate`, `AmericanTypewriterPlate` pour ne pas entrer en conflit
  avec les polices système).
- IMPORTANT : le canvas ne déclenche pas le téléchargement des polices.
  Tout dessin doit passer par `loadPlateFont()` (`lib/fonts.ts`) avant de
  dessiner, sinon le rendu retombe sur la police de secours.

## Conversion TTF → WOFF2

```
python3 -m fontTools.subset police.ttf --unicodes="U+0020-007E,U+00A0-00FF" --flavor=woff2 --output-file=Police.woff2
```
