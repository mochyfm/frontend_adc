import React, { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./WidgetWrapper.css";

type WidgetWrapperProps = {
  children: ReactNode;
  intervalSeconds?: number;
};

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  children,
  intervalSeconds = 30,
}) => {
  const intervalMs = intervalSeconds * 1000;

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(intervalMs);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const childrenArray = React.Children.toArray(children);
  const isMultiple = childrenArray.length > 1;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRefs = useRef<Array<HTMLDivElement | null>>([]);

  const animateToNext = () => {
    const nextIndex = (index + 1) % childrenArray.length;

    const currentEl = widgetRefs.current[index];
    const nextEl = widgetRefs.current[nextIndex];

    if (!currentEl || !nextEl) return;

    gsap.to(currentEl, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setIndex(nextIndex);
        gsap.fromTo(nextEl, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      },
    });
  };

  useEffect(() => {
    if (!isMultiple) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          animateToNext();
          return intervalMs;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, isMultiple, intervalMs]);

  const handleMouseEnter = () => {
    if (isMultiple) setTimeLeft(intervalMs / 2);
  };

  return (
    <div className="widget-wrapper" ref={containerRef}>
      <div className="widget-wrapper__container">
        {childrenArray.map((child, i) => (
          <div
            key={i}
            className={`widget-wrapper__child ${i === index ? "active" : ""}`}
            ref={(el) => {
              widgetRefs.current[i] = el;
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetWrapper;
