import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Divider,
    Snackbar,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    List,
    withStyles, CircularProgress
} from '@material-ui/core';
import style from './style';
import {applyState} from '../../services/state.service';
import {getMinions} from "../../../minions/services/minion.service";

class ApplyStateDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            applying: false,
            snackBar: {},
            checked: []
        };
    }

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

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            open: nextProps.open
        });
    }

    handleClose() {
        if (!this.state.applying || this.state.response) {
            this.setState({open: false});
            this.props.onClose();
        }
    }

    async handleApply() {
        this.setState({applying: true});

        try {
            const result = await applyState(this.props.name, this.state.checked);

            this.setState({response: result.data});
        } catch(ex) {
            this.setState({applyError: true});
        }
    }

    handleToggle(value) {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({checked: newChecked});
    }

    render() {
        const {open, applying, checked, minions, error, response, applyError} = this.state;
        const {classes, name} = this.props;

        return (
            <div>
                <Dialog maxWidth="sm" fullWidth open={open} onBackdropClick={this.handleClose.bind(this)}>
                    <DialogTitle>Apply Salt State - {name}</DialogTitle>
                    <Divider />
                    <DialogContent className={classes.dialogContent}>
                        {
                            response ? <>
                                <DialogContentText>
                                    The state was applied and the following response was received:
                                </DialogContentText>
                                <div dangerouslySetInnerHTML={{ __html: response }} />
                            </> : ''
                        }
                        {
                            (applying && !response) || !minions ? <CircularProgress /> : ''
                        }
                        {
                            error ? 'An error occured while fetching minions, please try again or contact the site administrator.' : ''
                        }
                        {
                            !applying && minions ? <><DialogContentText>
                                Please select minions to apply this state to:
                            </DialogContentText>
                            <List className={classes.root}>
                                {minions.map(minion => {
                                    return (
                                        <ListItem key={minion.hostname} role={undefined} dense button onClick={() => this.handleToggle(minion.hostname)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(minion.hostname) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={minion.hostname} />
                                        </ListItem>
                                    );
                                })}
                            </List></> : ''
                        }
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button disabled={applying && !response} onClick={this.handleClose.bind(this)} color="primary">
                            {response ? 'Done' : 'Cancel'}
                        </Button>
                        <Button disabled={applying || checked.length === 0} onClick={this.handleApply.bind(this)} color="primary">
                            Apply
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(style)(ApplyStateDialog);