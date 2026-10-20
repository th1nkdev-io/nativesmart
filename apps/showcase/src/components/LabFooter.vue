<script setup lang="ts">
import { brandName } from "../brand";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="lab-footer">
    <span>
      {{ brandName }}, une création de
      <a href="https://th1nkdev.com" target="_blank" rel="noopener">Think Dev SARL</a>
    </span>
    <span class="lab-footer__copy">© {{ year }} Think Dev SARL</span>
  </footer>
</template>
