const node_ssh = require('node-ssh');

const runCommand = async (host, username, password, command) => {
    const ssh = new node_ssh();

    await ssh.connect({
        host,
        username,
        password
    });

    return ssh.execCommand(command);
};

module.exports = {
    runCommand
};