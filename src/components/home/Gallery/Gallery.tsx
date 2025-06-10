"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Gallery.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryColumn {
  type: string;
  images: string[];
}
interface GalleryProps {
  columns: GalleryColumn[];
  children?: React.ReactNode;
  galleryRef?: React.RefObject<HTMLDivElement | null>;
  overlayRef?: React.RefObject<HTMLDivElement | null>;
}

const Gallery: React.FC<GalleryProps> = ({
  columns,
  children,
  galleryRef,
  overlayRef,
}) => {
  const localGalleryRef = useRef<HTMLDivElement>(null);

  // Nueva lógica: Contar imágenes cargadas
  const totalImgs = columns.reduce((acc, col) => acc + col.images.length, 0);
  const [imgsLoaded, setImgsLoaded] = useState(0);

  // Solo lanzamos la animación cuando estén todas cargadas
  useEffect(() => {
    if (imgsLoaded < totalImgs) return;

    const gallery = galleryRef?.current ?? localGalleryRef.current;
    if (!gallery) return;
    const cols = gallery.querySelectorAll<HTMLDivElement>(".gallery-col");
    gsap.from(cols, {
      y: 80,
      opacity: 0,
      scale: 0.93,
      stagger: 0.2,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: gallery,
        start: "top 90%",
      },
    });
    // Solo cuando imgsLoaded cambie
  }, [imgsLoaded, totalImgs, galleryRef, columns]);

  // Handler para cada imagen
  const handleImgLoad = () => setImgsLoaded((c) => c + 1);

  // Render de columnas: pasamos onLoad a cada <img>
  return (
    <div
      className="gallery-slider-viewport"
      ref={galleryRef ?? localGalleryRef}
    >
      {children && (
        <div className="gallery-overlay-content" ref={overlayRef}>
          {children}
        </div>
      )}
      <div className="gallery-grid">
        {columns.map((col, idx) => {
          switch (col.type) {
            case "type-1":
              return (
                <div
                  className="gallery-col gallery-col-type-1"
                  key={idx + col.type}
                >
                  <div className="gallery-col-type-1-top">
                    <div className="gallery-col-type-1-left">
                      <img
                        src={col.images[0]}
                        alt=""
                        className="gallery-img"
                        loading="lazy"
                        onLoad={handleImgLoad}
                      />
                      <img
                        src={col.images[1]}
                        alt=""
                        className="gallery-img"
                        loading="lazy"
                        onLoad={handleImgLoad}
                      />
                    </div>
                    <div className="gallery-col-type-1-right">
                      <img
                        src={col.images[2]}
                        alt=""
                        className="gallery-img"
                        loading="lazy"
                        onLoad={handleImgLoad}
                      />
                    </div>
                  </div>
                  <div className="gallery-col-type-1-bottom">
                    <img
                      src={col.images[3]}
                      alt=""
                      className="gallery-img"
                      loading="lazy"
                      onLoad={handleImgLoad}
                    />
                  </div>
                </div>
              );
            case "type-2":
              return (
                <div
                  className="gallery-col gallery-col-type-2"
                  key={idx + col.type}
                >
                  <div className="gallery-col-type-2-top">
                    <div className="gallery-col-type-2-left">
                      <img
                        src={col.images[0]}
                        alt=""
                        className="gallery-img"
                        loading="lazy"
                        onLoad={handleImgLoad}
                      />
                    </div>
                    <div className="gallery-col-type-2-right">
                      <img
                        src={col.images[1]}
                        alt=""
                        className="gallery-img"
                        loading="lazy"
                        onLoad={handleImgLoad}
                      />
                      <img
                        src={col.images[2]}
                        alt=""
                        className="gallery-img"
                        loading="lazy"
                        onLoad={handleImgLoad}
                      />
                    </div>
                  </div>
                  <div className="gallery-col-type-2-bottom">
                    <img
                      src={col.images[3]}
                      alt=""
                      className="gallery-img"
                      loading="lazy"
                      onLoad={handleImgLoad}
                    />
                    <img
                      src={col.images[4]}
                      alt=""
                      className="gallery-img"
                      loading="lazy"
                      onLoad={handleImgLoad}
                    />
                  </div>
                </div>
              );
            case "type-3":
              return (
                <div
                  className="gallery-col gallery-col-type-3"
                  key={idx + col.type}
                >
                  <div className="gallery-col-type-3-grid">
                    <img
                      src={col.images[0]}
                      alt=""
                      className="gallery-img"
                      loading="lazy"
                      onLoad={handleImgLoad}
                    />
                    <img
                      src={col.images[1]}
                      alt=""
                      className="gallery-img"
                      loading="lazy"
                      onLoad={handleImgLoad}
                    />
                    <img
                      src={col.images[2]}
                      alt=""
                      className="gallery-img"
                      loading="lazy"
                      onLoad={handleImgLoad}
                    />
                    <img
                      src={col.images[3]}
                      alt=""
                      className="gallery-img"
                      loading="lazy"
                      onLoad={handleImgLoad}
                    />
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Gallery;
