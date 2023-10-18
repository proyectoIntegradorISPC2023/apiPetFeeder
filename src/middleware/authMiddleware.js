const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified.id);

        if (!user) throw new Error('User not found');

        req.user = user;
        next();
    } catch (error) {
        res.status(403).send('Invalid Token');
    }
};

// Este middleware se encargará de verificar que un token proporcionado 
// sea válido y asociar el usuario correspondiente a la solicitud.
// Para que esto funcione, necesitarás configurar una secret key para JWT 
// en tu archivo de variables de entorno. Además, será necesario instalar jsonwebtoken usando npm.