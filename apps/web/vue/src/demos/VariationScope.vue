<script setup lang="ts">
import { provide } from "vue";
import { variationKey } from "./view";

const props = defineProps<{ group: string; value: string }>();
provide(variationKey, { group: props.group, value: props.value });
</script>

<template>
  <slot />
</template>
