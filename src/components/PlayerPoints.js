import React, { useState } from 'react';
//MUI Stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Redux Stuff
import { useSelector , useDispatch } from 'react-redux';
import { updateUserPoints } from '../redux/actions/userActions';

const useStyles = makeStyles({
    paper: {
        padding: 20,
        marginLeft: '52px',
        textAlign: 'center',
        '& .h3': { textAlign: 'center' },
    },
    button: {
        backgroundColor: "#37bd71",
        color: "#fff",
        '&:hover': {
            backgroundColor: '#32ad68'
        }
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PlayerPoints() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { errors, messages } = useSelector(state => state.ui);

    const [open, setOpen] = useState(false);

    const handleUpdateUserPoints = () => {
        dispatch(updateUserPoints());
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return (
        <div>
            <Paper className={classes.paper}>
                <h3 className="h3">Pontuação dos membros cadastrados</h3>
                <p>Nessa aba, você poderá atualizar a pontuação semanal dos jogadores.</p>
                <p>Antes de atualizar, lembre-se de atualizar a pontuação indiviual dos jogadores.</p>
                <Button variant="contained" className={classes.button} onClick={handleUpdateUserPoints}>Atualizar</Button>
                {errors.message ? 
                        <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                {errors.message}
                            </Alert>
                        </Snackbar> : messages.message ? <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                {messages.message}
                            </Alert>
                        </Snackbar> : <div></div> }
            </Paper>
        </div>
    )
}

export default PlayerPoints;