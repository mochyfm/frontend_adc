"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const contentRef = useRef<HTMLDivElement[]>([]);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título: palabras desde abajo con stagger
      gsap.from(wordsRef.current, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Texto contenido
      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        stagger: 0.3,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Botón
      gsap.from(buttonRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 🔄 Fuerza actualización de ScrollTrigger en interacciones no estándar
  useEffect(() => {
    const update = () => ScrollTrigger.update();

    window.addEventListener("keydown", update);
    window.addEventListener("mousedown", update);
    window.addEventListener("mouseup", update);
    window.addEventListener("wheel", update);

    return () => {
      window.removeEventListener("keydown", update);
      window.removeEventListener("mousedown", update);
      window.removeEventListener("mouseup", update);
      window.removeEventListener("wheel", update);
    };
  }, []);

  const splitTitle = "Calcula tu Baremo".split(" ");

  return (
    <div className="hero-block" ref={sectionRef}>
      <h2 className="hero-header">
        {splitTitle.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            style={{ display: "inline-block", marginRight: "0.5ch" }}
          >
            {word}
          </span>
        ))}
      </h2>
      <div className="hero-content">
        <div
          ref={(el) => {
            if (el) contentRef.current[0] = el;
          }}
        >
          El baremo <strong>complementa</strong> las pruebas físicas y
          psicotécnicas, y sirve para ordenar a los aspirantes según su{" "}
          <strong>puntuación total.</strong>
        </div>
        <div
          ref={(el) => {
            if (el) contentRef.current[1] = el;
          }}
        >
          Usa nuestra{" "}
          <strong>
            <a href="/meritCalc">
              calculadora <u>gratuita</u>
            </a>
          </strong>{" "}
          y descubre qué puntuación necesitas según tu destino.
        </div>
      </div>
      <a className="hero-button" href="/meritCalc" ref={buttonRef}>
        Calculadora baremo
      </a>
    </div>
  );
}

export default HeroSection;
