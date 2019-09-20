const node_ssh = require('node-ssh');

const runCommand = async (host, username, password, command) => {
    const ssh = new node_ssh();

    await ssh.connect({
        host,
        username,
        password
    });

    const result = ssh.execCommand(command);

    ssh.dispose();

    return result;
};

module.exports = {
    runCommand
};