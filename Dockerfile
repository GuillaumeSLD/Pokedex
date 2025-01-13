# Étape 1 : Construire le front-end
FROM node:20-slim AS front

WORKDIR /front

# Copier le fichier package.json et package-lock.json pour le front-end
COPY ./front/package.json ./front/package-lock.json ./
RUN npm install

# Copier tous les fichiers du front-end dans l'image
COPY ./front ./

# Installer http-server pour servir l'application front-end
RUN npm install -g http-server

# Étape 2 : Construire le back-end
FROM node:20-slim AS back

WORKDIR /back

# Copier le fichier package.json et package-lock.json pour le back-end
COPY ./back/package.json ./back/package-lock.json ./
RUN npm install

# Copier tous les fichiers du back-end dans l'image
COPY ./back ./

# Exposer le port 3000 pour le back-end
EXPOSE 3002

# Commande pour démarrer l'application back-end
CMD ["npm", "start"]
