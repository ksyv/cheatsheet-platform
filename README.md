# 🚀 Cheat Sheet Platform

Bienvenue sur la **Cheat Sheet Platform** ! C'est une application web full-stack conçue pour vous aider à organiser et gérer vos notes et aide-mémoires techniques par catégories. Que ce soit pour des commandes de terminal, des snippets de code, des concepts importants ou toute autre information que vous souhaitez garder à portée de main, cette plateforme est là pour vous.

## ✨ Fonctionnalités

* **Gestion des Catégories :** Créez, modifiez et supprimez vos propres catégories pour organiser vos notes.
* **Gestion des Notes :** Ajoutez, modifiez et supprimez des notes spécifiques au sein de chaque catégorie.
* **Interface Intuitive :** Une interface utilisateur simple et réactive pour une navigation facile.
* **Design Futuriste :** Inspiré par le style néon, pour une expérience visuelle agréable et moderne.

## 🔗 Démo en Ligne

Vous voulez voir l'application en action tout de suite ?
Accédez à la démo en ligne **[ici](https://demo-ksyv.com/cheatsheet-platform/)**

**⚠️ Note sur la Démo :** Cette version est une démo publique. Les données sont partagées entre tous les utilisateurs et sont **réinitialisées automatiquement toutes les heures**. N'hésitez pas à jouer avec, mais ne comptez pas sur la persistance de vos modifications.

## 🛠️ Technologies Utilisées

### Frontend
* **HTML5**
* **CSS3** (avec des animations et effets néon personnalisés)
* **JavaScript (Vanilla JS)** : Pour toute la logique côté client et les interactions avec l'API.

### Backend
* **Node.js** : Environnement d'exécution JavaScript côté serveur.
* **Express.js** : Framework web pour Node.js, utilisé pour construire l'API RESTful.
* **MongoDB** : Base de données NoSQL pour stocker les catégories et leurs notes.
* **Mongoose** : ODM (Object Data Modeling) pour interagir facilement avec MongoDB.
* **`dotenv`** : Pour la gestion des variables d'environnement.
* **`cors`** : Middleware pour gérer les requêtes Cross-Origin Resource Sharing.

## ⚙️ Installation et Lancement en Local

Suivez ces étapes pour lancer l'application sur votre machine locale.

### Prérequis

Assurez-vous d'avoir installé les éléments suivants :
* **Node.js** (version 14 ou plus récente recommandée)
* **npm** (normalement inclus avec Node.js)
* Un serveur **MongoDB** en cours d'exécution ou un compte **MongoDB Atlas** pour une base de données cloud.

### Étapes

1.  **Clonez le dépôt :**
    ```bash
    git clone [https://github.com/ksyv/cheatsheet-platform.git](https://github.com/ksyv/cheatsheet-platform.git)
    cd cheatsheet-platform
    ```

2.  **Installez les dépendances du backend :**
    ```bash
    npm install
    ```

3.  **Configurez les variables d'environnement :**
    Créez un fichier `.env` à la racine du dossier `cheatsheet-platform` (au même niveau que `package.json`).
    Collez-y le contenu suivant, en remplaçant `VOTRE_URI_MONGODB` par l'URI de connexion à votre base de données MongoDB (locale ou Atlas).

    ```
    MONGODB_URI=VOTRE_URI_MONGODB
    PORT=3001
    ```
    *Exemple d'URI MongoDB Atlas :* `mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/nomdelabase?retryWrites=true&w=majority`
    *Exemple d'URI MongoDB locale :* `mongodb://localhost:27017/cheatsheetdb`

4.  **Lancez le serveur backend :**
    ```bash
    node server.js
    ```
    Le serveur devrait démarrer et écouter sur le port `3001` (ou celui que vous avez défini dans `.env`). Vous devriez voir un message `Connecté à MongoDB!` dans votre console.

5.  **Accédez au Frontend :**
    Le frontend est un simple fichier HTML statique. Ouvrez le fichier `public/index.html` directement dans votre navigateur web.
    ```
    file:///chemin/vers/votre/dossier/cheatsheet-platform/public/index.html
    ```
    Assurez-vous que le serveur backend (`server.js`) est bien en cours d'exécution pour que le frontend puisse récupérer et manipuler les données.

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous avez des idées d'améliorations, des corrections de bugs ou de nouvelles fonctionnalités, n'hésitez pas à ouvrir une issue ou à soumettre une Pull Request.

## 📄 Licence

Ce projet est sous licence ISC.

---