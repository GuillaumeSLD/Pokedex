# Utiliser l'image Node.js officielle comme base
FROM node:20-slim

# Installer wget et curl
RUN apt-get update && apt-get install -y \
  wget \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Créer et définir le répertoire de travail
WORKDIR /back

# Copier les fichiers package.json et package-lock.json
COPY ./back/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY ./back /back

# Copier le répertoire front dans le conteneur back
COPY ./front /front

# Exposer le port 3002
EXPOSE 3002

# Commande pour démarrer l'application
CMD ["npm", "start"]