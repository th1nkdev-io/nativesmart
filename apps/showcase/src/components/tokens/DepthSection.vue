<script setup lang="ts">
import { getContractsByCategory } from "@nativesmart/contracts";
import { primitives, type PbrMaterial } from "@nativesmart/tokens";
import { computed, reactive, ref } from "vue";
import Icon from "../../editorial/Icon.vue";
import SegControl from "./SegControl.vue";
import TokenCode from "./TokenCode.vue";

const { depth } = primitives;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Perspective */
const perspectives = Object.entries(depth.perspective) as [
  keyof typeof depth.perspective,
  number
][];
const perspectiveText: Record<keyof typeof depth.perspective, string> = {
  near: "Spectaculaire, objets proches",
  normal: "Par défaut : cartes, retournements",
  far: "Discret : grandes surfaces",
  flat: "Presque plat : listes, textes"
};

/* Exploded layers */
const exploded = ref<"flat" | "exploded">("exploded");
const explodedOptions = [
  { value: "flat", label: "À plat", icon: "rows" },
  { value: "exploded", label: "Éclaté", icon: "layers" }
] as const;
const stackLayers = [
  { key: 0, label: "Fond", className: "is-bg" },
  { key: 1, label: "Image", className: "is-image" },
  { key: 2, label: "Carte", className: "is-card" },
  { key: 3, label: "Texte", className: "is-text" },
  { key: 4, label: "Bouton", className: "is-button" },
  { key: 5, label: "Badge", className: "is-badge" }
] as const;

/* Tilt */
const tiltLevel = ref<keyof typeof depth.tilt>("normal");
const tiltOptions = (Object.keys(depth.tilt) as (keyof typeof depth.tilt)[]).map((key) => ({
  value: key,
  label: key,
  hint: `${depth.tilt[key]}°`
}));
const pointer = reactive({ x: 0.5, y: 0.5, active: false });
function track(event: PointerEvent) {
  const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
  pointer.x = (event.clientX - box.left) / box.width;
  pointer.y = (event.clientY - box.top) / box.height;
  pointer.active = true;
}
function leave() {
  Object.assign(pointer, { x: 0.5, y: 0.5, active: false });
}
const tiltStyle = computed(() => {
  const max = reducedMotion ? 0 : depth.tilt[tiltLevel.value];
  return {
    "--rx": `${(0.5 - pointer.y) * 2 * max}deg`,
    "--ry": `${(pointer.x - 0.5) * 2 * max}deg`,
    "--gx": `${pointer.x * 100}%`,
    "--gy": `${pointer.y * 100}%`
  };
});

/* PBR materials */
const pbrNames: Record<PbrMaterial, string> = {
  matte: "Mat",
  satin: "Satiné",
  glossy: "Brillant",
  metal: "Métal brossé",
  chrome: "Chrome",
  glass: "Verre"
};
const pbr = Object.entries(depth.pbr) as [PbrMaterial, (typeof depth.pbr)[PbrMaterial]][];
function sphereStyle(name: PbrMaterial) {
  const { roughness, metalness } = depth.pbr[name];
  const spot = 6 + roughness * 34;
  const shine = 0.95 - roughness * 0.75;
  return {
    "--spot": `${spot}%`,
    "--shine": shine.toFixed(2),
    "--base": metalness ? "var(--ns-palette-neutral-400)" : "var(--ns-color-primary)",
    "--edge": metalness ? "var(--ns-palette-neutral-800)" : "var(--ns-palette-primary-800)"
  };
}

/* Camera */
const fovs = Object.entries(depth.fov) as [keyof typeof depth.fov, number][];
const fovText: Record<keyof typeof depth.fov, string> = {
  narrow: "Produit, portrait",
  normal: "Par défaut",
  wide: "Pièces, paysages",
  ultra: "Immersion, jeux"
};
/** Wedge of the field of view, from a camera at (16, 65) looking right. */
function frustum(fov: number) {
  const half = ((fov / 2) * Math.PI) / 180;
  const radius = 104;
  const x = 16 + Math.cos(half) * radius;
  const spread = Math.sin(half) * radius;
  return `M16 65 L${x.toFixed(1)} ${(65 - spread).toFixed(1)} A${radius} ${radius} 0 0 1 ${x.toFixed(1)} ${(65 + spread).toFixed(1)} Z`;
}

