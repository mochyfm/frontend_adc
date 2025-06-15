"use client";
import { useRef, useEffect } from "react";
import PlanCard from "@/components/common/PlanCard";
import { plansAndAttributes } from "@/utils/Utils.plans";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PlansSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function PlansSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
      },
    });

    if (cardsRef.current.length) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: titleRef.current,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // ✅ Bucle para mantener ScrollTrigger actualizado con cualquier tipo de scroll
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
    <section className="plans-section">
      <h2 className="plans-header" ref={titleRef}>
        Elige entre <strong>{plansAndAttributes.length}</strong> planes
      </h2>
      <div className="plans-block">
        {plansAndAttributes.map((plan, idx) => (
          <PlanCard
            key={plan.planType || plan.cardTitle}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            {...plan}
          />
        ))}
      </div>
    </section>
  );
}
