"use client";

import { useEffect } from "react";

// Adds .is-in to every [data-reveal] element the first time it enters the viewport.
// Streamed or client-rendered content arrives after this mounts, so new nodes are picked up as they appear.
export default function Reveal() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const show = (el: Element) => el.classList.add("is-in");

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                show(entry.target);
                io?.unobserve(entry.target);
              });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
          )
        : null;

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (io) io.observe(el);
        else show(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, []);

  return null;
}
