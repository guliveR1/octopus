const ssh = require('../Helpers/ssh');
const argv = require('yargs').argv;
const generalStatusDal = require('./GeneralStatusDal');
const minionBl = require('../Minion/MinionBl');

const getMasterStatus = async () => {
    const result = await generalStatusDal.getMasterStatus(
        argv.masterHost,
        argv.masterUsername,
        argv.masterPassword
    );

    return result.stdout.length > 0;
};

const getNumOfMinions = async () => {
    return (await minionBl.getMinions()).length;
};

module.exports = {
    getMasterStatus,
    getNumOfMinions
};