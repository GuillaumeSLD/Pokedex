# Étape 1 : Construire le front-end
FROM node:20-slim AS front

WORKDIR /front

# Copier le fichier package.json et package-lock.json pour le front-end
COPY ./front/package.json ./front/package-lock.json ./
RUN npm install

# Copier tous les fichiers du front-end dans l'image
COPY ./front /front

# Installer http-server pour servir l'application front-end
RUN npm install -g http-server

# Exposer le port pour le front-end
EXPOSE 3003

# Commande pour démarrer le serveur front-end
CMD ["http-server", "dist", "-p", "3003"]


# Étape 2 : Construire le back-end
FROM node:20-slim AS back

WORKDIR /back

# Copier le fichier package.json et package-lock.json pour le back-end
COPY ./back/package.json ./back/package-lock.json ./
RUN npm install

# Copier tous les fichiers du back-end dans l'image
COPY ./back /back

# Exposer le port 3002 pour l'API
EXPOSE 3002

# Commande pour démarrer l'application back-end
CMD ["npm", "start"]
