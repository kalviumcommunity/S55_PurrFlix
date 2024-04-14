const express = require('express');
const router = express.Router();
const { Entity } = require('./schema');
const Joi = require('joi');


const {userInfo}= require('./userschema');

router.use(express.json());

const COOKIE_NAME = 'user';

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

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await userInfo.create({
            username: username,
            password: password
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error in user signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userInfo.findOne({ username: username, password: password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }
        res.status(200).json({ user });

    } catch (err) {
        console.error('Error in user login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

router.get('/get', async (req, res, next) => {
    try {
        const entities = await Entity.find({});
        res.send(entities);
    } catch (err) {
        next(err);
    }
});

router.get('/get/:id', async (req, res, next) => {
    try {
        const entity = await Entity.findById(req.params.id);
        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.send(entity);
    } catch (err) {
        next(err);
    }
});

router.post('/add', validateEntity, async (req, res, next) => {
    try {
        const newEntity = await Entity.create(req.body);
        res.status(201).json(newEntity);
    } catch (err) {
        next(err);
    }
});

router.put('/put/:id', async (req, res, next) => {
    try {
        const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.status(200).json(updatedEntity);
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const deletedEntity = await Entity.findByIdAndDelete(req.params.id);
        if (!deletedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        res.status(200).json({ message: 'Entity deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
