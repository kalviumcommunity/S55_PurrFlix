const express = require('express');
const router = express.Router();
const { Entity } = require('./schema');

router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const entities = await Entity.find({});
        res.send(entities);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newEntity = await Entity.create(req.body);
        res.status(201).json(newEntity);
    } catch (err) {
        console.error('Error adding entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/put', async (req, res) => {
    try {
        res.send("PUT request");
    } catch (err) {
        console.error('Error in PUT request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        
        res.send("DELETE request");
    } catch (err) {
        console.error('Error in DELETE request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// get request

module.exports = router;