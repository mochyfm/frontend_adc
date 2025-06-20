"use client";
import gsap from "gsap";
import LeftPanelBar from "@/components/panel/LeftPanelBar";
import UserPanel from "@/components/panel/UserPanel";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const userPanelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  const animatePanels = (open: boolean, isMobile: boolean) => {
    if (!leftPanelRef.current || !userPanelRef.current) return;

    const panel = leftPanelRef.current;
    const content = userPanelRef.current;

    if (isMobile) {
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
          {
            x: 0,
            duration: 0.3,
            ease: "power3.out",
          }
        );
      }
    } else {
      if (open) {
        gsap.to(panel, {
          width: 0,
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
          { width: 0 },
          {
            width: 500,
            duration: 0.3,
            ease: "power3.out",
          }
        );
        gsap.to(content, {
          marginLeft: 500,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    }
  };
  const togglePanel = () => {
    const isMobile = window.innerWidth <= 999;
    animatePanels(isOpen, isMobile);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 999;

    if (!leftPanelRef.current || !userPanelRef.current) return;

    const panel = leftPanelRef.current;
    const content = userPanelRef.current;

    if (isMobile) {
      gsap.set(panel, { x: isOpen ? 0 : "-100%" });
      gsap.set(content, { marginLeft: 0 });
    } else {
      gsap.set(panel, {
        x: 0,
        width: isOpen ? 500 : 0,
      });

      gsap.set(content, {
        marginLeft: isOpen ? 500 : 0,
      });
    }
  }, []);

  return (
    <>
      <div
        className="left-panel-bar-body"
        style={{
          width: isOpen ? 500 : 0,
        }}
      >
        <LeftPanelBar
          togglePanel={togglePanel}
          isOpen={isOpen}
          parentRef={leftPanelRef}
        />
      </div>

      <div
        ref={userPanelRef}
        className="user-panel-body"
        style={{
          marginLeft: isOpen ? 500 : 0,
        }}
      >
        <UserPanel parentRef={userPanelRef} />
      </div>
    </>
  );
};

export default Page;
