<script setup lang="ts">
import CycleArt from "../editorial/art/CycleArt.vue";
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import PageHero from "../editorial/PageHero.vue";
import SectionHead from "../editorial/SectionHead.vue";
import CodeBlock from "../ui/CodeBlock.vue";

const steps: { icon: IconName; title: string; text: string; where: string }[] = [
  {
    icon: "book",
    title: "Écrire le contrat",
    text: "Propriétés, états, événements et règles d'accessibilité. Aucune technologie n'y apparaît.",
    where: "packages/contracts"
  },
  {
    icon: "palette",
    title: "Déclarer ses tokens",
    text: "Des variables --ns-<composant>-* construites sur les rôles sémantiques. Jamais de valeur en dur.",
    where: "--ns-select-*"
  },
  {
    icon: "code",
    title: "L'implémenter",
    text: "Dans la technologie visée, avec les noms du contrat, puis l'ajouter au registre.",
    where: "packages/web/vue"
  },
  {
    icon: "eye",
    title: "Le vérifier dans le Lab",
    text: "Aperçu, variations, identités, sombre, RTL, densité et clavier, avant tout merge.",
    where: "pnpm showcase"
  }
];

const rules: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "Le contrat fait foi",
    text: "Une prop qui n'est pas dans le contrat n'existe pas."
  },
  {
    icon: "droplet",
    title: "Zéro valeur en dur",
    text: "Couleurs, tailles et durées viennent des tokens."
  },
  {
    icon: "shield",
    title: "Accessible ou rien",
    text: "Clavier, focus, rôles et contraste avant la beauté."
  },
  { icon: "zap", title: "Toujours vert", text: "format:check et check passent avant chaque push." }
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
  <EditorialPage>
    <PageHero
      eyebrow="Contribuer"
      icon="heart"
      lead="Chaque composant suit le même cycle, du contrat jusqu'au Lab. C'est cette discipline qui garantit le même comportement sur toutes les technologies, et qui rend chaque contribution simple à relire."
    >
      <template #title> Construisons-le <span class="ed-gradient">ensemble.</span> </template>
      <template #art>
        <CycleArt />
      </template>
    </PageHero>

    <section class="ed-section">
      <SectionHead
        kicker="Le cycle"
        icon="refresh"
        title="Quatre étapes, toujours dans le même ordre"
        lead="Sauter une étape, c'est casser la promesse faite aux autres plateformes."
      />
      <ol class="cycle-steps">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          v-reveal="index * 110"
          v-spotlight
          class="ed-card"
        >
          <span class="home-step__index">0{{ index + 1 }}</span>
          <span class="ed-tile"><Icon :name="step.icon" :size="22" /></span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
          <code class="home-step__sample">{{ step.where }}</code>
        </li>
      </ol>
    </section>

    <section class="ed-section">
      <SectionHead kicker="Nos règles" icon="shield" title="Ce qui ne se négocie pas" />
      <div class="ed-grid ed-grid--4">
        <article
          v-for="(rule, index) in rules"
          :key="rule.title"
          v-reveal="index * 90"
          v-spotlight
          class="ed-card"
        >
          <span class="ed-tile"><Icon :name="rule.icon" :size="22" /></span>
          <h3>{{ rule.title }}</h3>
          <p>{{ rule.text }}</p>
        </article>
      </div>
    </section>

    <section class="ed-split">
      <div class="ed-section">
        <SectionHead
          kicker="Au quotidien"
          icon="terminal"
          title="Quatre commandes à connaître"
          lead="Le Lab tourne en local, les vérifications sont les mêmes que celles de l'intégration continue."
        />
      </div>
      <div v-reveal:right>
        <CodeBlock language="Terminal" :code="commands" />
      </div>
    </section>

    <section class="ed-split ed-split--reverse">
      <div class="ed-section">
        <SectionHead kicker="Git" icon="gitCommit" title="Branches et commits" />
        <ul v-reveal class="ed-list">
          <li>
            <span class="ed-check"><Icon name="check" :size="14" /></span>
            <span><strong>dev est la branche principale</strong> Elle publie le Lab.</span>
          </li>
          <li>
            <span class="ed-check"><Icon name="check" :size="14" /></span>
            <span
              ><strong>Un message, une ligne</strong> En anglais, au format
              <code>type: résumé</code>.</span
            >
          </li>
          <li>
            <span class="ed-check"><Icon name="check" :size="14" /></span>
            <span><strong>Sobre</strong> Ni co-auteur, ni description.</span>
          </li>
        </ul>
      </div>
      <div v-reveal:left>
        <CodeBlock language="Terminal" :code="git" />
      </div>
    </section>
  </EditorialPage>
</template>
