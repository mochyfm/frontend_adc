"use client";

import React, { useEffect, useRef } from "react";
import "./BenefitsADC.css";
import BenefitCard from "../BenefitCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface CardData {
  title: string;
  content?: string;
  contentFontSize?: string; // <-- añadimos esto
}

const cards: CardData[] = [
  { title: "+ 2.000", content: "Alumnos han pasado por aquí y sumando..." },
  { title: "La <u>mejor nota</u> del segundo ciclo de 2023." },
  { title: "+ 4.500", content: "Test psicotécnicos disponibles." },
  {
    title: "+ 80",
    content: "Clases disponibles de orientación militar con militares en Activo.",
  },
  {
    title: "100 %",
    content: `<span class="benefits-important">Online:</span> Aprende y participa a tu ritmo.`,
  },
  { title: "5", content: "Clases a la semana.", contentFontSize: "2rem" }, // <-- aquí lo aplicas
  { title: "24/7", content: "Contacto directo por Whatsapp/Telegram." },
  {
    title: "+ 30",
    content: `Orientadores para resolver tus dudas. De una <span class="benefits-important">Gran variedad</span> de destinos.`,
  },
];


function isMobile() {
  return window.matchMedia("(max-width: 700px)").matches;
}

function BenefitsADC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRefs = [
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
  ];
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animación títulos
    gsap.fromTo(
      titleRefs[0].current,
      { x: "-100vw", opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
    gsap.fromTo(
      titleRefs[1].current,
      { x: "100vw", opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );

    // Solo UNA animación de cartas según dispositivo
    const total = cardRefs.current.length;

    if (isMobile()) {
      gsap.fromTo(
        cardRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
      const step = 0.13;
      for (let i = 0; i < Math.ceil(total / 2); i++) {
        const elA = cardRefs.current[i];
        const elB = cardRefs.current[total - 1 - i];
        tl.fromTo(
          [elA, elB].filter(Boolean),
          { y: -40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
          },
          "+=" + (i === 0 ? 0.45 : step)
        );
      }
    }
  }, []);

  cardRefs.current = [];

  return (
    <div className="benefits-body" ref={containerRef}>
      <h2 className="benefits-title" ref={titleRefs[0]} style={{ opacity: 0 }}>
        No solo te preparamos para la oposición
      </h2>
      <h3 className="benefits-title" ref={titleRefs[1]} style={{ opacity: 0 }}>
        Te preparamos para ser un{" "}
        <span className="benefits-important">buen militar</span>
      </h3>
      <div className="benefits-cards">
        {cards.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            style={{ opacity: 0 }}
          >
            <BenefitCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BenefitsADC;