/* Lights */
type LightName = keyof typeof depth.lights;
const lightNames: Record<LightName, string> = {
  key: "Principale",
  fill: "Remplissage",
  rim: "Contour",
  ambient: "Ambiante"
};
const lightsOn = reactive<Record<LightName, boolean>>({
  key: true,
  fill: true,
  rim: true,
  ambient: true
});
const lights = Object.entries(depth.lights) as [LightName, (typeof depth.lights)[LightName]][];
const litSphere = computed(() => {
  const layers: string[] = [];
  for (const [name, light] of lights) {
    if (!lightsOn[name] || name === "ambient") continue;
    const angle = (light.azimuth * Math.PI) / 180;
    const x = 50 + Math.sin(angle) * 34;
    const y = 50 - (light.elevation / 90) * 34 - (Math.abs(light.azimuth) > 90 ? 10 : 0);
    const alpha = Math.min(0.9, light.intensity * 0.55);
    const size = name === "rim" ? 30 : 58;
    layers.push(
      `radial-gradient(circle at ${x.toFixed(0)}% ${y.toFixed(0)}%, rgba(255,255,255,${alpha}), transparent ${size}%)`
    );
  }
  const ambient = lightsOn.ambient ? depth.lights.ambient.intensity : 0;
  layers.push(
    `radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--ns-color-primary) ${Math.round(40 + ambient * 120)}%, #000) 0%, color-mix(in srgb, var(--ns-color-primary) ${Math.round(10 + ambient * 80)}%, #000) 100%)`
  );
  return { background: layers.join(", ") };
});
/** Position of a light around the subject, seen from above. */
function lightDot(light: { azimuth: number }) {
  const angle = (light.azimuth * Math.PI) / 180;
  return { left: `${50 + Math.sin(angle) * 40}%`, top: `${50 + Math.cos(angle) * 40}%` };
}

/* Interaction */
const rotations = Object.entries(depth.interaction.autoRotate) as [string, number][];
const parallax = Object.entries(depth.interaction.parallax) as [string, number][];

const components = getContractsByCategory("immersive");
</script>

