# Projet Pokedex

Ce projet est un site web fictif réalisé dans un cadre étudiant.

Le repo est constitué d'un dossier back contenant une api et d'un dossier front contenant une app écrite en Vanilla JS qui consomme l'API.

## La stack

- Node.js
- Express
- PostgreSQL
- Tailwind CSS
- Daisy UI

### Installation du projet

1. Installer les dépendances

```bash
npm install
```

2. Installer PostgreSQL si ce n'est pas déjà fait. À l'aide PSQL (outil PostgreSQL en ligne de commande) créer un nouvel utilisateur et créer la base de données.

```bash
CREATE USER nomUtilisateur WITH PASSWORD 'motDePasse';
CREATE DATABASE nomDeLaBase OWNER nomUtilisateur;
```

3. Copier et renommer le fichier .env.example puis renseigner la variable PG_URL avec les informations relatives à la base de données.

4. Créer les tables et les peupler grâce aux scripts fournis dans le dossier `back/data`

```bash
psql -U numUtilisateur -d nomDeLaBase -f ./data/create_tables.sql
psql -U numUtilisateur -d nomDeLaBase -f ./data/seeding_tables.sql
```

5. Lancer le serveur API

```bash
npm run dev
````

6. Ouvrir le fichier `front/index.html` dans le navigateur.