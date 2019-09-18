import {Home as HomeIcon} from '@material-ui/icons';
import React from 'react';
import Minions from '../components/minions';
import GeneralStatus from "../components/general-status";

const routes = [
    {
        title: "General Status",
        path: "/general-status",
        icon: <HomeIcon />,
        component: GeneralStatus
    },
    {
        title: "Minions",
        path: "/minions",
        icon: <HomeIcon />,
        component: Minions
    }
];

export default routes;