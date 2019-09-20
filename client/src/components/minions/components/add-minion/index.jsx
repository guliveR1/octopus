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
    withStyles
} from '@material-ui/core';
import style from './style';
import {addMinion} from '../../services/minion.service';

class AddMinionDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            adding: false,
            snackBar: {},
            hostname: '',
            username: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({open: nextProps.open});
    }

    handleClose() {
        if (!this.state.adding) {
            this.setState({open: false});
            this.props.onClose();
        }
    }

    showSnackbar(message) {
        this.setState({
            snackBar: {
                open: true,
                message: message
            }
        });
    }

    hideSnackbar() {
        this.setState({
            snackBar: {
                open: false
            }
        });
    }

    handleChange(event) {
        const state = {};

        state[event.target.id] = event.target.value;

        this.setState(state);
    }

    async handleAdd() {
        this.showSnackbar('Adding minion, please wait...');

        try {
            this.setState({adding: true});
            await addMinion(this.state.hostname, this.state.username, this.state.password);
            this.showSnackbar('Minion added successfully!');
            this.setState({adding: false}, this.handleClose.bind(this));
            this.props.onAdd();
        } catch(ex) {
            this.setState({adding: false});
            this.showSnackbar('There was an error adding this minion, please contact the site administrator.');
        } finally {
            setTimeout(this.hideSnackbar.bind(this), 3000);
        }
    }

    render() {
        const {open, snackBar, adding} = this.state;
        const {classes} = this.props;

        return (
            <div>
                <Dialog open={open} onBackdropClick={this.handleClose.bind(this)}>
                    <DialogTitle>Add New Minions</DialogTitle>
                    <Divider />
                    <DialogContent className={classes.dialogContent}>
                        <DialogContentText>
                            Please enter the details of the server you want to configure as minions:
                        </DialogContentText>
                        <TextField
                            variant="outlined"
                            label="Hostname"
                            id="hostname"
                            onChange={this.handleChange.bind(this)}
                            type="text"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            label="Username"
                            id="username"
                            onChange={this.handleChange.bind(this)}
                            type="text"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            label="Password"
                            id="password"
                            onChange={this.handleChange.bind(this)}
                            type="password"
                            className={classes.textField}
                            fullWidth
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button disabled={adding} onClick={this.handleClose.bind(this)} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={adding} onClick={this.handleAdd.bind(this)} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={snackBar.open}
                    message={snackBar.message}
                />
            </div>
        );
    }
}

export default withStyles(style)(AddMinionDialog);