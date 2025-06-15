"use client";

import { contentData } from "../../../data/InformationContent";
import React, { useEffect, useRef, useState } from "react";
import { FaMedal, FaDumbbell, FaClock } from "react-icons/fa";
import "./InformationPanel.css";
import InformationCard from "@/components/home/InformationPanelCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ContentKey = "Medal" | "Dumbell" | "Clock";

const iconComponents: Record<ContentKey, React.ComponentType> = {
  Medal: FaMedal,
  Dumbell: FaDumbbell,
  Clock: FaClock,
};

function AnimatedContent({ activeKey }: { activeKey: ContentKey }) {
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
      ctx.revert();
    };
  }, [activeKey]);

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

export default function InformationPanel() {
  const [activeKey, setActiveKey] = useState<ContentKey>("Medal");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

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

  // ✅ Loop constante que fuerza ScrollTrigger.update()
  useEffect(() => {
    let animationFrame: number;

    const update = () => {
      ScrollTrigger.update();
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="information-panel" ref={panelRef}>
      <div className="background-blur" />

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

      <AnimatedContent activeKey={activeKey} />
    </div>
  );
}
