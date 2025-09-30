import React, { useState, useEffect, useRef } from "react";

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(media.matches);
    setPrefers(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return prefers;
}

export default function ImageSlideshow({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(true); // start paused

  const containerRef = useRef(null);
  const inViewRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Only consider autoplay when the slideshow is actually visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay timer (only when not paused, not reduced motion, and in view)
  useEffect(() => {
    if (paused || prefersReducedMotion || !inViewRef.current || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion, images.length]);

  const onPrev = () => setCurrent((p) => (p - 1 + images.length) % images.length);
  const onNext = () => setCurrent((p) => (p + 1) % images.length);

  return (
    <div className="project-media slideshow" ref={containerRef}>
      {/* slides */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          className={i === current ? "active" : "inactive"}
          loading="lazy"
          draggable={false}
        />
      ))}

      {/* controls */}
      <div className="controls">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()} // don’t steal focus (prevents jump)
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "▶️ Play" : "⏸ Pause"}
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onPrev} aria-label="Previous">
          ⟵
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onNext} aria-label="Next">
          ⟶
        </button>
      </div>
    </div>
  );
}