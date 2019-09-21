const express = require('express');
const router = express.Router();
const strings = require('../strings');
const sshHelper = require('../Helpers/ssh');
const minionBl = require('./MinionBl');

const getMinions = async (req, res) => {
    try {
        const minions = await minionBl.getMinions();

        res.status(200).json(minions);
    } catch (ex) {
        console.error(ex);
        res.status(500).send(strings.error);
    }
};

const addMinion = async (req, res) => {
    const minionHost = req.body.minionHost;
    const minionUsername = req.body.minionUsername;
    const minionPassword = req.body.minionPassword;

    try {
        await minionBl.addMinion(minionHost, minionUsername, minionPassword);

        res.status(200).json('success');
    } catch (ex) {
        console.error(ex);
        res.status(500).send(ex === strings.ssh_error ? strings.ssh_error : strings.error);
    }
};

const restartMinion = async (req, res) => {
    const minionHost = req.body.minionHost;
    const minionUsername = req.body.minionUsername;
    const minionPassword = req.body.minionPassword;

    try {
        await minionBl.restartMinion(minionHost, minionUsername, minionPassword);

        res.status(200).json('success');
    } catch (ex) {
        console.error(ex);
        res.status(500).send(ex === strings.ssh_error ? strings.ssh_error : strings.error);
    }
};

router.get('/', getMinions);
router.post('/', addMinion);
router.post('/restart', restartMinion);

module.exports = router;