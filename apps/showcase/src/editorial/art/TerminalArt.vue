<template>
  <div v-tilt="6" class="terminal-art" role="img" aria-label="Installation dans un terminal">
    <div class="terminal-art__window">
      <div class="terminal-art__bar">
        <i /><i /><i />
        <span>~/mon-app</span>
      </div>
      <div class="terminal-art__body">
        <p style="--line: 0"><b>$</b> pnpm add @nativesmart/tokens @nativesmart/vue</p>
        <p style="--line: 1" class="terminal-art__muted">Packages: +2</p>
        <p style="--line: 2" class="terminal-art__ok">✓ @nativesmart/tokens</p>
        <p style="--line: 3" class="terminal-art__ok">✓ @nativesmart/vue</p>
        <p style="--line: 4"><b>$</b> pnpm dev</p>
        <p style="--line: 5" class="terminal-art__muted">
          ➜ Local: <u>http://localhost:3000</u><span class="terminal-art__caret" />
        </p>
      </div>
    </div>
    <div class="terminal-art__card">
      <span class="terminal-art__check">✓</span>
      <span>
        <strong>NsButton prêt</strong>
        <small>Thème nativesmart.css chargé</small>
      </span>
    </div>
  </div>
</template>
