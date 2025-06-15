"use client";
import React, { useEffect, useRef } from "react";
import "./GalleryPresentation.css";
import Gallery from "@/components/home/Gallery";
import { landsiteGalleryImages } from "@/utils/Utils.gallery";
import SplitText from "@/components/common/animations/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GalleryPresentation() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const columns = [
    { type: "type-1", images: landsiteGalleryImages.slice(0, 4) },
    { type: "type-2", images: landsiteGalleryImages.slice(4, 9) },
    { type: "type-3", images: landsiteGalleryImages.slice(9, 13) },
  ];

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
        },
      });
    }

    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.5,
        delay: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%",
        },
      });
    }

    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, filter: "blur(10px)", scale: 0.98 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: overlayRef.current,
            start: "top 90%",
          },
        }
      );

      const chars = overlayRef.current.querySelectorAll(".split-char");
      if (chars.length) {
        gsap.from(chars, {
          y: 12,
          opacity: 0,
          stagger: 0.012,
          duration: 0.28,
          delay: 0.06,
          ease: "power1.out",
          scrollTrigger: {
            trigger: overlayRef.current,
            start: "top 90%",
          },
        });
      }

      const btn = overlayRef.current.querySelector(".gallery-btn");
      if (btn) {
        gsap.from(btn, {
          y: 24,
          opacity: 0,
          scale: 0.95,
          duration: 0.26,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: overlayRef.current,
            start: "top 90%",
          },
        });
      }
    }
  }, []);

  // ✅ Bucle que asegura actualización de ScrollTrigger con cualquier tipo de scroll
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
    <div className="presentation-of-gallery">
      <h2 ref={titleRef}>
        Descubre <strong>más</strong> sobre nosotros
      </h2>
      <div className="extended-title" ref={subtitleRef}>
        Somos <strong>mucho más</strong> que una academia: formamos a personas
        de todos los rincones para
        <br /> dar a conocer y hacer crecer más al Ejército español.
      </div>
      <Gallery
        columns={columns}
        galleryRef={galleryRef}
        overlayRef={overlayRef}
      >
        <h2 className="gallery-header">
          <SplitText text="Comprueba nuestra galería" />
          <br />y<br />
          <SplitText text="redes sociales" />
        </h2>
        <a href="/gallery" className="gallery-btn">
          Ir a la galería
        </a>
      </Gallery>
    </div>
  );
}

export default GalleryPresentation;
