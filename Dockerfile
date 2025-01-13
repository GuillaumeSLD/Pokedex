# Utiliser l'image Node.js officielle comme base
FROM node:20-slim

# Installer wget et curl
RUN apt-get update && apt-get install -y \
  wget \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Créer et définir le répertoire de travail pour le back-end
WORKDIR /back

# Copier le fichier package.json et package-lock.json du back-end
COPY back/package*.json ./

# Installer les dépendances du back-end
RUN npm install

# Copier le reste des fichiers du back-end
COPY back ./

# Créer et définir le répertoire de travail pour le front-end
WORKDIR /front

# Copier le fichier package.json et package-lock.json du front-end
COPY front/package*.json ./

# Installer les dépendances du front-end
RUN npm install

# Copier le reste des fichiers du front-end
COPY front ./

# Exposer les ports des deux applications (ajustez si nécessaire)
EXPOSE 3000 4200

# Commande pour démarrer l'application (ici j'assume que vous voulez démarrer les deux)
# Vous pouvez remplacer cela par la commande spécifique pour chaque application
CMD ["sh", "-c", "npm run start --prefix /app/back & npm run start --prefix /app/front"]
