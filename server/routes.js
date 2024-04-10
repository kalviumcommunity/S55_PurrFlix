const express = require('express');
const router = express.Router();
const { Entity } = require('./schema');
const Joi = require('joi');

router.use(express.json());

const entitySchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    videourl: Joi.string().required(),
    image: Joi.string().required(),
    duration: Joi.string().required()
});

const validateEntity = (req, res, next) => {
    const { error } = entitySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

router.get('/get', async (req, res) => {
    try {
        const entities = await Entity.find({});
        res.send(entities);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const entity = await Entity.findById(req.params.id);
        res.send(entity);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', validateEntity, async (req, res) => {
    try {
        const newEntity = await Entity.create(req.body);
        res.status(201).json(newEntity);
    } catch (err) {
        console.error('Error adding entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/put/:id', async (req, res) => {
    try {
        const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEntity);
    } catch (err) {
        console.error('Error in PUT request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedEntity = await Entity.findByIdAndDelete(req.params.id);
        if (!deletedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.status(200).json({ message: 'Entity deleted successfully' });
    } catch (err) {
        console.error('Error in DELETE request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
