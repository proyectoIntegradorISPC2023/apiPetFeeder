const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConfig = require('./config/db');
const alertsRoutes = require('./routes/alertsRoutes');
const monitorRoutes = require('./routes/monitorRoutes');
const feedRoutes = require('./routes/feedRoutes');
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect(dbConfig.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB', error));

// Rutas
app.use('/api/alerts', alertsRoutes);
app.use('/api/monitors', monitorRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);

// Manejar errores no capturados
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        error: process.env.NODE_ENV === 'development' ? error : {}
    });
});

module.exports = app;