const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/clima')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err));

// Esquema y modelo de búsqueda
const searchSchema = new mongoose.Schema({
    city: String,
    date: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', searchSchema,'searches');

// Rutas
app.post('/api/search', async (req, res) => {
    const { city } = req.body;

    const newSearch = new Search({ city });
    await newSearch.save();

    res.status(201).send(newSearch);
});

app.get('/api/search', async (req, res) => {
    const searches = await Search.find().sort({ date: -1 });
    res.status(200).send(searches);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
