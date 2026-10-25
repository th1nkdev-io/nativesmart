<script setup lang="ts">
import { NsLink } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/*
 * The Lab sends external=false by default, which would switch detection off: unset, a link to
 * another site is recognised on its own.
 */
const linkAttrs = computed(() => ({
  ...attrs,
  external: attrs.external === false ? undefined : (attrs.external as boolean | undefined),
  href: String(attrs.href ?? "#")
}));

/* The other links of the page share the panel's look, with their own destinations. */
const look = computed(() => {
  const { href: _href, text: _text, icon: _icon, external: _external, ...rest } = attrs;
  return rest;
});

/* A standalone link reads best on its own line. */
const standalone = computed(() => attrs.variant === "standalone");
</script>

<template>
  <div v-if="variation" class="demo-link-tile">
    <NsLink v-if="standalone" v-bind="linkAttrs">Tous les transferts</NsLink>
    <p v-else>Consultez <NsLink v-bind="linkAttrs" /> avant votre premier envoi.</p>
  </div>

  <article v-else class="demo-link">
    <p class="demo-link__lead">
      <NsLink v-if="standalone" v-bind="linkAttrs" />
      <template v-else>
        Avant votre premier envoi, consultez <NsLink v-bind="linkAttrs" />. Les frais dépendent du
        pays de Kofi Mensah, le bénéficiaire.
      </template>
    </p>
    <p class="demo-link__note">
      Une question ? Le
      <NsLink v-bind="look" href="https://aide.example.org">centre d'aide</NsLink> répond en
      quelques minutes, ou
      <NsLink v-bind="look" href="/recu.pdf" download icon="download">téléchargez le reçu</NsLink>.
    </p>
    <footer class="demo-link__footer">
      <NsLink v-bind="look" variant="standalone" underline="hover" href="/transferts"
        >Tous les transferts</NsLink
      >
      <span>
        <NsLink tone="muted" underline="hover" size="sm" href="/confidentialite"
          >Confidentialité</NsLink
        >
        <NsLink tone="muted" underline="hover" size="sm" href="/cgu">Conditions</NsLink>
        <NsLink tone="muted" size="sm" disabled>Archives</NsLink>
      </span>
    </footer>
  </article>
</template>

<style>
.demo-link {
  display: grid;
  gap: var(--ns-space-4);
  inline-size: 520px;
  max-inline-size: 100%;
  padding: var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
  color: var(--ns-color-text);
}

.demo-link p {
  margin: 0;
}

.demo-link__lead {
  font-size: var(--ns-text-body-lg-size);
  line-height: 1.6;
}

.demo-link__note {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
  line-height: 1.6;
}

.demo-link__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ns-space-3);
  padding-block-start: var(--ns-space-4);
  border-block-start: 1px solid var(--ns-color-border-subtle);
}

.demo-link__footer span {
  display: flex;
  gap: var(--ns-space-4);
}

.demo-link-tile {
  inline-size: 100%;
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
  line-height: 1.6;
}

.demo-link-tile p {
  margin: 0;
}
</style>
