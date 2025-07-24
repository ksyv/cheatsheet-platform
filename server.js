const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB!'))
    .catch(err => console.error('Erreur de connexion à MongoDB', err));

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [String]
});

const Category = mongoose.model('Category', categorySchema);

app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

app.post('/categories', async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification de la catégorie', error });
    }
});

app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Category.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie', error });
    }
});

app.post('/categories/:id/notes', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const note = req.body.note;

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).send('Catégorie non trouvée');
        }

        category.items.push(note);
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

app.put('/categories/:id/notes/:index', async (req, res) => {
    const { id, index } = req.params;
    const { note } = req.body;

    try {
        const category = await Category.findById(id);
        category.items[index] = note;
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification de la note', error });
    }
});

app.delete('/categories/:id/notes/:index', async (req, res) => {
    const { id, index } = req.params;

    try {
        const category = await Category.findById(id);
        category.items.splice(index, 1);
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la note', error });
    }
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));