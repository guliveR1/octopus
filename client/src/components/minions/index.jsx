import React from 'react';
import {
    Fab,
    withStyles,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    IconButton,
    CircularProgress, Typography
} from '@material-ui/core';
import style from './style';
import {Add as AddIcon, Refresh as RefreshIcon} from '@material-ui/icons';
import AddMinionDialog from './components/add-minion';
import {getMinions} from './services/minion.service';

class Minions extends React.Component {
    state = {
        addDialogOpen: false,
        restartDialogOpen: false
    };

    componentDidMount() {
        this.loadMinions();
    }

    async loadMinions() {
        try {
            this.setState({minions: undefined});
            const result = await getMinions();

            this.setState({minions: result.data});
        } catch(ex) {
            this.setState({error: true});
        }
    }

    render() {
        const {classes} = this.props;
        const {addDialogOpen, restartDialogOpen, minions, error} = this.state;

        return (
            <>
                <Typography variant="h4">
                    Minions
                </Typography>
                <br />
                {
                    minions ? <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Hostname</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    minions.map(minion =>
                                        <TableRow key={minion.hostname}>
                                            <TableCell component="th" scope="row">
                                                {minion.hostname}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <b style={{color: minion.ping ? 'green' : 'red'}}>
                                                    {minion.ping ? 'Alive' : 'Dead'}
                                                </b>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Restart minion">
                                                    <IconButton onClick={() => this.setState({restartDialogOpen: true})}>
                                                        <RefreshIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Paper> : error ? 'An error occured while fetching minions, please try again or contact the site administrator.' : <CircularProgress />
                }

                <Fab color="primary" onClick={() => this.setState({addDialogOpen: true})} className={classes.addButton}>
                    <AddIcon />
                </Fab>

                <AddMinionDialog open={addDialogOpen} onClose={() => this.setState({addDialogOpen: false})} onAdd={() => this.loadMinions()} />
                <AddMinionDialog open={restartDialogOpen} restart={true} onClose={() => this.setState({restartDialogOpen: false})} onAdd={() => this.loadMinions()} />
            </>
        );
    }
}

export default withStyles(style)(Minions);