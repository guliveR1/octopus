const minionDal = require('./MinionDal');
const masterDal = require('../Master/MasterDal');
const strings = require('../strings');
const argv = require('yargs').argv;

const getMinions = async() => {
    let masterSsh;

    try {
        masterSsh = await masterDal.createMasterConnection(argv.masterHost, argv.masterUsername, argv.masterPassword);
        const hosts = (await masterDal.pingMinions(masterSsh)).split('\n');
        const minions = [];

        for (let index = 0; index < hosts.length; index += 2) {
            minions.push({
                hostname: hosts[index].substr(0, hosts[index].length - 1),
                ping: hosts[index + 1].includes('True')
            });
        }

        return minions;
    } catch(ex) {
        throw ex;
    } finally {
        if (masterSsh) masterSsh.dispose();
    }
};

const addMinion = async (host, username, password) => {
    let ssh;
    let masterSsh;

    try {
        ssh = await minionDal.createMinionConnection(host, username, password);
    } catch (ex) {
        console.error(ex);
        throw strings.ssh_error;
    }

    try {
        await minionDal.installSalt(ssh);
        await minionDal.setMaster(ssh, argv.masterHost);
        const minionHostname = await minionDal.getMinionHostname(ssh);

        masterSsh = await masterDal.createMasterConnection(argv.masterHost, argv.masterUsername, argv.masterPassword);
        await masterDal.acceptMinionKey(masterSsh, minionHostname);
        let minionAlive = await masterDal.pingMinion(masterSsh, minionHostname);

        if (!minionAlive) minionAlive = await masterDal.pingMinion(masterSsh, minionHostname);
        if (!minionAlive) throw strings.minion_error;
    } catch(ex) {
        throw ex;
    } finally {
        if (ssh) ssh.dispose();
        if (masterSsh) masterSsh.dispose();
    }
};

const restartMinion = async (host, username, password) => {
    let ssh;

    try {
        ssh = await minionDal.createMinionConnection(host, username, password);

        await minionDal.restartMinion(ssh);
    } catch (ex) {
        throw ex;
    } finally {
        if (ssh) ssh.dispose();
    }
};

module.exports = {
    addMinion,
    getMinions,
    restartMinion
};