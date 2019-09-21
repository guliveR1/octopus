const ssh = require('../Helpers/ssh');
const argv = require('yargs').argv;
const masterDal = require('../Master/MasterDal');
const stateBl = require('../State/StateBl');

const getGeneralStatus = async () => {
    const status = {};

    const ssh = await masterDal.createMasterConnection(
        argv.masterHost,
        argv.masterUsername,
        argv.masterPassword
    );

    status.master = argv.masterHost;
    status.masterAlive = (await masterDal.getMasterStatus(ssh)).length > 0;
    status.numOfMinions = (await masterDal.getAcceptedKeys(ssh)).split('\n').length - 1;
    status.numOfStates = (await stateBl.getStates(ssh)).length;

    return status;
};

module.exports = {
    getGeneralStatus
};