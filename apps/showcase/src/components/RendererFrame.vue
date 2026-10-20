<script setup lang="ts">
import {
  onRendererMessage,
  requestToSearch,
  sendRenderRequest,
  type RenderRequest
} from "@nativesmart/showcase-runtime";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{ url: string; request: RenderRequest }>();
const emit = defineEmits<{ event: [name: string] }>();

const frame = ref<HTMLIFrameElement>();
const height = ref(250);

// The URL only carries the first request; later changes go through postMessage without reload.
const src = ref(props.url + requestToSearch(props.request));
watch(
  () => props.url,
  (url) => (src.value = url + requestToSearch(props.request))
);
watch(
  () => props.request,
  (request) => sendRenderRequest(frame.value, request),
  { deep: true }
);

let stop: (() => void) | undefined;
onMounted(() => {
  stop = onRendererMessage(
    () => frame.value,
    (message) => {
      if (message.type === "ns:ready") sendRenderRequest(frame.value, props.request);
      // +2 for the iframe border, so the preview never needs to scroll.
      if (message.type === "ns:resize") height.value = Math.max(message.height, 160) + 2;
      if (message.type === "ns:event") emit("event", message.name);
    }
  );
});
onBeforeUnmount(() => stop?.());
</script>

<template>
  <div class="frame">
    <iframe
      ref="frame"
      :src="src"
      :style="{ height: `${height}px` }"
      scrolling="no"
      title="Aperçu du composant"
    />
  </div>
</template>
