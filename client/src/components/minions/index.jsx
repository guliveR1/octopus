import React from 'react';
import {Fab, withStyles} from '@material-ui/core';
import style from './style';
import {Add as AddIcon} from '@material-ui/icons';
import AddMinionDialog from './add-minion';

class Minions extends React.Component {
    state = {
        addDialogOpen: false
    };

    render() {
        const {classes} = this.props;
        const {addDialogOpen} = this.state;

        return (
            <>
                <Fab color="primary" onClick={() => this.setState({addDialogOpen: true})} className={classes.addButton}>
                    <AddIcon />
                </Fab>

                <AddMinionDialog open={addDialogOpen} />
            </>
        );
    }
}

export default withStyles(style)(Minions);