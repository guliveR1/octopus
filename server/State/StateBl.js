const masterDal = require('../Master/MasterDal');
const argv = require('yargs').argv;

const getStates = async() => {
    let masterSsh;

    try {
        masterSsh = await masterDal.createMasterConnection(argv.masterHost, argv.masterUsername, argv.masterPassword);

        const states = (await masterDal.getStates(masterSsh)).split('\n');
        const statesArr = [];

        for (const state of states) {
            const name = state.replace('/srv/salt/', '').replace('/', '');

            statesArr.push({
                name,
                initFile: await masterDal.getStateInitFile(masterSsh, name)
            })
        }

        return statesArr;
    } catch(ex) {
        throw ex;
    } finally {
        if (masterSsh) masterSsh.dispose();
    }
};

const addState = async (name, initFile) => {
    let masterSsh;

    try {
        masterSsh = await masterDal.createMasterConnection(argv.masterHost, argv.masterUsername, argv.masterPassword);
        await masterDal.addState(masterSsh, name, initFile);
    } catch(ex) {
        throw ex;
    } finally {
        if (masterSsh) masterSsh.dispose();
    }
};

const applyState = async (name, minions) => {
    let masterSsh;

    try {
        masterSsh = await masterDal.createMasterConnection(argv.masterHost, argv.masterUsername, argv.masterPassword);
        return await masterDal.applyState(masterSsh, name, minions.join(','));
    } catch(ex) {
        throw ex;
    } finally {
        if (masterSsh) masterSsh.dispose();
    }
};

module.exports = {
    addState,
    getStates,
    applyState
};