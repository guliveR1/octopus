const express = require('express');
const router = express.Router();
const strings = require('../strings');
const stateBl = require('./StateBl');

const getStates = async (req, res) => {
    try {
        res.status(200).json(await stateBl.getStates());
    } catch (ex) {
        console.error(ex);
        res.status(500).send(strings.error);
    }
};

const addState = async (req, res) => {
    const name = req.body.name;
    const initFile = req.body.initFile;

    try {
        await stateBl.addState(name, initFile);

        res.status(200).json('success');
    } catch (ex) {
        console.error(ex);
        res.status(500).send(strings.error);
    }
};

const applyState = async (req, res) => {
    const name = req.params.name;
    const minions = req.body.minions;

    try {
        res.status(200).json((await stateBl.applyState(name, minions)).replace(/\n/g, '<br />'));
    } catch (ex) {
        console.error(ex);

        if (ex.error === 'ERROR: Minions returned with non-zero exit code') {
            res.status(200).json(ex.additional_info.replace(/\n/g, "<br />"));
        } else {
            res.status(500).send(strings.error);
        }
    }
};

router.post('/', addState);
router.get('/', getStates);
router.post('/:name', applyState);

module.exports = router;