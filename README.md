## Lancer l'application

Premièrement, lancez le serveur de développemetn

```bash
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour observer le résultat.

## Notes

C'est la première fois que j'utilise emotion, le setup est relativement simple. L'exemple donné par next.js aide bien.

Même chose pour Apollo GraphQL. Au début j'étais perdu car Apollo n'est pas qu'un produit mais un set de produit. En explorant la documentation, j'ai vite compris que le produit que je devais utiliser était Apollo Client pour React. La mise en place cependant pris du temps car l'api graphql donné demandais obligatoirement une authentification ou autorisation, ma requête ne marchait donc jamais. Après avoir testé avec une API GraphQL simple, sans autorisation ni authentification, tout marchais bien, j'ai donc su que mon implémentation d'Apollo Client était bonne.

Du coup, nouveau problème, l'api GraphQL donné est inutilisable pour des raisons de CORS. Je pense même que contrairement a ce qui a été annoncé, l'authentification est obligatoire pour accéder à une playlist dans tous les cas.

Après avoir cherché longtemps un solution rapide pour remplacer l'api, j'ai décider de prendre le json normalement retourné par l'api. JSON que je vais utiliser pour créer un backend très simple qui aura pour mission de simuler un endpoint GraphQL (je dis simuler car il ne pourra retourner qu'une playliste). Par la suite j'hébergerai le backend sur Heroku

## Users stories

- [x] As a user, I want to display a playlist and its tracks
- [x] As a user, I want to play/pause a track
- [x] As a user, I want to skip a track (bonus : as a user i want to go to the previous track)
- [x] As a user, I want to add/remove a track to/from my Liked Songs