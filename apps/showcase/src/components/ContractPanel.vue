<script setup lang="ts">
import type { ComponentContract } from "@nativesmart/contracts";

defineProps<{ contract: ComponentContract }>();
</script>

<template>
  <div class="contract">
    <p v-if="contract.status === 'draft'" class="notice">
      Contrat réservé (<code>draft</code>) : nom, catégorie et priorité sont fixés, les propriétés
      restent à spécifier.
    </p>

    <section>
      <h3 data-toc>Anatomie</h3>
      <p class="chips">
        <code v-for="part in contract.anatomy" :key="part">{{ part }}</code>
      </p>
    </section>

    <section>
      <h3 data-toc>Propriétés</h3>
      <p v-if="contract.properties.length === 0" class="muted">Aucune propriété spécifiée.</p>
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Valeurs</th>
              <th>Défaut</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="property in contract.properties" :key="property.name">
              <td>
                <code>{{ property.name }}</code
                ><span v-if="property.required" class="controls__required">*</span>
              </td>
              <td>{{ property.kind }}</td>
              <td>{{ property.values?.join(" · ") ?? "—" }}</td>
              <td>
                <code v-if="property.defaultValue !== undefined">{{ property.defaultValue }}</code>
                <span v-else>—</span>
              </td>
              <td>{{ property.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="contract__columns">
      <section>
        <h3 data-toc>États</h3>
        <p class="chips">
          <code v-for="item in contract.states" :key="item">{{ item }}</code>
        </p>
      </section>
      <section>
        <h3 data-toc>Événements</h3>
        <p v-if="contract.events.length === 0" class="muted">Aucun.</p>
        <p v-else class="chips">
          <code v-for="item in contract.events" :key="item">{{ item }}</code>
        </p>
      </section>
    </div>

    <section>
      <h3 data-toc>Accessibilité</h3>
      <p v-if="contract.accessibility.role">
        Rôle : <code>{{ contract.accessibility.role }}</code>
      </p>
      <p v-if="contract.accessibility.keyboard?.length">
        Clavier :
        <code v-for="key in contract.accessibility.keyboard" :key="key">{{ key }}</code>
      </p>
      <ul>
        <li v-for="item in contract.accessibility.requirements" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section>
      <h3 data-toc>Tokens du composant</h3>
      <p v-if="contract.semanticTokens.length === 0" class="muted">Aucun.</p>
      <p v-else class="chips">
        <code v-for="token in contract.semanticTokens" :key="token">{{ token }}</code>
      </p>
    </section>
  </div>
</template>