<template>
  <div class="token-sections depth-page">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Perspective</h2>
        <p>
          La distance entre l'œil et l'écran. Courte, l'objet se déforme et paraît tout proche ;
          longue, la 3D devient un léger relief. Les quatre cartes tournent à la même vitesse.
        </p>
      </header>
      <div class="depth-cubes lab-preview">
        <figure v-for="[key, value] in perspectives" :key="key">
          <div class="depth-cube-stage" :style="{ perspective: `${value}px` }">
            <div class="depth-flip">
              <span class="depth-flip__front"><Icon name="sparkles" :size="18" /> Recto</span>
              <span class="depth-flip__back">Verso</span>
            </div>
          </div>
          <figcaption>
            <strong>{{ key }} · {{ value }} px</strong>
            <span class="muted">{{ perspectiveText[key] }}</span>
            <TokenCode :value="`--ns-perspective-${key}`" />
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Couches de profondeur</h2>
        <p>
          Six hauteurs sur l'axe Z, de 0 à {{ depth.layer[5] }} px. Elles servent aux vues éclatées,
          au parallaxe et aux éléments qui flottent au-dessus d'une carte.
        </p>
      </header>
      <div class="depth-explode lab-preview">
        <SegControl v-model="exploded" :options="explodedOptions" label="Vue" />
        <div :class="['depth-explode__scene', { 'is-exploded': exploded === 'exploded' }]">
          <div class="depth-explode__stack">
            <span
              v-for="layer in stackLayers"
              :key="layer.key"
              :class="['depth-explode__layer', layer.className]"
              :style="{ '--z': `var(--ns-depth-${layer.key})` }"
            >
              <small>{{ layer.label }} · z{{ layer.key }}</small>
            </span>
          </div>
        </div>
      </div>
      <div class="token-inline">
        <TokenCode v-for="(value, key) in depth.layer" :key="key" :value="`--ns-depth-${key}`" />
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Inclinaison</h2>
        <p>
          Une carte qui suit le pointeur, ou le gyroscope sur mobile. L'angle maximal reste faible :
          au-delà de {{ depth.tilt.strong }}°, le texte devient difficile à lire. Les éléments
          intérieurs flottent à leur propre profondeur.
        </p>
      </header>
      <div class="depth-tilt lab-preview">
        <SegControl v-model="tiltLevel" :options="tiltOptions" label="Inclinaison" />
        <div
          class="depth-tilt__stage"
          @pointermove="track"
          @pointerleave="leave"
          :style="{ perspective: 'var(--ns-perspective-normal)' }"
        >
          <div :class="['depth-tilt__card', { 'is-active': pointer.active }]" :style="tiltStyle">
            <span class="depth-tilt__chip">Premium</span>
            <span class="depth-tilt__brand"><Icon name="sparkles" :size="22" /></span>
            <span class="depth-tilt__number numeric">5412 •••• •••• 2048</span>
            <span class="depth-tilt__name">Aïcha N.</span>
            <i class="depth-tilt__glare" aria-hidden="true" />
          </div>
          <small class="depth-tilt__hint">Survolez la carte</small>
        </div>
      </div>
      <div class="token-inline">
        <TokenCode :value="`--ns-tilt-${tiltLevel}`" />
        <TokenCode value="--ns-perspective-normal" />
        <span class="muted">{{ depth.tilt[tiltLevel] }}° au maximum</span>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Matières PBR</h2>
        <p>
          Six matières physiques, décrites comme dans glTF : rugosité, métal et transmission. Elles
          se rendent à l'identique dans three.js, RealityKit, SceneKit et Filament. Ici, une
          approximation en CSS.
        </p>
      </header>
      <div class="depth-pbr lab-preview">
        <figure v-for="[name, material] in pbr" :key="name">
          <span
            :class="['depth-sphere', { 'is-glass': material.transmission > 0 }]"
            :style="sphereStyle(name)"
          />
          <figcaption>
            <strong>{{ pbrNames[name] }}</strong>
            <span class="depth-pbr__bars">
              <span>
                <small>Rugosité</small>
                <i><b :style="{ inlineSize: `${material.roughness * 100}%` }" /></i>
              </span>
              <span>
                <small>Métal</small>
                <i><b :style="{ inlineSize: `${material.metalness * 100}%` }" /></i>
              </span>
              <span>
                <small>Transmission</small>
                <i><b :style="{ inlineSize: `${material.transmission * 100}%` }" /></i>
              </span>
            </span>
            <code>depth.pbr.{{ name }}</code>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Caméra</h2>
        <p>
          Le champ de vision vertical de la caméra. Étroit, il aplatit et flatte les produits ;
          large, il ouvre l'espace mais déforme les bords.
        </p>
      </header>
      <div class="depth-fov lab-preview">
        <figure v-for="[key, value] in fovs" :key="key">
          <svg viewBox="0 0 140 130" aria-hidden="true">
            <path :d="frustum(value)" class="depth-fov__cone" />
            <rect x="84" y="52" width="26" height="26" rx="6" class="depth-fov__subject" />
            <rect x="6" y="57" width="14" height="16" rx="3" class="depth-fov__camera" />
          </svg>
          <figcaption>
            <strong>{{ key }} · {{ value }}°</strong>
            <span class="muted">{{ fovText[key] }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Lumières</h2>
        <p>
          L'éclairage trois points des studios photo, plus une lumière ambiante. Éteignez-les une à
          une pour voir le rôle de chacune.
        </p>
      </header>
      <div class="depth-lights lab-preview">
        <div class="depth-lights__plan" aria-hidden="true">
          <span class="depth-lights__subject" />
          <span
            v-for="[name, light] in lights.filter(([key]) => key !== 'ambient')"
            :key="name"
            :class="['depth-lights__lamp', { 'is-off': !lightsOn[name] }]"
            :style="lightDot(light)"
          >
            <Icon name="zap" :size="14" />
          </span>
          <small class="depth-lights__camera">Caméra</small>
        </div>
        <span class="depth-lights__sphere" :style="litSphere" />
        <div class="depth-lights__switches">
          <button
            v-for="[name, light] in lights"
            :key="name"
            type="button"
            :aria-pressed="lightsOn[name]"
            class="depth-lights__switch"
            @click="lightsOn[name] = !lightsOn[name]"
          >
            <span class="depth-lights__led" />
            <span>
              <strong>{{ lightNames[name] }}</strong>
              <small class="numeric"
                >×{{ light.intensity }}
                <template v-if="name !== 'ambient'"
                  >· {{ light.azimuth }}° · {{ light.elevation }}° de haut</template
                ></small
              >
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Interaction et mouvement</h2>
        <p>
          Rotation automatique, objets qui flottent et parallaxe. Tout s'arrête quand l'utilisateur
          réduit les animations : la scène reste lisible en image fixe.
        </p>
      </header>
      <div class="depth-motion lab-preview">
        <figure v-for="[key, seconds] in rotations" :key="key">
          <div class="depth-cube-stage depth-cube-stage--small">
            <div class="depth-cube" :style="{ animationDuration: `${seconds}s` }">
              <i v-for="face in 6" :key="face" :class="`is-${face}`" />
            </div>
          </div>
          <figcaption>
            <strong>Rotation {{ key }}</strong>
            <span class="muted">un tour en {{ seconds }} s</span>
            <TokenCode :value="`--ns-auto-rotate-${key}`" />
          </figcaption>
        </figure>
        <figure>
          <div class="depth-float">
            <span class="depth-float__object" />
            <span class="depth-float__shadow" />
          </div>
          <figcaption>
            <strong>Flottement</strong>
            <span class="muted">
              ±{{ depth.float.amplitude }} px en {{ depth.float.period / 1000 }} s
            </span>
            <TokenCode value="--ns-contact-shadow" />
          </figcaption>
        </figure>
      </div>
      <div class="token-inline">
        <TokenCode v-for="[key] in parallax" :key="key" :value="`--ns-parallax-${key}`" />
        <span class="muted">
          parallaxe {{ parallax.map(([, value]) => `×${value}`).join(" · ") }} · amortissement de
          l'orbite {{ depth.interaction.orbitDamping }}
        </span>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Composants 3D</h2>
        <p>
          {{ components.length }} composants lisent ces tokens. Leurs contrats sont réservés ; ils
          seront rendus avec three.js sur le web, RealityKit et SceneKit sur Apple, Filament sur
          Android et Flutter.
        </p>
      </header>
      <div class="depth-components">
        <a
          v-for="contract in components"
          :key="contract.id"
          :href="`#/${contract.id}`"
          class="depth-component"
        >
          <span class="depth-component__icon"><Icon name="cube" :size="18" /></span>
          <span>
            <strong>{{ contract.name }}</strong>
            <small>{{ contract.description }}</small>
          </span>
          <span class="depth-component__tag">{{ contract.priority }}</span>
        </a>
      </div>
    </section>
  </div>
</template>
