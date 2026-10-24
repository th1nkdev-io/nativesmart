<script setup lang="ts">
import { NsToast } from "@nativesmart/vue";

import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const message = computed(() => String(attrs.message ?? ""));
</script>

<template>
  <NsToast
    class="demo-toast"
    action-label="Voir"
    close-label="Fermer"
    v-bind="$attrs"
    :message="message"
  />
</template>

<style>
.demo-toast {
  inline-size: 380px;
  max-inline-size: 100%;
}
</style>
