# Spotify player

Reproduction de l'interface et de la logique d'une playlist spotify en utilisant Next.js, GraphQL Apollo et TypeScript

![preview](https://spotify-player.mathisbarre.com/images/preview.png)

## Lancer l'application

### 1. Installer et lancer le back-end

- Rendez-vous sur [github.com/MathisBarre/spotify-fake-api](https://github.com/MathisBarre/spotify-fake-api)
- Suivez les instructions du README.md afin d'installer et lancer le serveur.

### 2. Cloner locallement l'application web

```bash
$ git clone https://github.com/MathisBarre/spotify-player.git
```

### 3. Installez les dépendances avec Yarn

```bash
yarn
```
### 4. Compléter les variables d'environnement

Renommez le fichier `.env.example` en `.env.local`. Si vous utilisez le back-end de l'étape 1, aucune changement n'est nécessaire. 

### 5. Lancer le serveur local

```bash
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour observer le résultat.

## Notes

L'api donnée ne marche pas pour des raisons de CORS. J'ai donc simulé la mienne avec fastify et apollo server en utilisant le même JSON qui aurait dû être retourné par l'api de base comme source de données.

Repository du back-end : [MathisBarre/spotify-fake-api](https://github.com/MathisBarre/spotify-fake-api)

## Users stories

- [x] As a user, I want to display a playlist and its tracks
- [x] As a user, I want to play/pause a track
- [x] As a user, I want to skip a track (bonus : as a user i want to go to the previous track)
- [x] As a user, I want to add/remove a track to/from my Liked Songs

## Cas particuliers, limitations et souhaits

Toutes les users stories ont été effectués et quelques fonctionnalités ont même été ajoutés (comme cliquer sur une piste pour la lire). Cependant, il reste quelques fonctionnalités que j'aurais voulu implémenter et cas particuliers que je n'ai pas eu le temps de traiter.

Par exemple, la musique s'arrête et reprend qu'on utilise l'intégration windows (touche sur le clavier, bouton sur les écouteurs ou clique sur le player windows qui apprait au changement de volume) mais l'interface n'est pas synchronisé avec ces changements. Il est même arrivé que toutes les musiques précédement joués se jouent toute en même temps.

Le responsive n'est pas non plus fait, j'ai refais le tableau sans l'élément `<table>` pour commencer un peu de responsive mais il reste tout à faire.

Une piste illisible (corrompue / mauvais format) ne se joue pas et la suivante est joué, cependant l'utilisateur n'a pas forcément l'information. J'aimerais donc ajouter une notification lorsque ce saut est fait.

A la fin d'une piste, la suivante ne se joue pas automatiquement.