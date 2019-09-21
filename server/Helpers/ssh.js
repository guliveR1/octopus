const node_ssh = require('node-ssh');

const createConnection = async (host, username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ssh = new node_ssh();

            await ssh.connect({
                host,
                username,
                password,
                tryKeyboard: true,
                onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
                    if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
                        finish([password])
                    }
                }
            });

            let shellStream = await ssh.requestShell();

            shellStream.on('data', (data) => {
                let stringData = data.toString().trim();
                if (stringData === "[sudo] password for root:") {
                    let pass = password + "\n";
                    shellStream.write(pass);
                    resolve(ssh);
                } else if (stringData.includes('root')) {
                    resolve(ssh);
                }
            });

            shellStream.stderr.on('data', (data) => {
                console.error(data);
                reject(data);
            });

            shellStream.write("sudo -i\n");
        } catch(ex) {
            reject(ex);
        }
    });
};

const runCommand = (ssh, command) => {
    return new Promise((resolve, reject) => {
        ssh.execCommand(command).then(result => {
            if (result.stderr && !result.stderr.includes('WARNING')) reject({error: result.stderr, additional_info: result.stdout});
            else resolve(result.stdout);
        });
    });
};

const runSingleCommand = async (host, username, password, command) => {
    const ssh = await createConnection(host, username, password);

    const result = await ssh.execCommand(command);

    ssh.dispose();

    return result;
};

module.exports = {
    runSingleCommand,
    createConnection,
    runCommand
};