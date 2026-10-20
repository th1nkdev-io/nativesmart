<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import TokenCode from "./TokenCode.vue";

const spacing = Object.entries(primitives.spacing);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Espacements</h2>
        <p>
          Une grille de 4 px pour toutes les marges, les gouttières et les espaces internes. Les
          clés suivent l'échelle de Tailwind : <code>space-4</code> vaut 16 px, comme
          <code>p-4</code>.
        </p>
      </header>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Clé</th>
              <th>Valeur</th>
              <th>Aperçu</th>
              <th>Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[key, value] in spacing" :key="key">
              <td>
                <strong>{{ key }}</strong>
              </td>
              <td class="numeric">{{ value }}px</td>
              <td>
                <span class="space-bar" :style="{ inlineSize: `${value}px` }" />
              </td>
              <td><TokenCode :value="`--ns-space-${key}`" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
