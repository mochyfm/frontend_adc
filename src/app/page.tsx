import React from "react";
import Navbar from "../components/common/Navbar";
import CentralPanel from "@/components/common/CentralPanel";
import InformationPanel from "@/components/home/InformationPanel";

import "../styles/Home.css";
import HeroSection from "@/components/home/HeroSection";
import MilitaryRanksPanel from "@/components/home/MilitaryRanksPanel";
import BenefitsADC from "@/components/home/BenefitsADC";
import GalleryPresentation from "@/components/home/GalleryPresentation";
import PlansSection from "@/components/home/PlansSection/PlansSection";
import Footer from "@/components/common/Footer";
import { SITE_URL } from "@/config";
import { Metadata } from "next";

// Año actual
const year = new Date().getFullYear();

/**
 * Metadatos para la Página de Inicio:
 * - title: título principal que aparece en la pestaña del navegador.
 * - description: resumen optimizado para motores de búsqueda.
 * - openGraph: define la vista previa al compartir el sitio en redes sociales.
 * - twitter: mejora la visualización del sitio en Twitter (Twitter Cards).
 * - icons: establece el favicon visible en la pestaña del navegador.
 */

export const metadata: Metadata = {
  title: "Inicio | Academia de Combate",
  description:
    "Prepárate para las oposiciones del Ejército de Tierra con Academia de Combate. Descubre nuestras características, planes de entrenamiento y ventajas para superar las pruebas psicotécnicas, físicas y poder elegir un destino acorde a tus necesidades.",
  openGraph: {
    title: "Inicio | Academia de Combate",
    description: "Prepárate para las oposiciones del ejército español",
    url: SITE_URL,
    siteName: "Academia de Combate",
    images: [
      {
        url: SITE_URL + "/common/favicon3.png",
        width: 1200,
        height: 630,
        alt: "Academia de Combate - Entrena para oposiciones",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    title: "Inicio | Academia de Combate",
    description:
      "Entrena para las oposiciones del Ejército de Tierra con Academia de Combate. Conoce nuestras ventajas y planes de preparación.",
    card: "summary_large_image",
    images: [SITE_URL + "/common/favicon3.png"],
  },
  icons: {
    icon: "/common/favicon3.png",
  },
};

export default function Home() {
  return (
    <>
      <h1 className="visually-hidden">
        Oposiciones Ejército de Tierra {year} en Academia de Combate
      </h1>
      <section id="inicio" className="section">
        <Navbar /> {/* Use client */}
        <CentralPanel /> {/* Use client */}
      </section>
      <section id="caracteristicas-adc" className="section gradient1">
        <InformationPanel /> {/* Use client */}
      </section>
      <section id="calcula-baremo" className="section gradient2">
        <HeroSection /> {/* Use client */}
      </section>
      <section id="empleos" className="section gradient3">
        <MilitaryRanksPanel /> {/* Use client */}
      </section>
      <section id="ventajas-adc" className="section">
        <BenefitsADC /> {/* Use client */}
      </section>
      <section id="nosotros" className="section">
        <GalleryPresentation /> {/* Use client */}
      </section>
      <section id="planes" className="section gradient1">
        <PlansSection /> {/* Use client */}
      </section>
      <Footer year={year} />
    </>
  );
}
