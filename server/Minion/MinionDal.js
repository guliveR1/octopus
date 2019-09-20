const sshHelper = require('../Helpers/ssh');

const createMinionConnection = async (host, username, password) => {
    return await sshHelper.createConnection(host, username, password);
};

const installSalt = async (ssh) => {
    let result = await sshHelper.runCommand(ssh, 'echo "deb http://repo.saltstack.com/apt/ubuntu/18.04/amd64/latest bionic main" | sudo tee /etc/apt/sources.list.d/saltstack.list');
    result = await sshHelper.runCommand(ssh, 'sudo apt -y install salt-minion');

    return result;
};

const setMaster = async (ssh, masterHost) => {
    let result = await sshHelper.runCommand(ssh, `echo "master: ${masterHost}" > ./minion`);
    result = await sshHelper.runCommand(ssh, 'sudo mv ./minion /etc/salt/minion');
    result = await sshHelper.runCommand(ssh, 'sudo service salt-minion restart');

    return result;
};

const getMinionHostname = async (ssh) => {
    return await sshHelper.runCommand(ssh, 'hostname');
};

module.exports = {
    createMinionConnection,
    installSalt,
    setMaster,
    getMinionHostname
};