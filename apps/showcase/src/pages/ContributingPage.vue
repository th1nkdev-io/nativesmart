<script setup lang="ts">
import CodeBlock from "../ui/CodeBlock.vue";
import DocPage from "./DocPage.vue";

const steps = [
  {
    title: "Contrat",
    text: "Spécifier les propriétés, états, événements et règles d'accessibilité dans packages/contracts. Le contrat ne dépend d'aucune technologie."
  },
  {
    title: "Tokens du composant",
    text: "Déclarer ses variables (--ns-<composant>-*) à partir des rôles sémantiques. Jamais de couleur ou de taille écrite en dur."
  },
  {
    title: "Implémentation",
    text: "Coder le composant dans la technologie, avec des propriétés qui portent les noms du contrat, et l'ajouter au registre."
  },
  {
    title: "Vérification dans le Lab",
    text: "Contrôler le Playground, les variations, les identités, le mode sombre, le RTL, la densité et le clavier."
  }
];

const commands = `pnpm install         # dépendances
pnpm showcase        # le Lab sur http://localhost:5173
pnpm format          # mise en forme
pnpm check           # build, types, lint, tests, architecture`;

const git = `git checkout dev && git pull
# … travail, puis
pnpm format:check && pnpm check
git commit -m "feat: add the select component"
git push`;
</script>

<template>
  <DocPage
    eyebrow="Ressources"
    title="Contribuer"
    lead="Chaque composant suit le même cycle, du contrat jusqu'au Lab. C'est ce qui garantit le même comportement sur toutes les technologies."
  >
    <section class="doc__section">
      <h2>Le cycle d'un composant</h2>
      <ol class="steps">
        <li v-for="(step, index) in steps" :key="step.title">
          <span class="steps__number">{{ index + 1 }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="doc__section">
      <h2>Commandes</h2>
      <CodeBlock language="Terminal" :code="commands" />
    </section>

    <section class="doc__section">
      <h2>Branches et commits</h2>
      <ul>
        <li><code>dev</code> est la branche principale : elle publie le Lab.</li>
        <li>Messages de commit en anglais, sur une ligne, au format <code>type: résumé</code>.</li>
        <li>Pas de co-auteur ni de description dans les commits.</li>
        <li>
          Toujours lancer <code>pnpm format:check</code> et <code>pnpm check</code> avant de
          pousser.
        </li>
      </ul>
      <CodeBlock language="Terminal" :code="git" />
    </section>
  </DocPage>
</template>
