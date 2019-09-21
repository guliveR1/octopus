import {Build as BuildIcon, List as ListIcon, InsertDriveFile as StatesIcon} from '@material-ui/icons';
import React from 'react';
import Minions from '../components/minions';
import States from '../components/states';
import GeneralStatus from "../components/general-status";

const routes = [
    {
        title: "General Status",
        path: "/general-status",
        icon: <BuildIcon />,
        component: GeneralStatus
    },
    {
        title: "Minions",
        path: "/minions",
        icon: <ListIcon />,
        component: Minions
    },
    {
        title: "States",
        path: "/states",
        icon: <StatesIcon />,
        component: States
    }
];

export default routes;