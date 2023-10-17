# Usamos una imagen de Node.js con base en Alpine por su ligereza y seguridad.
FROM node:16-alpine as build-stage

# Establecemos un directorio de trabajo.
WORKDIR /usr/src/app

# Añadimos una variable de entorno para asegurarnos de que npm instale solo las dependencias de producción.
ENV NODE_ENV=production

# Copiamos los archivos de paquetes primero.
COPY package*.json ./

# Instalamos solo las dependencias necesarias.
RUN npm ci --only=production

# Copiamos el código de la aplicación utilizando el correcto casing.
COPY ./SRC/ ./SRC/

# Usamos una etapa multi-stage para crear una imagen final más limpia.
FROM node:16-alpine

# Establecemos un directorio de trabajo.
WORKDIR /usr/src/app

# Copiamos las dependencias instaladas en la etapa de construcción.
COPY --from=build-stage /usr/src/app/node_modules ./node_modules/
COPY --from=build-stage /usr/src/app/SRC/ ./SRC/
COPY --from=build-stage /usr/src/app/package*.json ./

# Exponemos el puerto 3000 que es donde se ejecutará nuestra aplicación.
EXPOSE 3000

# Comando para ejecutar la aplicación.
CMD ["npm", "start"]
