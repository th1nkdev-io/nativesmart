# Nativesmart Production Readiness Checklist

Cette checklist est l'ordre de travail recommandé pour rendre Nativesmart officiellement
disponible. Une phase ne doit être considérée comme terminée que lorsque sa porte de validation
est satisfaite.

## Convention

- `[ ]` : travail restant ou non vérifié.
- `[x]` : élément déjà présent et vérifié dans le dépôt.
- **P0** : indispensable avant la production.
- **P1** : nécessaire peu après le lancement ou pour l'offre Pro.
- **Preuve** : artefact, rapport, commande ou décision permettant de fermer un point.

## Cible de production

La première disponibilité officielle correspond à `Nativesmart Core v1.0` :

- dépôt open source public ;
- contrats et tokens stables ;
- design systems Thinkdev et Material ;
- renderers React Native et React/DOM stables ;
- Flutter explicitement expérimental ou preview ;
- composants fondamentaux documentés, testés et accessibles ;
- packages installables hors du monorepo ;
- processus de versionnement, publication et support opérationnel.

Vue, Angular, SwiftUI, Compose, desktop natif et les kits commerciaux ne bloquent pas Core v1.0.

---

## Phase 0 — Responsabilité et décisions fondatrices

### 0.1 Responsables

- [x] **P0** Product Owner : [ThinkDev SARL](https://th1nkdev.com) — contact@th1nkdev.com.
- [x] **P0** Responsable technique des contrats et tokens :
      [BIYA Paul (bpsmartdesign)](https://bpsmartdesign.dev) — bpsmartdesign@hotmail.com.
- [x] **P0** Responsable de chaque renderer actif : BIYA Paul.
- [x] **P0** Responsable des releases et du registre de packages : BIYA Paul.
- [x] **P0** Responsable sécurité et traitement des vulnérabilités : BIYA Paul.
- [x] **P0** Approbateur des changements cassants : BIYA Paul, pour ThinkDev SARL.
- [x] **P0** Autorité de publication des versions publiques ou commerciales : BIYA Paul, pour
      ThinkDev SARL.

### 0.2 Produit

- [x] **P0** Promesse produit : « Nativesmart est l'infrastructure de composants
      multi-design-system et multi-plateforme de ThinkDev SARL, conçue pour accélérer la livraison
      d'applications cohérentes, accessibles, hautement personnalisables et prêtes pour la
      production. »
- [x] **P0** Utilisateurs prioritaires, dans l'ordre :
  1. les équipes de ThinkDev SARL et leurs agents IA ;
  2. les agences et équipes produit qui livrent plusieurs applications ou plusieurs marques ;
  3. la communauté de développeurs et contributeurs ;
  4. les entreprises ayant besoin de gouvernance, support, conformité et intégrations privées.
- [x] **P0** Problèmes que Core v1.0 doit résoudre :
  - éviter de reconstruire les composants fondamentaux sur chaque projet ;
  - garantir des contrats, comportements et règles d'accessibilité cohérents ;
  - permettre plusieurs identités visuelles sans forker les composants ;
  - partager tokens et décisions de design entre mobile et web ;
  - fournir une base fiable et machine-readable aux développeurs et agents IA ;
  - installer, mettre à jour et tester les composants comme de vrais packages de production.
- [x] **P0** Éléments explicitement hors périmètre de Core v1.0 :
  - la parité complète entre tous les frameworks et systèmes d'exploitation ;
  - les renderers Vue, Angular, SwiftUI, Compose et desktop natif stables ;
  - Bootstrap et Cupertino en qualité de production ;
  - les kits métier et templates commerciaux complets ;
  - les design systems spécifiques aux clients ;
  - une plateforme SaaS de création visuelle, facturation ou gestion des licences ;
  - un générateur capable de produire automatiquement une application métier complète.
- [x] **P0** Renderers stables initiaux : React Native pour Android/iOS et React/DOM pour le web.
- [x] **P0** Flutter sera publié avec le statut `preview` dans Core v1.0 et ne bloquera pas le
      lancement des renderers stables.
- [x] **P0** Design systems initiaux : Thinkdev et Material. Bootstrap et Cupertino restent
      planifiés jusqu'à une implémentation financée et conforme.
- [ ] **P0** Définir la date cible de Core v1.0 et une fenêtre de stabilisation recommandée de
      quatre semaines sans ajout de fonctionnalité.
- [x] **P0** Indicateurs de succès du lancement :
  - deux projets pilotes ThinkDev utilisent les packages publiés, dont un mobile et un web ;
  - 100 % des contrats Core sont implémentés par React Native et React/DOM ;
  - tous les contrôles de build, type, tests, accessibilité et packaging sont réussis ;
  - aucun défaut critique ou majeur connu n'est ouvert au moment du lancement ;
  - un développeur externe installe et utilise Core en moins de 15 minutes sans assistance ;
  - au moins trois utilisateurs beta externes valident l'installation et la documentation ;
  - une mise à jour de version est validée sur les deux projets pilotes ;
  - les composants fondamentaux n'exigent aucune copie manuelle de fichiers internes.

### Porte 0 — Cadrage approuvé

- [ ] La note de cadrage est approuvée par la direction ThinkDev SARL.
- [ ] Le périmètre de Core v1.0 est gelé.
- [x] Chaque domaine critique possède un responsable : BIYA Paul assume actuellement la
      responsabilité technique, les renderers, les releases, le registre, la sécurité, les
      changements cassants et les publications.

**Preuve attendue :** document de cadrage daté et liste des responsables.

---

## Phase 1 — Frontières open source, commerciales et internes

### 1.1 Inventaire

- [ ] **P0** Inventorier chaque package, kit, template, application et outil.
- [ ] **P0** Classifier chaque élément `public`, `pro`, `enterprise` ou `internal`.
- [ ] **P0** Identifier les dépendances allant du public vers le privé.
- [ ] **P0** Inverser toute dépendance où un package public dépend de code privé.
- [ ] **P0** Identifier les fichiers contenant une identité client ou ThinkDev confidentielle.
- [ ] **P0** Identifier les secrets, URLs internes et données de démonstration sensibles.

### 1.2 Dépôts

- [x] Le projet Core est organisé en monorepo.
- [ ] **P0** Conserver le dépôt actuel privé pendant la séparation.
- [ ] **P0** Définir la structure du monorepo public `nativesmart`.
- [ ] **P0** Créer le monorepo privé `nativesmart-pro`.
- [ ] **P0** Déplacer les kits et templates commerciaux vers `nativesmart-pro`.
- [ ] **P0** Retirer tout code client des deux dépôts génériques.
- [ ] **P0** Créer un dépôt séparé pour chaque design system client.
- [ ] **P0** Configurer les protections de branche sur les dépôts public et privé.
- [ ] **P0** Configurer les équipes et droits d'accès minimaux.
- [ ] **P0** Documenter la procédure de synchronisation Core → Pro.

### 1.3 Contrôle de fuite

- [ ] **P0** Scanner tout l'historique Git destiné à devenir public.
- [ ] **P0** Retirer les secrets de l'historique avant publication.
- [ ] **P0** Vérifier les auteurs, emails, tickets et URLs présents dans l'historique.
- [ ] **P0** Vérifier que les tarballs publics n'incluent aucun fichier Pro ou interne.
- [ ] **P0** Faire approuver le contenu final du dépôt public.

### Porte 1 — Séparation validée

- [ ] Le futur dépôt public ne contient que des éléments publiables.
- [ ] Pro peut consommer Core sans dépendance Git vers des sources privées locales.
- [ ] Aucun secret ou élément client n'est présent dans l'historique public.

**Preuve attendue :** matrice de classification et rapport de scan du dépôt public.

---

## Phase 2 — Licences, marques et conformité juridique

### 2.1 Open source

- [ ] **P0** Choisir MIT ou Apache-2.0 pour Nativesmart Core.
- [ ] **P0** Ajouter `LICENSE` à la racine du dépôt public.
- [ ] **P0** Ajouter les en-têtes de licence uniquement si la politique l'exige.
- [ ] **P0** Créer `NOTICE` si la licence ou les dépendances l'exigent.
- [ ] **P0** Documenter ce que la licence autorise concernant les projets clients.

### 2.2 Commercial

- [ ] **P0** Rédiger l'EULA de Nativesmart Pro.
- [ ] **P0** Définir les licences individuel, équipe et entreprise.
- [ ] **P0** Définir les règles pour les agences et projets clients.
- [ ] **P0** Définir les restrictions de redistribution et de création de produits dérivés.
- [ ] **P0** Définir les droits sur les versions obtenues après expiration.
- [ ] **P0** Définir les conditions de mise à jour, support et remboursement.

### 2.3 Propriété intellectuelle

- [ ] **P0** Vérifier la disponibilité du nom Nativesmart.
- [ ] **P0** Vérifier les domaines et identifiants de réseaux sociaux.
- [ ] **P0** Clarifier la propriété intellectuelle entre ThinkDev et les contributeurs.
- [ ] **P0** Choisir DCO ou CLA pour les contributions externes.
- [ ] **P0** Ajouter les mentions relatives à Material, Bootstrap et Cupertino.
- [ ] **P0** Éviter toute affirmation de certification par les propriétaires de ces marques.
- [ ] **P0** Auditer les licences des polices, icônes, illustrations et dépendances.

### Porte 2 — Publication juridiquement autorisée

- [ ] La licence Core est validée.
- [ ] L'EULA Pro est validée.
- [ ] La politique de contribution est validée.
- [ ] Les marques et actifs tiers sont documentés.

**Preuve attendue :** validation écrite du conseil juridique ou de la direction habilitée.

---

## Phase 3 — Stabilisation de l'architecture Core

### 3.1 Contrats

- [x] Le package `@nativesmart/contracts` existe.
- [x] Les contrats modélisent anatomie, propriétés, états, événements et accessibilité.
- [x] Douze composants fondamentaux possèdent un premier contrat.
- [ ] **P0** Revoir chaque contrat avec design, web et mobile.
- [ ] **P0** Uniformiser les noms de propriétés entre les plateformes.
- [ ] **P0** Définir les règles pour les extensions spécifiques à une plateforme.
- [ ] **P0** Définir les slots, compositions et composants contrôlés/non contrôlés.
- [ ] **P0** Définir les règles de dépréciation des propriétés.
- [ ] **P0** Définir la compatibilité ascendante des contrats.
- [ ] **P0** Passer les contrats Core v1.0 de `preview` à `stable`.

### 3.2 Tokens

- [x] Les primitives de couleur, espace, rayon, typographie, ombre et motion existent.
- [x] Les thèmes clair et sombre existent.
- [ ] **P0** Séparer formellement primitives, sémantiques et tokens de composants.
- [ ] **P0** Remplacer les usages directs de primitives dans les composants.
- [ ] **P0** Définir les tokens de focus, interaction, validation et sélection.
- [ ] **P0** Définir les tokens responsifs et les breakpoints web.
- [ ] **P0** Définir densités `compact`, `comfortable` et `spacious`.
- [ ] **P0** Définir le comportement LTR et RTL.
- [ ] **P0** Définir la stratégie de polices et polices de repli.
- [ ] **P0** Ajouter une validation de contraste des couleurs.
- [ ] **P0** Ajouter une détection des références de tokens inexistantes ou cycliques.
- [ ] **P0** Générer JSON, TypeScript, CSS et Dart depuis une source unique.
- [ ] **P0** Ajouter un contrôle de dérive des sorties générées dans la CI.

### 3.3 Design systems et marques

- [x] Thinkdev, Material, Bootstrap et Cupertino sont enregistrés.
- [x] Le modèle combine design system, marque, mode, densité et direction.
- [ ] **P0** Stabiliser les recipes Thinkdev pour tous les composants Core v1.0.
- [ ] **P0** Stabiliser les recipes Material pour tous les composants Core v1.0.
- [ ] **P0** Définir la version Material ciblée.
- [ ] **P0** Vérifier que Bootstrap reste web-first.
- [ ] **P0** Vérifier que Cupertino reste limité aux plateformes pertinentes.
- [ ] **P0** Créer une marque exemple complète sans code spécifique aux renderers.
- [ ] **P0** Valider la surcharge design system → marque → produit → utilisateur.
- [ ] **P0** Documenter les changements d'anatomie autorisés par une recipe.

### 3.4 Registre des plateformes

- [x] Le package `@nativesmart/platform-registry` existe.
- [x] Mobile, web et desktop sont représentés.
- [x] Les renderers distinguent les statuts `planned`, `preview` et `stable`.
- [ ] **P0** Définir les critères objectifs de chaque statut.
- [ ] **P0** Calculer automatiquement le pourcentage de contrats implémentés.
- [ ] **P0** Refuser le statut `stable` sans tests de conformité.
- [ ] **P0** Publier la matrice de compatibilité dans la documentation.

### Porte 3 — Core gelable

- [ ] Les contrats Core v1.0 sont stables.
- [ ] Les tokens sont générés depuis une source unique.
- [ ] Thinkdev et Material possèdent des recipes complètes.
- [ ] La matrice des renderers est mesurable automatiquement.

**Preuve attendue :** validation d'architecture sans erreur et revue signée des contrats Core.

---

## Phase 4 — Renderer React Native stable

### 4.1 API et composants

- [ ] **P0** Aligner `Button` sur la séparation `variant` et `intent` du contrat.
- [ ] **P0** Aligner Avatar, Badge, Box, Card, Divider et Icon.
- [ ] **P0** Aligner Input, Modal, Spinner, Text et Toast.
- [ ] **P0** Conserver une migration documentée pour les anciennes propriétés.
- [ ] **P0** Supprimer les valeurs visuelles codées en dur.
- [ ] **P0** Consommer les recipes Thinkdev et Material.
- [ ] **P0** Supporter clair, sombre, densité et marque personnalisée.
- [ ] **P0** Définir les exports publics et interdire les imports internes accidentels.

### 4.2 React Native et Expo

- [ ] **P0** Définir les versions minimales de React, React Native et Expo.
- [ ] **P0** Tester la nouvelle architecture React Native.
- [ ] **P0** Tester Expo Managed Workflow.
- [ ] **P0** Tester un projet React Native sans Expo si officiellement supporté.
- [ ] **P0** Tester Android en développement et en build release.
- [ ] **P0** Tester iOS en développement et en build release.
- [ ] **P0** Mesurer la taille du package et vérifier le tree-shaking pertinent.
- [ ] **P0** Vérifier qu'aucune dépendance de développement n'est requise en production.

### 4.3 Accessibilité mobile

- [ ] **P0** Vérifier les rôles et états d'accessibilité.
- [ ] **P0** Tester TalkBack sur Android.
- [ ] **P0** Tester VoiceOver sur iOS.
- [ ] **P0** Vérifier les tailles minimales des zones tactiles.
- [ ] **P0** Vérifier l'ordre de navigation et l'annonce des erreurs.
- [ ] **P0** Vérifier la réduction des animations.
- [ ] **P0** Vérifier le redimensionnement du texte.

### Porte 4 — React Native stable

- [ ] Les douze composants respectent leurs contrats.
- [ ] Android et iOS passent les tests de production.
- [ ] L'accessibilité mobile ne présente aucun défaut bloquant.
- [ ] L'exemple Expo consomme un package empaqueté, pas un chemin source.

**Preuve attendue :** rapport de conformité React Native et builds Android/iOS.

---

## Phase 5 — Renderer React/DOM stable

### 5.1 Fondation web

- [ ] **P0** Créer `@nativesmart/react`.
- [ ] **P0** Créer le package CSS ou les exports CSS de tokens.
- [ ] **P0** Définir la stratégie CSS : classes, variables et cascade layers.
- [ ] **P0** Définir la compatibilité SSR et hydratation.
- [ ] **P0** Définir la compatibilité React Server Components.
- [ ] **P0** Implémenter les douze composants Core v1.0.
- [ ] **P0** Utiliser des éléments HTML natifs lorsque possible.
- [ ] **P0** Supporter Thinkdev et Material.
- [ ] **P0** Supporter clair, sombre, densité, LTR et RTL.
- [ ] **P0** Vérifier le tree-shaking et les exports ESM.
- [ ] **P0** Définir les navigateurs officiellement supportés.

### 5.2 Accessibilité web

- [ ] **P0** Tester la navigation entièrement au clavier.
- [ ] **P0** Vérifier les focus rings et le retour du focus des modales.
- [ ] **P0** Vérifier les noms, rôles et valeurs accessibles.
- [ ] **P0** Tester au moins NVDA avec Chrome ou Firefox.
- [ ] **P0** Tester VoiceOver avec Safari.
- [ ] **P0** Exécuter des contrôles automatisés axe-core.
- [ ] **P0** Vérifier zoom 200 % et reflow.
- [ ] **P0** Vérifier contraste normal, focus et états désactivés.

### 5.3 Exemple web

- [ ] **P0** Créer une application de démonstration React.
- [ ] **P0** Afficher chaque variante et état de chaque composant.
- [ ] **P0** Ajouter un changement de thème et de marque en direct.
- [ ] **P0** Déployer automatiquement la démonstration depuis la branche principale.

### Porte 5 — React/DOM stable

- [ ] Les douze composants respectent leurs contrats.
- [ ] SSR, hydratation, clavier et lecteurs d'écran sont validés.
- [ ] Le playground public est déployé.
- [ ] Les packages web peuvent être installés dans un projet externe minimal.

**Preuve attendue :** rapport de conformité web et URL du playground.

---

## Phase 6 — Statut Flutter maîtrisé

- [ ] **P0** Installer et verrouiller la version Flutter utilisée en CI.
- [ ] **P0** Décider si Flutter est inclus comme `preview` dans Core v1.0.
- [ ] **P0** Corriger la documentation pour refléter ce statut partout.
- [ ] **P0** Vérifier que le package Dart respecte les conventions de publication.
- [ ] **P0** Vérifier que les widgets existants correspondent aux contrats annoncés.
- [ ] **P0** Ne pas déclarer comme implémenté un composant non conforme.
- [ ] **P0** Tester `flutter analyze`, `flutter test` et le formatage.
- [ ] **P0** Tester au minimum Android et iOS si le package est publié.
- [ ] **P1** Ajouter les tests web et desktop avant de revendiquer ces plateformes.

### Porte 6 — Promesse Flutter exacte

- [ ] Le package passe les validations de son statut annoncé.
- [ ] La matrice de compatibilité ne surévalue pas sa couverture.

**Preuve attendue :** rapport Flutter et manifeste de renderer mis à jour.

---

## Phase 7 — Qualité transversale et sécurité

### 7.1 Tests

- [ ] **P0** Créer une suite de conformité commune aux renderers.
- [ ] **P0** Tester chaque propriété, état et événement obligatoire.
- [ ] **P0** Tester les thèmes clair et sombre.
- [ ] **P0** Tester au moins une marque personnalisée.
- [ ] **P0** Tester les erreurs de configuration.
- [ ] **P0** Ajouter des tests de régression visuelle.
- [ ] **P0** Définir les seuils de couverture par package.
- [ ] **P0** Interdire la baisse non approuvée de couverture.
- [ ] **P0** Ajouter des tests d'installation depuis les tarballs.
- [ ] **P0** Tester les versions minimales des peer dependencies.
- [ ] **P0** Tester les versions courantes des peer dependencies.

### 7.2 Performance

- [ ] **P0** Définir un budget de taille pour chaque package.
- [ ] **P0** Mesurer la taille minifiée et compressée des packages web.
- [ ] **P0** Mesurer le temps de rendu des composants complexes.
- [ ] **P0** Vérifier l'absence de rerenders évitables.
- [ ] **P0** Vérifier le coût du changement de thème.
- [ ] **P0** Ajouter une alerte CI en cas de dépassement significatif.

### 7.3 Sécurité et supply chain

- [ ] **P0** Ajouter `SECURITY.md`.
- [ ] **P0** Définir un canal privé de signalement.
- [ ] **P0** Définir les délais de traitement par sévérité.
- [ ] **P0** Activer les alertes de dépendances.
- [ ] **P0** Exécuter une analyse de vulnérabilités dans la CI.
- [ ] **P0** Limiter les permissions des workflows GitHub Actions.
- [ ] **P0** Épingler ou contrôler les actions tierces.
- [ ] **P0** Protéger les tokens de publication avec un environnement dédié.
- [ ] **P0** Activer 2FA et publication de confiance sur le registre si disponible.
- [ ] **P0** Générer une SBOM pour les releases officielles.
- [ ] **P0** Générer une provenance vérifiable des packages.

### Porte 7 — Qualité de production

- [ ] Tous les tests obligatoires passent sans exception manuelle.
- [ ] Aucun défaut critique d'accessibilité ou sécurité n'est ouvert.
- [ ] Les budgets de taille et performance sont respectés.
- [ ] Les tarballs ont été inspectés et installés dans des projets vierges.

**Preuve attendue :** rapport CI de release candidate et rapport d'audit.

---

## Phase 8 — Packaging, versionnement et publication

### 8.1 Packages

- [ ] **P0** Réserver l'organisation et les noms de packages publics.
- [ ] **P0** Vérifier `name`, `description`, `license`, `repository` et `homepage`.
- [ ] **P0** Vérifier `main`, `module`, `types`, `exports` et `sideEffects`.
- [ ] **P0** Vérifier `files` et les exclusions de publication.
- [ ] **P0** Vérifier les peer dependencies et leurs plages de versions.
- [ ] **P0** Vérifier les sourcemaps et declaration maps distribuées.
- [ ] **P0** Exécuter `pnpm pack` pour chaque package publiable.
- [ ] **P0** Inspecter manuellement le contenu de chaque archive.
- [ ] **P0** Installer chaque archive dans une application externe.

### 8.2 Versionnement

- [x] Changesets est installé.
- [ ] **P0** Définir packages indépendants, liés ou à version fixe.
- [ ] **P0** Définir la politique SemVer des contrats et tokens.
- [ ] **P0** Ajouter la vérification des changesets dans les pull requests.
- [ ] **P0** Générer automatiquement les changelogs.
- [ ] **P0** Définir les canaux `snapshot`, `beta`, `rc` et `latest`.
- [ ] **P0** Définir la procédure de retrait d'une version défectueuse.
- [ ] **P0** Définir la durée de support des versions majeures.

### 8.3 Publication

- [ ] **P0** Créer un workflow de publication depuis une branche protégée.
- [ ] **P0** Exiger une approbation humaine pour `latest`.
- [ ] **P0** Publier automatiquement les tags Git correspondants.
- [ ] **P0** Attacher changelog, SBOM et notes à la release GitHub.
- [ ] **P0** Tester une publication complète vers un registre de test.
- [ ] **P0** Publier une première version `beta` publique.
- [ ] **P0** Tester installation et mise à jour depuis la `beta`.

### Porte 8 — Release candidate distribuable

- [ ] La CI peut publier sans utiliser un poste développeur.
- [ ] Les packages beta sont installables publiquement.
- [ ] Une restauration ou dépréciation de version a été répétée à blanc.

**Preuve attendue :** release beta et journal du test de publication.

---

## Phase 9 — Documentation et expérience développeur

### 9.1 Documentation essentielle

- [ ] **P0** Remplacer le site de documentation placeholder.
- [ ] **P0** Créer une page d'accueil présentant clairement la promesse.
- [ ] **P0** Ajouter un démarrage rapide React Native.
- [ ] **P0** Ajouter un démarrage rapide React/DOM.
- [ ] **P0** Documenter les versions minimales supportées.
- [ ] **P0** Documenter chaque composant et toutes ses propriétés.
- [ ] **P0** Afficher variantes, états, anatomie et accessibilité.
- [ ] **P0** Documenter les tokens et leur hiérarchie.
- [ ] **P0** Documenter la création d'une marque.
- [ ] **P0** Documenter Thinkdev et Material.
- [ ] **P0** Publier la matrice des renderers et plateformes.
- [ ] **P0** Ajouter un guide de migration vers chaque version majeure.
- [ ] **P0** Ajouter une page de dépannage.
- [ ] **P0** Ajouter une politique de support des navigateurs et plateformes.

### 9.2 Contribution et communauté

- [ ] **P0** Finaliser `CONTRIBUTING.md`.
- [ ] **P0** Ajouter `CODE_OF_CONDUCT.md`.
- [ ] **P0** Ajouter les templates d'issues et pull requests.
- [ ] **P0** Définir les labels et le triage des issues.
- [ ] **P0** Documenter l'environnement de développement.
- [ ] **P0** Documenter la création d'un contrat, recipe ou renderer.
- [ ] **P0** Définir les attentes de tests pour une contribution.
- [ ] **P0** Publier la gouvernance et le processus de décision.

### 9.3 Agents IA

- [ ] **P1** Créer un registry public lisible par les agents.
- [ ] **P1** Décrire précisément chaque composant pour les LLM.
- [ ] **P1** Publier les contrats dans un format machine-readable.
- [ ] **P1** Ajouter des instructions d'utilisation de Nativesmart par les agents.
- [ ] **P1** Ajouter des exemples corrects et des contre-exemples.
- [ ] **P1** Créer un registry privé authentifié pour Pro.
- [ ] **P1** Tester la génération d'un écran complet par un agent.
- [ ] **P1** Vérifier automatiquement que le code généré respecte les contrats.

### Porte 9 — Utilisable sans assistance interne

- [ ] Un développeur externe installe et utilise Nativesmart sans aide de ThinkDev.
- [ ] Les réponses aux questions essentielles se trouvent dans la documentation.
- [ ] Un agent peut identifier et employer correctement les composants Core.

**Preuve attendue :** test utilisateur documenté avec un développeur non contributeur.

---

## Phase 10 — Projets pilotes et stabilisation

### 10.1 Pilotes internes

- [ ] **P0** Sélectionner deux projets ThinkDev différents.
- [ ] **P0** Utiliser React Native sur au moins un projet pilote.
- [ ] **P0** Utiliser React/DOM sur au moins un projet pilote.
- [ ] **P0** Installer Nativesmart depuis des packages, pas par copie de source.
- [ ] **P0** Utiliser une marque personnalisée sur chaque pilote.
- [ ] **P0** Mesurer le temps de démarrage et de livraison gagné.
- [ ] **P0** Consigner les composants manquants et contournements.
- [ ] **P0** Corriger les défauts bloquants découverts.
- [ ] **P0** Vérifier une mise à jour de version sur les deux pilotes.

### 10.2 Beta externe

- [ ] **P0** Recruter trois à cinq utilisateurs beta externes.
- [ ] **P0** Fournir un canal de retour dédié.
- [ ] **P0** Suivre installation, compréhension, bugs et composants manquants.
- [ ] **P0** Corriger tous les défauts critiques et majeurs.
- [ ] **P0** Geler les API pendant la release candidate.
- [ ] **P0** Publier `1.0.0-rc.1`.
- [ ] **P0** Exécuter la checklist entière sur la release candidate.

### Porte 10 — Go/No-Go Core v1.0

- [ ] Deux projets internes sont en production ou prêts à l'être.
- [ ] Au moins trois utilisateurs externes ont validé le parcours d'installation.
- [ ] Aucun bug P0 ou P1 n'est ouvert.
- [ ] Aucun changement d'API non planifié n'est requis.
- [ ] Direction, produit, technique, juridique et sécurité donnent leur accord.

**Preuve attendue :** compte rendu Go/No-Go signé.

---

## Phase 11 — Lancement de Nativesmart Core v1.0

### 11.1 Préparation

- [ ] **P0** Préparer les notes de version finales.
- [ ] **P0** Préparer la page de lancement et les exemples.
- [ ] **P0** Préparer l'annonce destinée aux équipes ThinkDev.
- [ ] **P0** Préparer l'annonce publique.
- [ ] **P0** Préparer une démonstration courte React Native et web.
- [ ] **P0** Vérifier tous les liens, commandes et numéros de version.
- [ ] **P0** Vérifier le plan de support des 72 premières heures.

### 11.2 Publication

- [ ] **P0** Créer le tag Core v1.0.
- [ ] **P0** Publier les packages sous le tag `latest`.
- [ ] **P0** Publier la release GitHub.
- [ ] **P0** Déployer la documentation correspondant exactement à v1.0.
- [ ] **P0** Déployer le playground correspondant exactement à v1.0.
- [ ] **P0** Vérifier une installation publique après publication.
- [ ] **P0** Annoncer officiellement la disponibilité.

### 11.3 Surveillance immédiate

- [ ] **P0** Surveiller les erreurs d'installation.
- [ ] **P0** Surveiller les vulnérabilités et dépendances.
- [ ] **P0** Trier quotidiennement les retours pendant la première semaine.
- [ ] **P0** Publier rapidement un correctif si nécessaire.
- [ ] **P0** Documenter tout incident de lancement.

### Porte 11 — Core officiellement disponible

- [ ] Packages publics installables.
- [ ] Documentation et playground accessibles.
- [ ] Support opérationnel.
- [ ] Première vérification post-lancement terminée.

**Preuve attendue :** installation réussie de `1.0.0` depuis le registre public.

---

## Phase 12 — Nativesmart Pro

Cette phase commence après la stabilisation de Core, sans bloquer Core v1.0.

### 12.1 Offre commerciale

- [ ] **P1** Définir précisément Free, Pro et Enterprise.
- [ ] **P1** Définir prix, sièges, projets autorisés et renouvellement.
- [ ] **P1** Définir les mises à jour incluses.
- [ ] **P1** Définir les niveaux de support et SLA.
- [ ] **P1** Préparer devis, facturation et conditions de vente.

### 12.2 Produit Pro minimum

- [ ] **P1** Choisir un seul kit commercial initial.
- [ ] **P1** Recommander le kit fintech ou mobile money selon la demande réelle.
- [ ] **P1** Transformer ses placeholders en composants et parcours complets.
- [ ] **P1** Ajouter écrans, navigation, états d'erreur et données de démonstration.
- [ ] **P1** Ajouter adaptateurs et points d'extension documentés.
- [ ] **P1** Ajouter tests comportementaux, visuels et d'intégration.
- [ ] **P1** Tester le kit dans une application réelle.
- [ ] **P1** Documenter personnalisation et mise à jour.

### 12.3 Distribution privée

- [ ] **P1** Configurer le registre privé.
- [ ] **P1** Relier achat, organisation et droits d'accès.
- [ ] **P1** Tester invitation, installation, renouvellement et révocation.
- [ ] **P1** Ne jamais exposer de secret dans une application cliente.
- [ ] **P1** Définir la procédure d'accès hors ligne si nécessaire.
- [ ] **P1** Journaliser les publications et changements de droits.

### 12.4 Pilote commercial

- [ ] **P1** Sélectionner un client pilote payant.
- [ ] **P1** Signer la licence et le niveau de support.
- [ ] **P1** Livrer le kit sans copie manuelle de fichiers non traçable.
- [ ] **P1** Mesurer temps gagné, défauts et demandes de support.
- [ ] **P1** Corriger les défauts bloquants.
- [ ] **P1** Valider une mise à jour du kit chez le client.

### Porte 12 — Pro officiellement disponible

- [ ] Un client payant a validé le produit.
- [ ] Licence, paiement, accès et support fonctionnent de bout en bout.
- [ ] Le produit Pro apporte une valeur supérieure aux composants Core générables par IA.

**Preuve attendue :** première licence payante active et installation privée réussie.

---

## Phase 13 — Exploitation continue

- [ ] **P1** Publier une roadmap publique réaliste.
- [ ] **P1** Réaliser un triage hebdomadaire des issues.
- [ ] **P1** Publier les correctifs de sécurité selon le SLA.
- [ ] **P1** Réviser trimestriellement les plateformes supportées.
- [ ] **P1** Réviser trimestriellement les dépendances minimales.
- [ ] **P1** Mesurer adoption, rétention, téléchargements et projets ThinkDev actifs.
- [ ] **P1** Mesurer le temps économisé sur les projets internes.
- [ ] **P1** Mesurer revenus, renouvellements et charge de support Pro.
- [ ] **P1** Déprécier les renderers non maintenus au lieu de surpromettre.
- [ ] **P1** Ajouter une plateforme uniquement avec responsable et cas d'usage financé.
- [ ] **P1** Ajouter un design system uniquement avec règles et tests complets.
- [ ] **P1** Réévaluer chaque année la frontière open source/Pro.

---

## Résumé du chemin critique

- [ ] 1. Approuver le périmètre et les responsables.
- [ ] 2. Séparer public, Pro et client.
- [ ] 3. Valider licences et propriété intellectuelle.
- [ ] 4. Stabiliser contrats, tokens et design systems.
- [ ] 5. Stabiliser React Native.
- [ ] 6. Livrer et stabiliser React/DOM.
- [ ] 7. Donner à Flutter une promesse exacte.
- [ ] 8. Terminer qualité, accessibilité et sécurité.
- [ ] 9. Automatiser packaging et publication.
- [ ] 10. Finaliser documentation et expérience développeur.
- [ ] 11. Valider deux pilotes internes et une beta externe.
- [ ] 12. Publier Nativesmart Core v1.0.
- [ ] 13. Livrer un premier kit Nativesmart Pro.
- [ ] 14. Passer en exploitation continue.
