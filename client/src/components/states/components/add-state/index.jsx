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
import {addState} from '../../services/state.service';

class AddStateDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            adding: false,
            snackBar: {},
            name: '',
            initFile: ''
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            open: nextProps.open,
            name: nextProps.name,
            initFile: nextProps.initFile
        });
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
        const edit = this.props.edit;

        this.showSnackbar((edit ? 'Editing' : 'Adding') + ' state, please wait...');

        try {
            this.setState({adding: true});
            await addState(this.state.name, this.state.initFile);
            this.showSnackbar('State ' + (edit ? 'edited' : 'added') + ' successfully!');
            this.setState({adding: false}, this.handleClose.bind(this));
            this.props.onAdd();
        } catch(ex) {
            this.setState({adding: false});
            this.showSnackbar('There was an error ' + (edit ? 'editing' : 'adding') + ' this state, please contact the site administrator.');
        } finally {
            setTimeout(this.hideSnackbar.bind(this), 3000);
        }
    }

    render() {
        const {open, snackBar, adding, name, initFile} = this.state;
        const {classes, edit} = this.props;

        return (
            <div>
                <Dialog open={open} onBackdropClick={this.handleClose.bind(this)}>
                    <DialogTitle>{edit ? 'Edit init.sls' : 'Add New State'}</DialogTitle>
                    <Divider />
                    <DialogContent className={classes.dialogContent}>
                        <DialogContentText>
                            {edit ? '' : 'Please enter the details of the salt state you wish to add:'}
                        </DialogContentText>
                        <TextField
                            variant="outlined"
                            label="Unique Name:"
                            id="name"
                            onChange={this.handleChange.bind(this)}
                            value={name || ''}
                            disabled={edit}
                            type="text"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            label="Initialization File (init.sls):"
                            id="initFile"
                            value={initFile || ''}
                            onChange={this.handleChange.bind(this)}
                            type="text"
                            multiline
                            rows="10"
                            helperText="Should be in yaml format!"
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
                            {edit ? 'Edit' : 'Add'}
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

export default withStyles(style)(AddStateDialog);