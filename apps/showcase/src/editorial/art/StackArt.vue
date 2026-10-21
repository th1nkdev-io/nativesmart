<script setup lang="ts">
// The three layers of NativeSmart, stacked in 3D: the contract, the tokens, the rendered UI.
const swatches = [
  "var(--ns-color-primary)",
  "var(--ns-color-secondary)",
  "var(--ns-color-success)",
  "var(--ns-color-warning)",
  "var(--ns-color-danger)",
  "var(--ns-color-info)"
];
</script>

<template>
  <div v-tilt="10" class="stack-art" role="img" aria-label="Un contrat, des tokens et le rendu">
    <div class="stack-art__scene">
      <div class="stack-art__plane stack-art__plane--render" style="--layer: 0">
        <div class="mini-ui">
          <div class="mini-ui__head">
            <span class="mini-ui__avatar" />
            <span class="mini-ui__lines"><i /><i /></span>
            <span class="mini-ui__badge">Payé</span>
          </div>
          <span class="mini-ui__amount">25 000 <small>FCFA</small></span>
          <span class="mini-ui__field" />
          <div class="mini-ui__row">
            <span class="mini-ui__button">Envoyer</span>
            <span class="mini-ui__button mini-ui__button--ghost">Annuler</span>
            <span class="mini-ui__switch" />
          </div>
        </div>
      </div>

      <div class="stack-art__plane stack-art__plane--tokens" style="--layer: 1">
        <div class="token-plane">
          <span v-for="color in swatches" :key="color" :style="{ background: color }" />
          <b>Aa</b>
          <em />
          <em />
          <em />
        </div>
      </div>

      <div class="stack-art__plane stack-art__plane--contract" style="--layer: 2">
        <div class="contract-plane">
          <code><i>button</i> {</code>
          <code>&nbsp;&nbsp;label: <u>string</u></code>
          <code>&nbsp;&nbsp;variant: <u>solid | outline</u></code>
          <code>&nbsp;&nbsp;loading: <u>boolean</u></code>
          <code>&nbsp;&nbsp;on: <u>press</u></code>
          <code>}</code>
        </div>
      </div>
    </div>

    <span class="stack-art__label stack-art__label--contract"><b>1</b> Contrat</span>
    <span class="stack-art__label stack-art__label--tokens"><b>2</b> Tokens</span>
    <span class="stack-art__label stack-art__label--render"><b>3</b> Rendu</span>
  </div>
</template>
