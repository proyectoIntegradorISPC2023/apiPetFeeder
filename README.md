# miapipet API  

La API miapipet sirve como backend para una solución completa que permite a los usuarios monitorear y controlar dispositivos relacionados con el cuidado de mascotas: petFeeder y petMonitor. Estos dispositivos físicos están construidos con ESP32 y ESP32 CAM, permitiendo la alimentación automatizada y el monitoreo en tiempo real de las mascotas.  

## Estructura del Proyecto  
  
petFeederAPI/  
│  
├── docs/  
│  
├── node_modules/    
│  
├── src/  
│   ├── config/                  # Configuración y conexión con MongoDB  
│   ├── controllers/             # Controladores para gestionar la lógica de la API  
│   ├── middleware/              # Middleware para autenticación y otros  
│   ├── models/                  # Modelos de datos para Mongoose  
│   ├── routes/                  # Rutas de la API  
│   ├── utils/                   # Utilidades, como validadores  
│   ├── app.js                   # Configuración principal de Express  
│   └── index.js                 # Punto de entrada, inicio del servidor  
│  
├── tests/  
│  
├── .gitignore  
├── .dockerignore    
│  
├── Dockerfile    
│  
├── .env
│  
├── package-lock.json    
├── package.json    
│  
└── README.md    

## Tecnologías Involucradas  

Node.js: Entorno de ejecución para JavaScript en el servidor.  
Express: Marco de aplicación web para crear API en Node.js.  
MongoDB: Base de datos NoSQL.  
Mongoose: ODM para conectar y trabajar con MongoDB desde Node.js.  
ESP32 y ESP32 CAM: Placas utilizadas para la capa física de los dispositivos.  
Docker: Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores, garantizando que la API funcione de manera consistente en cualquier entorno.  
  
## Funcionamiento de la API  
  
La API proporciona endpoints para que los usuarios interactúen con los dispositivos petFeeder y petMonitor. Al hacerlo, permite:  

Registrar y autenticar usuarios: Los usuarios deben autenticarse para acceder a la API.
Configurar y controlar el petFeeder: Definir tiempos de alimentación, revisar niveles de comida y activar/desactivar el dispositivo.  

Monitorear el petMonitor: Ver transmisiones en tiempo real, revisar la ubicación histórica del dispositivo y configurar alertas.  

La API se comunica con los dispositivos ESP32 y ESP32 CAM mediante protocolos específicos. Las solicitudes a la API desde la capa física actualizan la base de datos y envían respuestas adecuadas según las acciones requeridas.  

## Integración con la App Web  

La App Web es la interfaz principal para que los usuarios interactúen con la API y, por lo tanto, con los dispositivos petFeeder y petMonitor. Los usuarios se registran y acceden a la aplicación para ver el estado de sus dispositivos, configurar alertas, monitorear sus mascotas y configurar horarios de alimentación.

La App Web envía solicitudes HTTP a la API, que procesa estas solicitudes, interactúa con la base de datos y se comunica con la capa física cuando es necesario.  

## Instrucciones de Uso  
  
Instalación: Clonar el repositorio y ejecutar npm install para instalar las dependencias.  
Configuración: Asegurarse de tener MongoDB corriendo y configurar las variables de entorno necesarias.  
  
Ejecución: Utilizar npm start para ejecutar el servidor en producción o npm run dev para desarrollo con nodemon.