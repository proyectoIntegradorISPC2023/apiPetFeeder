const { body } = require('express-validator');

exports.validateUserRegistration = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
];

exports.validateUserLogin = [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Estos validadores ayudarán a asegurar que las solicitudes entrantes tengan el formato y contenido correcto. 
// Para este ejemplo, vamos a crear validaciones simples para un registro de usuario y el inicio de sesión.
// Para que esto funcione, necesitarás instalar express-validator usando npm.

// Con estos validadores, puedes ahora fácilmente validar las rutas de registro e inicio de sesión en tu aplicación. 
// Por ejemplo:

// const { validateUserRegistration } = require('../utils/validators');
// router.post('/register', validateUserRegistration, userController.register);

// Donde userController.register sería el controlador que maneja la lógica de registro. Si la validación falla, 
// express-validator automáticamente enviará una respuesta con los errores, por lo que no necesitas manejarlo 
// manualmente en el controlador.