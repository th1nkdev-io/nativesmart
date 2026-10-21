import type { Directive } from "vue";

/*
 * Small motion toolkit of the editorial pages. Everything is progressive: without JavaScript or
 * with "reduce motion" the content is simply shown, still and complete.
 */

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let revealObserver: IntersectionObserver | undefined;
function observeReveal(element: Element) {
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        revealObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  revealObserver.observe(element);
}

/**
 * Fades and slides an element in the first time it enters the screen.
 * `v-reveal` slides up, `v-reveal:left`, `:right`, `:scale` or `:fade` change the movement;
 * the value is a delay in milliseconds, handy to stagger a list.
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(element, binding) {
    element.classList.add("reveal", `reveal--${binding.arg ?? "up"}`);
    if (binding.value) element.style.setProperty("--reveal-delay", `${binding.value}ms`);
    if (reduced()) element.classList.add("is-in");
    else observeReveal(element);
  },
  unmounted(element) {
    revealObserver?.unobserve(element);
  }
};

/** Tilts an element in 3D toward the pointer. The strength is in degrees (default 8). */
export const vTilt: Directive<HTMLElement, number | undefined> = {
  mounted(element, binding) {
    if (reduced()) return;
    const strength = binding.value ?? 8;
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty("--tilt-x", `${(-y * strength).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(x * strength).toFixed(2)}deg`);
      element.style.setProperty("--pointer-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      element.style.setProperty("--pointer-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    };
    const leave = () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
  }
};

/** Follows the pointer with a soft light, through --spot-x and --spot-y. */
export const vSpotlight: Directive<HTMLElement> = {
  mounted(element) {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  }
};

/** Counts from zero up to the number written in the element when it enters the screen. */
export const vCount: Directive<HTMLElement, number> = {
  mounted(element, binding) {
    const target = binding.value;
    element.textContent = String(target);
    if (reduced() || target === 0) return;
    element.textContent = "0";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1100 + Math.min(target, 200) * 3;
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    observer.observe(element);
  },
  updated(element, binding) {
    if (binding.value !== binding.oldValue) element.textContent = String(binding.value);
  }
};

declare module "vue" {
  interface GlobalDirectives {
    vReveal: typeof vReveal;
    vTilt: typeof vTilt;
    vSpotlight: typeof vSpotlight;
    vCount: typeof vCount;
  }
}
