"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SOCIAL_MEDIA } from "../../../constants";
import "./CentralPanel.css";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(TextPlugin);

const CentralPanel: React.FC = () => {
  const firstLineRef = useRef<HTMLSpanElement>(null);
  const secondLineRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (firstLineRef.current && secondLineRef.current && cursorRef.current) {
      gsap.fromTo(
        firstLineRef.current!,
        { text: "" },
        {
          duration: 1, // un poco más lento
          text: "Te damos la bienvenida a ",
          ease: "power1.out", // easing suave
          onComplete: () => {
            gsap.fromTo(
              secondLineRef.current!,
              { text: "" },
              {
                duration: 1,
                text: "Academia de Combate.",
                ease: "power1.out",
              }
            );
          },
        }
      );
    }
  }, []);

  return (
    <div className="central-home-panel">
      <h2 className="central-text">
        <span ref={firstLineRef} className="typing-text"></span>
        <br />
        <strong className="typing-strong">
          <span ref={secondLineRef}></span>
          <span ref={cursorRef} className="typing-cursor">
            _
          </span>
        </strong>
      </h2>
      <div className="central-button-panel">
        <a
          className="btn-startNow"
          href={SOCIAL_MEDIA.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comienza Hoy
          <FiArrowRight />
        </a>
        <a
          className="btn-meritCalc"
          href="/meritCalc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Calculadora Baremo
        </a>
      </div>
    </div>
  );
};

export default CentralPanel;