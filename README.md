# 🚀 **Ynov Home Dashboard**

Interface front-end permettant de gérer des **objets connectés** via un tableau de bord interactif.

---

## 📌 1. Installation & Lancement

### ⚡ 1.1. Prérequis

- **Node.js** (`>= 16.x.x`)
- **npm** ou **yarn`

### 📥 1.2. Cloner le projet

```sh
git clone git@github.com:ynov-home/ynov-home-web.git
```

### 📦 1.3. Installer les dépendances

```sh
npm install
```

### ▶️ 1.4. Lancer l'application

```sh
npm start
```

📌 **L'application tourne sur `http://localhost:3000`**

---

## 📌 2. Technologies Utilisées

- **React** avec **TypeScript**
- **Tailwind CSS** pour le design
- **React Router** pour la navigation (prévu)
- **Axios** pour les requêtes API

---

## 📌 3. Création des pages de gestion des appareils

### ➕ 3.1. Ajouter un appareil (`AjouterAppareil.tsx`)

📌 **Cette page permet aux utilisateurs d'ajouter un nouvel objet connecté.**

- Contient un formulaire avec les champs : `nom`, `type`, `status`, `emplacement`
- Bouton **"Ajouter l'appareil"** pour soumettre le formulaire

### ✏️ 3.2. Modifier un appareil (`AjouterAppareil.tsx`)

📌 **Page pour modifier un appareil existant.**

- Charge les informations de l'appareil existant
- Champs modifiables
- Bouton **"Mettre à jour"** pour valider les changements

### ❌ 3.3. Supprimer un appareil (`Dashboard.tsx`)

📌 ** Supprimer un appareil directement depuis la Page Dashboard.**

---

## 📌 4. Mise en place du Style avec Tailwind CSS

### 📦 4.1. Installer Tailwind CSS

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 🔧 4.2. Configurer `tailwind.config.js`

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 🎨 4.3. Ajouter Tailwind dans `index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ▶️ 4.4. Redémarrer le serveur pour appliquer les styles

```sh
npm start
```

---

## 📌 5. Scripts Disponibles

### 🚀 5.1. Lancer en mode développement

```sh
npm start
```

### 🔨 5.2. Build de l'application

```sh
npm run build
```

---


