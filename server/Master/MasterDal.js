const sshHelper = require('../Helpers/ssh');

const createMasterConnection = async (host, username, password) => {
    return await sshHelper.createConnection(host, username, password);
};

const acceptMinionKey = async (ssh, minionHostname) => {
    return await sshHelper.runCommand(ssh, `sudo salt-key -y -a ${minionHostname}`);
};

const pingMinion = async (ssh, minionHostname) => {
    return (await sshHelper.runCommand(ssh, `sudo salt '${minionHostname}' test.ping | grep True`)).length > 0;
};

const getAcceptedKeys = async(ssh) => {
    return await sshHelper.runCommand(ssh, 'sudo salt-key -l acc');
};

const getMasterStatus = async (ssh) => {
    return await sshHelper.runCommand(ssh, 'service salt-master status | grep running');
};

const pingMinions = async(ssh) => {
    return await sshHelper.runCommand(ssh, 'sudo salt \'*\' test.ping');
};

const addState = async(ssh, name, initFile) => {
    await sshHelper.runCommand(ssh, `sudo mkdir -p /srv/salt/${name}`);
    await sshHelper.runCommand(ssh, `sudo echo "${initFile}" > ./init.sls`);
    return await sshHelper.runCommand(ssh, `sudo mv ./init.sls /srv/salt/${name}/init.sls`);
};

const applyState = async(ssh, name, minions) => {
    return await sshHelper.runCommand(ssh, `sudo salt -L '${minions}' state.apply ${name}`);
};

const getStates = async (ssh) => {
    return await sshHelper.runCommand(ssh, 'ls -d /srv/salt/*/');
};

const getStateInitFile = async (ssh, name) => {
    return await sshHelper.runCommand(ssh, `sudo cat /srv/salt/${name}/init.sls`)
};

module.exports = {
    createMasterConnection,
    acceptMinionKey,
    pingMinion,
    pingMinions,
    getMasterStatus,
    getAcceptedKeys,
    addState,
    getStates,
    getStateInitFile,
    applyState
};