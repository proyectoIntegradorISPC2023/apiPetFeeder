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

# Copiamos el resto del código de la aplicación.
COPY . .

# Usamos una etapa multi-stage para crear una imagen final más limpia.
FROM node:16-alpine

# Establecemos un directorio de trabajo.
WORKDIR /usr/src/app

# Copiamos las dependencias instaladas en la etapa de construcción.
COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY --from=build-stage /usr/src/app ./

# Exponemos el puerto 3000 que es donde se ejecutará nuestra aplicación.
EXPOSE 3000

# Definimos las variables de entorno necesarias.
# Puedes agregar aquí las que sean relevantes para tu aplicación.
# ENV MY_VARIABLE=value

# Comando para ejecutar la aplicación.
CMD ["npm", "start"]