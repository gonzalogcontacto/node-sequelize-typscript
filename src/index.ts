import express from 'express';
import usersRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes';

// Inicialización
const app = express();

// Settings
app.set('port', 5000);

// Middlewares
app.use(express.json()); // Poder interpretar json en las peticiones
app.use(express.urlencoded({extended: false}));// Cuando un formulario de HTML me envíe un dato poder interpretar esos datos

// Loading routes Classes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});