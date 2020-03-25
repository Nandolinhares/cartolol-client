import React from 'react';
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
//Redux Stuff
import { useSelector } from 'react-redux';
import { resetUserPassword } from '../redux/actions/userActions';

export default function resetPassword() {
    return (
        <div>
            <h2>Resetar senha</h2>
        </div>
    )
}
