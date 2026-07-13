import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Plaques Collection — plaques d'immatriculation de collection fabriquées en Alsace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const plateFont = await readFile(
    join(process.cwd(), "public/fonts/UKNumberPlate.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          gap: 36,
        }}
      >
        {/* Plaque noire liseré or, comme le produit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "6px solid #c8a96e",
            borderRadius: 18,
            background: "#111111",
            padding: "36px 84px",
          }}
        >
          <div
            style={{
              fontFamily: "UKNumberPlate",
              fontSize: 96,
              color: "#e8e4da",
              letterSpacing: 8,
            }}
          >
            PLAQUES COLLECTION
          </div>
        </div>
        <div
          style={{
            fontFamily: "UKNumberPlate",
            fontSize: 30,
            color: "#9c958a",
            letterSpacing: 6,
          }}
        >
          ALUMINIUM BROSSÉ · FABRIQUÉ EN ALSACE · DEPUIS 2005
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "UKNumberPlate", data: plateFont, style: "normal" }],
    }
  );
}
