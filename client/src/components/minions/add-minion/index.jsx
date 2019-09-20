import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    withStyles
} from '@material-ui/core';
import style from './style';

class AddMinionDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
        this.setState({open: nextProps.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        const {open} = this.state;
        const {classes} = this.props;

        return (
            <div>
                <Dialog open={open} onBackdropClick={this.handleClose.bind(this)}>
                    <DialogTitle>Add New Minions</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the details of the server you want to configure as minions:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            variant="outlined"
                            label="Display Name"
                            type="text"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            label="Hostname"
                            type="email"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            label="Username"
                            type="text"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            className={classes.textField}
                            fullWidth
                        />
                    </DialogContent>
                    <Divi
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(style)(AddMinionDialog);