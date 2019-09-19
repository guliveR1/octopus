import React from 'react';
import {Typography, CircularProgress} from "@material-ui/core";
import { getGeneralStatus } from './services/general-status.service';

class GeneralStatus extends React.Component {
    state = {};

    componentDidMount() {
        this.loadGeneralStatus();
    }

    loadGeneralStatus() {
        getGeneralStatus().then((response) => {
            setTimeout(() => this.setState({...response.data, loaded: true}), 2000);
        }).catch((error) => {
            setTimeout(() => this.setState({error: error, loaded: true}), 2000);
        });
    }

    render() {
        const {loaded, error, master, masterAlive, numOfMinions, numOfStates} = this.state;

        return (
            <>
                <Typography variant="h4">
                    General Status
                </Typography>
                <br />
                {
                    (loaded && !error) ?
                        <Typography variant="body1">
                            Master server: <b>{master}</b><br/>
                            Master status: <b style={{color: masterAlive ? 'green' : 'red'}}>{masterAlive ? 'Alive' : 'Dead'}</b> <br/>
                            Number of minions: <b>{numOfMinions}</b> <br/>
                            Number of states: <b>{numOfStates}</b>
                        </Typography> : ''
                }
                {
                    !loaded ? <CircularProgress /> : ''
                }
                {
                    error ? 'An error occured while fetching general status, please try again or contact the site administrator.' : ''
                }
            </>
        );
    }
}
export default GeneralStatus;