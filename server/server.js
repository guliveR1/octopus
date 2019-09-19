const express = require('express');
const argv = require('yargs').argv;
const bodyParser = require('body-parser');
const cors = require('cors');
const GeneralStatusApi = require('./GeneralStatus/GeneralStatusApi');

function initializeMiddleWares(app) {
    // Initialize body parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Use cors
    app.use(cors());

    // Use routes
    app.use('/general-status', GeneralStatusApi);
}

function initializeServer(app) {
    try {
        const port = argv.port || 4000;

        app.listen(port, () => console.log(`Octopus server listening on port ${port}!`));
    } catch(ex) {
        console.error(ex);
    }
}

if (argv.masterHost) {
    const app = express();

    initializeMiddleWares(app);
    initializeServer(app);
} else {
    console.log('Missing required parameter, please run again with the proper parameter.');
}

