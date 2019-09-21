const express = require('express');
const router = express.Router();
const strings = require('../strings');
const argv = require('yargs').argv;
const generalStatusBl = require('./GeneralStatusBl');

const getGeneralStatus = async (req, res) => {
    try {
        const status = await generalStatusBl.getGeneralStatus();

        res.status(200).json(status);
    } catch (ex) {
        console.error(ex);
        res.status(500).send(strings.error);
    }
};

router.get('/', getGeneralStatus);

module.exports = router;