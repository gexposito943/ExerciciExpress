import express from 'express';
import routes from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { getmontanyes } from './controllers/routesController.js'; 

const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware que registra les peticions
app.use('/mountain', (req, res, next) => {
    console.log("Nova petició rebuda");
    next();
});

app.use('/mountain', routes);


app.get('/list', getmontanyes); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
