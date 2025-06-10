"use client";

import { contentData } from "../../../data/InformationContent"; // ajusta la ruta según tu estructura

import React, { useEffect, useRef, useState } from "react";
import { FaMedal, FaDumbbell, FaClock } from "react-icons/fa";
import "./InformationPanel.css";
import InformationCard from "@/components/home/InformationPanelCard";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Tipos válidos para las keys de botones y contenido
 */
type ContentKey = "Medal" | "Dumbell" | "Clock";

/**
 * Mapeo de claves a componentes de iconos de React
 */
const iconComponents: Record<ContentKey, React.ComponentType> = {
  Medal: FaMedal,
  Dumbell: FaDumbbell,
  Clock: FaClock,
};

/**
 * Datos de contenido dinámico para cada botón
 */

/**
 * Componente para mostrar el contenido dinámico con animaciones GSAP
 * @param activeKey Clave que indica el contenido activo a mostrar
 */
function AnimatedContent({ activeKey }: { activeKey: ContentKey }) {
  // Ref al contenedor del contenido dinámico para animar
  const contentRef = useRef<HTMLDivElement | null>(null);

  /**
   * Efecto para animar la aparición del contenido
   * Se ejecuta cada vez que cambia activeKey
   */
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".animated-title",
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      tl.fromTo(
        ".animated-description",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        ">-0.6"
      );
      tl.fromTo(
        ".animated-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        ">-0.6"
      );
      tl.fromTo(
        ".animated-image",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        ">-0.6"
      );
    }, contentRef);

    return () => {
      if (ctx.scrollTrigger) ctx.scrollTrigger.kill();
      ctx.revert();
    };
  }, [activeKey]);

  // Extraemos los datos del contenido para la clave activa
  const { title, description, cards, imageSrc } = contentData[activeKey];

  return (
    <div className="information-block" ref={contentRef}>
      <h3
        className="animated-title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="information-content">
        <div className="information-left-block">
          <div
            className="information-description animated-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="information-cards-block">
            {cards.map(({ icon, title: cardTitle }, i) => (
              <InformationCard
                key={i}
                icon={icon}
                title={cardTitle}
                className="animated-card"
              />
            ))}
          </div>
        </div>
        <div className="information-right-block">
          <img className="animated-image" src={imageSrc} alt="" />
        </div>
      </div>
    </div>
  );
}

/**
 * Componente principal que contiene los botones y el contenido dinámico
 */
export default function InformationPanel() {
  // Estado para el botón activo (contenido activo)
  const [activeKey, setActiveKey] = useState<ContentKey>("Medal");

  // Ref al div principal para fondo difuminado y animaciones estáticas
  const panelRef = useRef<HTMLDivElement | null>(null);

  /**
   * Efecto para animar el fondo, botones y animaciones que no cambian al cambiar contenido
   * Se ejecuta solo una vez al montar el componente
   */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Selección de elementos estáticos
    const buttons = panel.querySelectorAll<HTMLAnchorElement>(
      ".information-button-panel a"
    );
    let backgroundBlur =
      panel.querySelector<HTMLDivElement>(".background-blur");

    if (!backgroundBlur) {
      backgroundBlur = document.createElement("div");
      backgroundBlur.classList.add("background-blur");
      panel.prepend(backgroundBlur);
    }

    // Timeline GSAP para animar botones y fondo
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(backgroundBlur, { opacity: 1, duration: 1 }, 0);

    buttons.forEach((btn, i) => {
      tl.fromTo(
        btn,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.2 + i * 0.2
      );
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="information-panel" ref={panelRef}>
      {/* Fondo difuminado animado */}
      <div className="background-blur" />

      {/* Panel de botones */}
      <div className="information-button-panel">
        {(Object.keys(iconComponents) as ContentKey[]).map((key) => {
          const Icon = iconComponents[key];
          return (
            <a
              key={key}
              className={activeKey === key ? "active" : ""}
              onClick={() => setActiveKey(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveKey(key);
              }}
              aria-pressed={activeKey === key}
              style={{ cursor: "pointer" }}
            >
              <Icon />
            </a>
          );
        })}
      </div>

      {/* Contenido dinámico con animaciones propias */}
      <AnimatedContent activeKey={activeKey} />
    </div>
  );
}
