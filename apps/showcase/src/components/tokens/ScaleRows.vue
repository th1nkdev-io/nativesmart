<script setup lang="ts" generic="R extends { id: string }">
import TokenCode from "./TokenCode.vue";

/**
 * A scale shown as aligned rows: a live sample, the name, the value, a note and the variable.
 * Every row shares one grid, so the columns line up whatever the sample size.
 */
defineProps<{
  rows: readonly (R & { name: string; value: string; token: string; note?: string })[];
  /** Width of the sample column. */
  sample?: string;
}>();
</script>

<template>
  <div class="scale-rows" :style="{ '--sample': sample ?? '140px' }" role="list">
    <div v-for="row in rows" :key="row.id" class="scale-rows__row" role="listitem">
      <span class="scale-rows__sample lab-preview"><slot name="sample" :row="row" /></span>
      <strong class="scale-rows__name">{{ row.name }}</strong>
      <span class="scale-rows__value numeric">{{ row.value }}</span>
      <span class="scale-rows__note">{{ row.note }}</span>
      <TokenCode :value="row.token" />
    </div>
  </div>
</template>
