"use client";
import gsap from "gsap";
import LeftPanelBar from "@/components/panel/LeftPanelBar";
import UserPanel from "@/components/panel/UserPanel";
import "@/styles/UserPanel.page.css";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const userPanelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isOverlay, setIsOverlay] = useState(false);

  const panelWidth = 500;

  // Detectar si debe activarse modo overlay
  const checkOverlay = () => {
    setIsOverlay(window.innerWidth <= 1300);
  };

  useEffect(() => {
    checkOverlay();
    window.addEventListener("resize", checkOverlay);

    const panel = leftPanelRef.current;
    const content = userPanelRef.current;

    if (!panel || !content) return;

    if (window.innerWidth <= 1300) {
      gsap.set(panel, { x: isOpen ? 0 : "-100%" });
      gsap.set(content, { marginLeft: 0 });
    } else {
      gsap.set(panel, { x: isOpen ? 0 : -panelWidth });
      gsap.set(content, { marginLeft: isOpen ? panelWidth : 0 });
    }

    return () => window.removeEventListener("resize", checkOverlay);
  }, []);

  const animatePanels = (open: boolean) => {
    if (!leftPanelRef.current || !userPanelRef.current) return;

    const panel = leftPanelRef.current;
    const content = userPanelRef.current;

    if (isOverlay) {
      const hiddenX = -panel.offsetWidth;

      if (open) {
        gsap.to(panel, {
          x: hiddenX,
          duration: 0.3,
          ease: "power3.out",
          onComplete: () => {
            panel.style.display = "none";
          },
        });
      } else {
        panel.style.display = "block";
        gsap.fromTo(
          panel,
          { x: "-100%" },
          { x: 0, duration: 0.3, ease: "power3.out" }
        );
      }
    } else {
      if (open) {
        gsap.to(panel, {
          x: -panelWidth,
          duration: 0.3,
          ease: "power3.out",
          onComplete: () => {
            panel.style.display = "none";
          },
        });
        gsap.to(content, {
          marginLeft: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        panel.style.display = "block";
        gsap.fromTo(
          panel,
          { x: -panelWidth },
          { x: 0, duration: 0.3, ease: "power3.out" }
        );
        gsap.to(content, {
          marginLeft: panelWidth,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    }
  };

  const togglePanel = () => {
    animatePanels(isOpen);
    setIsOpen(!isOpen);
  };

  const toggleSearchComponent = () => {
    alert("Hola");
  };

  return (
    <>
      <LeftPanelBar
        togglePanel={togglePanel}
        isOpen={isOpen}
        isOverlay={isOverlay}
        parentRef={leftPanelRef}
        toggleSearchComponent={toggleSearchComponent}
      />
      <div
        className={`user-panel-body ${isOverlay ? "overlay-mode" : ""}`}
        ref={userPanelRef}
        style={{
          marginLeft: !isOverlay && isOpen ? panelWidth : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <UserPanel parentRef={userPanelRef} />
      </div>
    </>
  );
};

export default Page;
