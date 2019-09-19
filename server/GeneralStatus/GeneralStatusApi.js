const express = require('express');
const router = express.Router();
const strings = require('../strings');
const argv = require('yargs').argv;

const getGeneralStatus = async (req, res) => {
    try {
        res.status(200).json({
            master: argv.master,
            masterAlive: true,
            numOfMinions: 23,
            numOfStates: 13
        });
    } catch (ex) {
        res.status(500).send(strings.error);
    }
};

router.get('/', getGeneralStatus);

module.exports = router;