const sshHelper = require('../Helpers/ssh');

const createMasterConnection = async (host, username, password) => {
    return await sshHelper.createConnection(host, username, password);
};

const acceptMinionKey = async (ssh, minionHostname) => {
    const result = await sshHelper.runCommand(ssh, `sudo salt-key -y -a ${minionHostname}`);

    return result;
};

const pingMinion = async (ssh, minionHostname) => {
    return (await sshHelper.runCommand(ssh, `sudo salt '${minionHostname}' test.ping | grep True`)).length > 0;
};

const pingMinions = async(ssh) => {
    return await sshHelper.runCommand(ssh, 'sudo salt \'*\' test.ping');
};

module.exports = {
    createMasterConnection,
    acceptMinionKey,
    pingMinion,
    pingMinions
};