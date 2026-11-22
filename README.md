[README.md](https://github.com/user-attachments/files/35235240/README.md)
# 🌌 NOVA ATER — Site Web Officiel du Serveur Minecraft Moddé

Bienvenue sur le dépôt du site officiel du serveur Minecraft **NOVA ATER** (Fabric 1.21.1 sur Aternos).

Ce site est un portail moderne, réactif, ultra-rapide et autonome, entièrement prêt à être publié directement sur **GitHub Pages** (ou toute plateforme d'hébergement statique telle que Cloudflare Pages, Netlify ou Vercel).

---

## 📋 Informations du Serveur

- **Nom :** `NOVA ATER`
- **Adresse Minecraft :** `smpmod-VP4d.aternos.me`
- **Version Minecraft :** `1.21.1`
- **Loader :** `Fabric`
- **Discord officiel :** [https://discord.gg/SxjV5pT9YZ](https://discord.gg/SxjV5pT9YZ)
- **Modpack Client (CurseForge) :** [https://www.curseforge.com/minecraft/modpacks/nova-ater](https://www.curseforge.com/minecraft/modpacks/nova-ater)
- **Modpack Serveur (CurseForge) :** [https://www.curseforge.com/minecraft/modpacks/nova-ater-serv](https://www.curseforge.com/minecraft/modpacks/nova-ater-serv)
- **Boost RAM avec Medal :** [https://aternos.medal.tv/fr-fr?utm_campaign=mc_aternos&utm_content=promocarousel](https://aternos.medal.tv/fr-fr?utm_campaign=mc_aternos&utm_content=promocarousel)

---

## 📁 Structure du Projet

```text
├── index.html            # Page d'accueil (Hero, téléchargements, étape par étape, Medal, CurseForge, Discord)
├── mods.html             # Page dédiée au catalogue des 132 mods avec recherche et filtres instantanés
├── regles.html           # Page officielle des règles du serveur et sanctions
├── config.js             # Fichier de configuration centralisé (IP, liens, nom, version)
├── favicon.svg           # Icône du site en SVG
├── downloads/            # Modpacks ZIP hébergés directement sur GitHub pour téléchargement direct
│   ├── nova-ater-client.zip
│   └── nova-ater-serveur.zip
├── data/
│   ├── mods.json         # Données structurées des 132 mods (nom, version, catégorie, type, description, lien)
│   └── mods.js           # Secours résilient hors-ligne / protocole file://
├── css/
│   └── style.css         # Feuille de style moderne, responsive et fluide (thème sombre Minecraft futuriste)
├── js/
│   └── app.js            # Moteur JavaScript (porte de vérification d'adresse, filtres mods, copie IP, toasts)
└── images/
    ├── banner/           # Logos et bannières
    ├── icons/            # Icônes SVG vectorielles par catégorie
    ├── mods/             # Logos, images et miniatures des mods
    └── backgrounds/      # Arrière-plans
```

---

## 📥 Téléchargement Direct depuis GitHub (Sans MediaFire)

Les deux modpacks sont directement intégrés dans le dossier `downloads/` du projet :
- `downloads/nova-ater-client.zip` (~2.7 Mo)
- `downloads/nova-ater-serveur.zip` (~107 Ko)

Lorsque vous publiez votre site sur **GitHub Pages**, les joueurs peuvent cliquer sur le bouton **« Téléchargement Direct (.ZIP) »** et le fichier se télécharge instantanément depuis le réseau mondial de GitHub, **sans passer par MediaFire, Mega, Google Drive ni aucune publicité**.

---

## ⚙️ Configuration Centrale (`config.js`)

Tous les paramètres importants du site sont modifiables en un seul endroit dans le fichier `config.js` situé à la racine :

```javascript
const CONFIG = {
    serverName: "NOVA ATER",
    serverAddress: "smpmod-VP4d.aternos.me",
    minecraftVersion: "1.21.1",
    loader: "Fabric",
    tagline: "Description personnalisée...",

    discordUrl: "https://discord.gg/SxjV5pT9YZ",

    curseforgeClientUrl: "https://www.curseforge.com/minecraft/modpacks/nova-ater",
    curseforgeServerUrl: "https://www.curseforge.com/minecraft/modpacks/nova-ater-serv",

    // Téléchargement direct hébergé nativement sur GitHub
    clientDownloadUrl: "downloads/nova-ater-client.zip",
    serverDownloadUrl: "downloads/nova-ater-serveur.zip",

    medalBoostUrl: "https://aternos.medal.tv/fr-fr?utm_campaign=mc_aternos&utm_content=promocarousel",

    mainImage: "images/banner/nova-ater-logo.svg"
};
```

### Comment modifier :
- **Le nom du serveur :** changez la valeur de `serverName`.
- **L'adresse Minecraft :** modifiez `serverAddress` (met à jour l'affichage, le bouton de copie et la vérification de la porte d'entrée).
- **La version Minecraft :** modifiez `minecraftVersion`.
- **Le lien Discord :** modifiez `discordUrl`.
- **Les liens CurseForge :** modifiez `curseforgeClientUrl` et `curseforgeServerUrl`.
- **Les téléchargements directs :** remplacez `"À AJOUTER"` par le lien direct de votre hébergeur de fichier dans `clientDownloadUrl` ou `serverDownloadUrl`.
- **Le lien Medal :** modifiez `medalBoostUrl`.
- **L'image principale :** modifiez `mainImage`.

---

## 📦 Ajouter un Nouveau Mod

Le catalogue est entièrement piloté par le fichier `data/mods.json`. Aucun changement de code HTML n'est requis !

### 1. Où placer l'image du mod :
Déposez l'image (PNG, SVG, WebP ou JPG) dans le dossier :
`images/mods/nom-de-votre-mod.png`

> *Astuce : Si aucune image n'est fournie, le site affiche automatiquement l'icône moderne SVG correspondant à la catégorie du mod.*

### 2. Ajouter l'entrée dans `data/mods.json` :
Ouvrez `data/mods.json` et ajoutez un nouvel objet dans la liste :

```json
{
  "name": "Mon Nouveau Mod",
  "version": "1.21.1",
  "category": "Exploration",
  "type": "Client + Serveur",
  "description": "Courte description claire de l'utilité du mod en jeu.",
  "image": "images/mods/mon-nouveau-mod.png",
  "curseforgeUrl": "https://www.curseforge.com/minecraft/mc-mods/mon-mod"
}
```

### Catégories autorisées pour les filtres :
- `Gameplay`
- `Aventure`
- `Exploration`
- `Décoration`
- `Technologie`
- `Combat`
- `Graphismes`
- `Optimisation`
- `Utilitaire`
- `Atmosphère`
- `Dimension`
- `Autre`

### Types autorisés :
- `Client` : mod uniquement côté joueur (ex: shaders, HUD, cartes).
- `Serveur` : mod/outil serveur (ex: optimisation de chunks).
- `Client + Serveur` : mod requis à la fois côté joueur et côté serveur (ex: nouvelles dimensions, nouveaux blocs, mobs).

---

## 📜 Modifier les Règles (`regles.html`)

Pour mettre à jour les règles ou les sanctions :
1. Ouvrez `regles.html` dans un éditeur de texte.
2. Chaque catégorie (`Respect`, `Triche`, `Grief`, `Serveur`, `Mods`, `Sanctions`) possède sa propre section clairement balisée.
3. Modifiez ou ajoutez des éléments `<li>` sous la catégorie désirée.

---
