# Déploiement du Lab

Chaque push sur `dev` lance `.github/workflows/deploy.yml` : qualité (`pnpm format:check`,
`pnpm check`), image Docker poussée sur `ghcr.io/th1nkdev-io/nativesmart-lab`, puis
remplacement du conteneur `ns_lab` sur le serveur, avec retour automatique à l'image
précédente si le contrôle de santé échoue.

L'image est un site statique servi par nginx sans privilèges sur le port 8080. Elle ne
contient ni variable ni secret. Sur le serveur, elle est publiée sur `127.0.0.1:3020`,
derrière le reverse-proxy, en lecture seule et sans aucune capacité Linux.

## Mise en place (une fois)

1. **Environnement GitHub** : Settings → Environments → `lab`.
   - Deployment branches : `dev` uniquement.
   - Required reviewers : facultatif, pour approuver chaque déploiement.
2. **Secrets de l'environnement `lab`** (jamais au niveau du dépôt) :
   - `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY` : utilisateur de déploiement dédié et
     sa clé, réservés à ce projet.
   - `SERVER_SSH_FINGERPRINT` : empreinte SHA256 de la clé d'hôte du serveur
     (`ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`), pour refuser un faux serveur.
3. **Actions** : Settings → Actions → General → « Require approval for all external
   contributors », pour que les pull requests de forks n'exécutent rien sans accord.
4. **Branche `dev`** : règle de protection (pull request et CI verte obligatoires,
   push direct réservé aux mainteneurs).
5. **Reverse-proxy** : faire pointer le domaine du Lab vers `http://127.0.0.1:3020`.
