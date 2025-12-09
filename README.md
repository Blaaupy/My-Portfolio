# Portfolio de Blaaup

Portfolio web moderne et responsive, développé avec React, conçu pour présenter mes projets et compétences en développement web. Bilingue français/anglais, il offre une expérience utilisateur optimale avec un thème clair/sombre et une présentation de projets interactive.

![Screenshot du portfolio](./public/images/ScreenshotDuPortfolio.png)

## 🚀 Fonctionnalités Clés

-   **🌗 Thème Sombre/Clair (Custom)** : Basculez facilement entre un thème clair et un thème sombre grâce à un système de thème personnalisé, développé avec **React Context**. L'état du thème est préservé dans le `localStorage` pour une expérience utilisateur fluide.
-   **🌍 Internationalisation (Custom)** : Le site est entièrement disponible en français et en anglais via un système de traduction maison, utilisant un **`LanguageContext`** pour gérer l'état de la langue et charger les textes dynamiquement.
-   **📱 Design Responsive** : Une expérience utilisateur soignée sur tous les appareils, du mobile au desktop, avec une navigation adaptée (menu pivotant sur mobile).
-   **🎨 Composants Thématisés** : Les icônes SVG s'adaptent dynamiquement au thème choisi pour une intégration visuelle parfaite, grâce à un composant `ThemedSvg` sur mesure.
-   **📧 Formulaire de Contact Fonctionnel** : Un formulaire de contact stylisé et fonctionnel, utilisant **EmailJS** pour envoyer des messages directement depuis le site, sans back-end.
-   **🎬 Présentation Dynamique des Projets** : Chaque projet est présenté via un système de "slides" interactif et flexible, supportant les images, vidéos, PDF et iframes, avec des aperçus réels et des documents téléchargeables.

## 🛠️ Technologies Utilisées

Ce projet a été réalisé avec les technologies suivantes :

-   **[React](https://reactjs.org/)** : La bibliothèque principale pour l'interface utilisateur et la gestion des composants.
-   **[Vite](https://vitejs.dev/)** : Un outil de build rapide et moderne pour le développement et le déploiement.
-   **[SCSS](https://sass-lang.com/)** : Pour un CSS structuré et maintenable avec des variables globales.
-   **[React Router](https://reactrouter.com/)** : Pour la gestion de la navigation et des routes au sein de l'application (SPA).
-   **[React Icons](https://react-icons.github.io/react-icons/)** & **[Lucide React](https://lucide.dev/)** : Pour intégrer facilement une large gamme d'icônes.
-   **[React Circular Progressbar](https://www.npmjs.com/package/react-circular-progressbar)** : Pour les barres de progression animées dans la section compétences.
-   **[EmailJS](https://www.emailjs.com/)** : Pour l'envoi d'e-mails depuis le formulaire de contact sans back-end.
-   **[Vite Plugin SVGR](https://www.npmjs.com/package/vite-plugin-svgr)** : Pour importer les SVG directement en tant que composants React.

## 📁 Structure du Projet

L'architecture du projet est organisée pour être claire et maintenable.

```
portfolio-2/
├── public/                 # Fichiers statiques servis par le serveur
│   ├── files/              # Documents et médias spécifiques à chaque projet
│   └── images/             # Images et logos du site (PNG, SVG)
├── src/
│   ├── assets/             # Images importées dynamiquement (icônes, etc.)
│   ├── components/          # Composants React réutilisables et organisés par page
│   │   ├── AboutPage/       # Composants de la page "À propos"
│   │   ├── HomePage/        # Composants de la page d'accueil
│   │   ├── ProjectsPage/    # Composants de la page des projets
│   │   ├── Contact/         # Composants de la page de contact
│   │   ├── Header/          # Composant d'en-tête avec navigation
│   │   └── Footer/          # Composant de pied de page
│   ├── context/             # React Context pour l'état global (langue, thème)
│   ├── data/                # Données de l'application (textes i18n, projets)
│   ├── pages/               # Composants de page associés aux routes React Router
│   └── styles/              # Feuilles de style globales (variables, reset)
├── .env                    # Fichier pour les variables d'environnement (clés API)
├── .gitignore
├── package.json
└── README.md
```

## 📊 Gestion de l'État et des Données

-   **Thème et Langue** : L'état du thème (clair/sombre) et de la langue (fr/en) est géré globalement grâce à des **Contexts React** personnalisés (`ThemeContext` et `LanguageContext`). Cela assure une cohérence sur toute l'application.
-   **Données des Projets** : Les informations des projets sont centralisées dans `src/data/projectsData.json`. Chaque projet est un objet structuré qui inclut des informations générales et un tableau `slides` flexible pour une présentation riche et narrative.

## 🚀 Getting Started

Pour obtenir une copie locale et la faire fonctionner, suivez ces étapes simples.

### Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 18 ou plus) et [npm](https://www.npmjs.com/) installés sur votre machine.

### Installation

1.  Clonez le dépôt :
    ```bash
    git clone https://github.com/Blaaupy/portfolio-2.git
    cd portfolio-2
    ```

2.  Installez les dépendances :
    ```bash
    npm install
    ```

### Configuration du Formulaire de Contact

Le formulaire utilise EmailJS. Pour le rendre fonctionnel, vous devez configurer vos clés API.

1.  **Créez un compte sur [EmailJS](https://www.emailjs.com/)**, configurez un service d'e-mail et un template.
2.  À la racine du projet, créez un fichier nommé `.env`.
3.  Ajoutez vos clés EmailJS dans ce fichier. **Vite prend en charge nativement les fichiers `.env`** si les variables sont préfixées par `VITE_` :
    ```env
    # .env
    VITE_EMAILJS_SERVICE_ID="votre_service_id"
    VITE_EMAILJS_TEMPLATE_ID="votre_template_id"
    VITE_EMAILJS_PUBLIC_KEY="votre_public_key"
    ```
    *Important : Ne commettez jamais ce fichier `.env` sur Git.*

### Lancement de l'application

Démarrez le serveur de développement avec la commande :

```bash
npm run dev
```
En raison de la configuration de base dans vite.config.js pour le déploiement, l'application sera accessible à l'adresse suivante :
http://localhost:5173/portfolio-2/

## 🚀 Déploiement

Ce projet est configuré pour être déployé sur GitHub Pages en tant que Single Page Application (SPA). Le processus est automatisé pour gérer les routes côté client.

1.  Configuration de GitHub Pages :

    Dans les paramètres de votre dépôt GitHub, allez dans la section "Pages".
    Sous "Build and deployment", sélectionnez la source "Deploy from a branch".
    Choisissez la branche main (ou master) et le dossier /dist.

2.  Processus de Build Local :

    Lancez la commande de build :
```bash
npm run build
```
    Cette commande effectue deux actions :

        Build Vite : Crée le dossier dist avec les fichiers optimisés pour la production.

        Script postbuild : Exécute automatiquement le script copy-404.cjs. Ce script copie le contenu de dist/index.html vers dist/404.html. C'est une étape cruciale pour que GitHub Pages puisse rediriger toutes les routes (ex: /about) vers le fichier index.html, permettant à React Router de gérer la navigation correctement.

3.  Mise en Ligne :
    Après le build, commitez et poussez les changements, y compris le dossier dist, sur votre branche principale. GitHub Pages se mettra à jour automatiquement.
    
## 📝 License

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d'informations.

---