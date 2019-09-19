const ssh = require('../Helpers/ssh');
const argv = require('yargs').argv;

const getMasterStatus = async () => {
    const result = await ssh.runCommand(
        argv.masterHost,
        argv.masterUsername,
        argv.masterPassword,
        'service salt-master status | grep running'
    );

    return result.stdout.length > 0;
};

module.exports = {
    getMasterStatus
};