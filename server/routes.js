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

router.post('/post', async (req, res) => {
    try {
        console.log(req.body);
        const entity = new Entity(req.body);
        const savedEntity = await entity.save();
        res.json(savedEntity);
    } catch (err) {
        console.error('Error in POST request:', err);
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

module.exports = router;