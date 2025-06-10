"use client";

import React, { useEffect, useRef, useState } from "react";
import "./MilitaryRanksPanel.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MilitaryRanks from "@/components/home/MilitaryRanks";
import militaryRanks from "@/data/militaryRanks";

gsap.registerPlugin(ScrollTrigger);

type ArmyKey = "Tierra" | "Armada" | "IMT" | "Aire";

const iconPaths: Record<ArmyKey, string> = {
  Tierra: "/common/escudos/ET.png",
  Armada: "/common/escudos/Armada.png",
  IMT: "/common/escudos/IMT.png",
  Aire: "/common/escudos/EA.png",
};

const dataMap: Record<ArmyKey, any[]> = {
  Tierra: militaryRanks.empleosEjercitoTierra,
  Armada: militaryRanks.empleosArmadaBuques,
  IMT: militaryRanks.empleosInfanteriaMarina,
  Aire: militaryRanks.empleosAireEspacio,
};

function AnimatedContent({ activeKey }: { activeKey: ArmyKey }) {
  const contentRef = useRef<HTMLDivElement | null>(null);

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
        ".military-ranks-group",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        ">-0.5"
      );
    }, contentRef);

    return () => {
      ctx.revert();
    };
  }, [activeKey]);

  const renderText = (army: ArmyKey) => {
    switch (army) {
      case "Tierra":
        return "Tierra";
      case "Armada":
        return "Armada";
      case "IMT":
        return "Infantería de Marina";
      case "Aire":
        return "Aire";
    }
  };

  return (
    <div className="ranks-block" ref={contentRef}>
      <h4 className="animated-title">Empleos - {renderText(activeKey)}</h4>
      <div className="military-central-panel">
        <MilitaryRanks empleos={dataMap[activeKey]} />
      </div>
    </div>
  );
}

export default function MilitaryRanksPanel() {
  const [activeKey, setActiveKey] = useState<ArmyKey>("Tierra");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const buttons = panel.querySelectorAll<HTMLAnchorElement>(
      ".military-button-panel a"
    );
    let backgroundBlur =
      panel.querySelector<HTMLDivElement>(".background-blur");

    if (!backgroundBlur) {
      backgroundBlur = document.createElement("div");
      backgroundBlur.classList.add("background-blur");
      panel.prepend(backgroundBlur);
    }

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
      tl.kill();
    };
  }, []);

  return (
    <div className="military-panel" ref={panelRef}>
      <div className="background-blur" />
      <div className="military-button-panel right">
        {(Object.keys(iconPaths) as ArmyKey[]).map((key) => (
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
            <img
              src={iconPaths[key]}
              alt={`${key} escudo`}
              className={`${key.toLowerCase()}-icon army-icon`}
            />
          </a>
        ))}
      </div>
      <AnimatedContent activeKey={activeKey} />
    </div>
  );
}
