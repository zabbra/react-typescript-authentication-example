# Exemple d'authentification React + Typescript avec les API Hooks, Axios et Rest

Dans ce projet nous avons créer un exemple React Typescript : authentification et autorisation avec
React Hooks, React Router v6, axios et Bootstrap(sans Redux)

Au cour de ce mini projet, j'ai appris à :

- Gérer le flux d'authentification `JWT` pour l'inscription et la connexion de l'utilisateur the top-level 
- Gérer la structurer du projet pour l'authentification React Typescript(sans Redux) avec React Router et Axios
- Gérer la Création des Composants React Typescript avec validation de formulaire à l'aide de `Formik` et `Yup` 
- Gérer les Composants React Typescript pour accéder aux ressources protégées(autorisation)
- Gérer une Barre de navigation dynamique dans l'application React Typescript 

## Présentation de l'exemple d'authentification React Typescript

Nous allons créer une application d'authentification et d'autorisation React Typescript dans laquelle :
-Il y a des pages de connexion/déconnexion et d'inscription.
-Les données du formulaire seront validées par le front-end avant d'être envoyées au back-end.
-En fonction des rôles de l'utilisateur (administrateur, modérateur, utilisateur), la barre de navigation modifie automatiquement ses éléments.

Voici les captures d'écran :

Page d'inscription :

![]()

![]()

Prise en charge de la validation des formulaires :

![]()

Page de connexion: :

![]()

Page de profil (pour une connexion réussie) :

![]()


Pour la connexion au compte Modérateur, la barre de navigation changera selon les autorités :

![]()
![]()
![]()

Vérifiez le stockage local du navigateur :

![]()


Essayez d’accéder à une ressource non autorisée (page d’administration) :

![]()


## Inscription des utilisateurs et flux de connexion des utilisateurs


Pour l'authentification JWT, nous avons appeler 2 points de terminaison :
   - POST `api/auth/signup` pour l'enregistrement des utilisateurs
   - POST `api/auth/signin` pour la connexion de l'utilisateur

Le flux suivant vous montre un aperçu des requêtes et des réponses que le client d'authentification React Typescript effectuera ou recevra du serveur d'authentification. Ce client doit ajouter un JWT à l'en-tête HTTP avant d'envoyer la demande aux ressources protégées.

![]()



## Inscription des utilisateurs et flux de connexion des utilisateurs
Regardons le schéma ci-dessous.


– Le App composant est un conteneur avec React Router ( BrowserRouter). En fonction de l'état, la barre de navigation peut afficher ses éléments.

– Login & Register les composants ont un formulaire pour la soumission des données (avec le support d’ formikune yupbibliothèque). Ils appellent des méthodes pour auth.serviceeffectuer une demande de connexion/enregistrement.

– auth.service utilise axiospour faire des requêtes HTTP. Il stocke ou récupère également JWT à partir du stockage local du navigateur à l'intérieur de ces méthodes.

– Home le composant est public pour tous les visiteurs.

– Profile le composant affiche les informations utilisateur une fois l’action de connexion réussie.

– BoardUser, BoardModerator, BoardAdminles composants seront affichés par état user.roles. Dans ces composants, nous utilisons user.servicepour accéder aux ressources protégées à partir de l'API Web.

– user.service utilise auth-header()la fonction d'assistance pour ajouter JWT à l'en-tête HTTP. auth-header()renvoie un objet contenant le JWT de l'utilisateur actuellement connecté à partir du stockage local.

##Technologie

Nous avons utiliser ces modules :

   - React 18.2.0
   - typescript 5.0.2
   - react-router-dom 6
   - axios 1.5.0
   - formik 2.4.5
   - yup 1.3.2
   - Bootstrap 5.3.2

## Project Structure

Voici la structure des dossiers et des fichiers pour cette application React Typescript Authenticaion :

![]()


Avec l'explication du diagramme ci-dessus, vous pouvez facilement comprendre la structure du projet.

De plus, EventBus sert à émettre un événement de déconnexion lorsque le jeton est expiré.


## Configurer le projet d'authentification React Typescript

Ouvrez cmd dans le dossier dans lequel vous souhaitez enregistrer le dossier Projet, exécutez la commande :
   > npx create-react-app react-typescript-authentication-example --template typescript

## Importer Bootstrap pour le projet React Typescript

Exécuter la commande :
   > yarn add bootstrap@4.6.0
   > Ou : npm install bootstrap@4.6.0.

## Ajouter React Router au projet d'authentification React Typescript

Exécuter la commande :
   > yarn add react-router-dom
   > npm install react-router-dom


## Créer des services

Avant de travailler avec ces services, nous devons installer Axios avec la commande :
   > yarn add axios
   > npm install axios



##Instruction pour Configuration du projet après  clonage
   
Dans le répertoire du projet, vous pouvez exécuter :

```
npm install
# or
yarn install
```

ou


### Compile et recharge à chaud pour le développement

```
npm run dev
# or
yarn run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) pour l'afficher dans le navigateur.

La page se rechargera si vous apportez des modifications.

The page will reload if you make edits.
