import React from 'react';
import {
    Fab,
    withStyles,
    Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress,
    Tooltip,
    IconButton
} from '@material-ui/core';
import style from './style';
import {Add as AddIcon, Send as SendIcon, Edit as EditIcon} from '@material-ui/icons';
import AddStateDialog from './components/add-state';
import ApplyStateDialog from './components/apply-state';
import {getStates} from './services/state.service';

class States extends React.Component {
    state = {
        addDialogOpen: false,
        editDialogOpen: false,
        applyDialogOpen: false
    };

    componentDidMount() {
        this.loadStates();
    }

    async loadStates() {
        try {
            this.setState({states: undefined});
            const result = await getStates();

            this.setState({states: result.data});
        } catch(ex) {
            this.setState({error: true});
        }
    }

    render() {
        const {classes} = this.props;
        const {addDialogOpen, editDialogOpen, applyDialogOpen, states, error, selectedName, selectedInitFile} = this.state;

        return (
            <>
                <Typography variant="h4">
                    States
                </Typography>
                <br />
                {
                    states ? <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>State Name</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    states.map(state =>
                                        <TableRow key={state.name}>
                                            <TableCell component="th" scope="row">
                                                {state.name}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Edit init.sls">
                                                    <IconButton onClick={() => this.setState({editDialogOpen: true, selectedName: state.name, selectedInitFile: state.initFile})}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Apply state">
                                                    <IconButton onClick={() => this.setState({applyDialogOpen: true, selectedName: state.name})}>
                                                        <SendIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Paper> : error ? 'An error occured while fetching states, please try again or contact the site administrator.' : <CircularProgress />
                }

                <Fab color="primary" onClick={() => this.setState({addDialogOpen: true})} className={classes.addButton}>
                    <AddIcon />
                </Fab>

                <AddStateDialog open={addDialogOpen} onAdd={() => this.loadStates()} onClose={() => this.setState({addDialogOpen: false})} />
                <AddStateDialog edit={editDialogOpen} onAdd={() => this.loadStates()} initFile={selectedInitFile} name={selectedName} open={editDialogOpen} onClose={() => this.setState({editDialogOpen: false})} />
                <ApplyStateDialog name={selectedName} open={applyDialogOpen} onClose={() => this.setState({applyDialogOpen: false})} />
            </>
        );
    }
}

export default withStyles(style)(States);