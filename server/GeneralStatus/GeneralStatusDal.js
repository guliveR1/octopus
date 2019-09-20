const ssh = require('../Helpers/ssh');

const getMasterStatus = async (host, username, password) => {
    const result = ssh.runSingleCommand(
        host,
        username,
        password,
        'service salt-master status | grep running'
    );

    return result;
};

module.exports = {
    getMasterStatus
};