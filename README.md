# Spotify player

Reproduction de l'interface et de la logique d'une playlist spotify en utilisant Next.js, GraphQL Apollo et TypeScript

![preview](https://spotify-player.mathisbarre.com/images/preview.png)

## Lancer l'application

### 2. Cloner locallement l'application web

```bash
$ git clone https://github.com/MathisBarre/spotify-player.git
```

### 3. Installez les dépendances avec Yarn

```bash
$ yarn
```
### 4. Compléter les variables d'environnement

Renommez le fichier `.env.example` en `.env.local`. Si vous utilisez le mock de shotgun, aucun changement n'est nécessaire. 

### 5. Lancer le serveur local

```bash
$ yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour observer le résultat.

## Users stories

- [x] As a user, I want to display a playlist and its tracks
- [x] As a user, I want to play/pause a track
- [x] As a user, I want to skip a track (bonus : as a user i want to go to the previous track)
- [x] As a user, I want to add/remove a track to/from my Liked Songs
