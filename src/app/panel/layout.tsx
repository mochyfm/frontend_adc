import "@/styles/UserPanel.layout.css";
import { SITE_URL } from "@/config";
import { Metadata } from "next";

/**
 * Metadatos para el Panel del Alumno:
 * - title: aparece en la pestaña del navegador y mejora el SEO.
 * - description: resumen visible en motores de búsqueda.
 * - openGraph: mejora cómo se ve la URL al compartir en redes (Facebook, LinkedIn, etc.).
 * - twitter: configuración de la vista previa en Twitter (Twitter Cards).
 * - icons: define el favicon que se mostrará en la pestaña del navegador.
 */

export const metadata: Metadata = {
  title: "Panel del Alumno | Academia de Combate",
  description:
    "Accede a tu panel personal para seguir tu progreso, entrenamientos y recursos exclusivos de Academia de Combate.",
  openGraph: {
    title: "Panel del Alumno | Academia de Combate",
    description:
      "Área privada para alumnos de Academia de Combate. Sigue tu progreso y accede a tus recursos de preparación.",
    url: SITE_URL + "/panel",
    siteName: "Academia de Combate",
    images: [
      {
        url: SITE_URL + "/common/favicon3.png",
        width: 1200,
        height: 630,
        alt: "Academia de Combate - Área del Alumno",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    title: "Panel del Alumno | Academia de Combate",
    description:
      "Accede a tu espacio personal de Academia de Combate. Revisa tu avance y entrena con nosotros.",
    card: "summary_large_image",
    images: [SITE_URL + "/common/favicon3.png"],
  },
  icons: {
    icon: "/common/favicon3.png",
  },
};

const Page = ({ children }: { children: React.ReactNode }) => {
  return <section className="user-panel-section">{children}</section>;
};

export default Page;
