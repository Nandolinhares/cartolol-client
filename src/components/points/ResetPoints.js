import React, { useState } from 'react';
//MUI Stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector , useDispatch } from 'react-redux';
import { resetPoints } from '../../redux/actions/userActions';

const useStyles = makeStyles({
    paper: {
        padding: 20,
        marginRight: '52px',
        textAlign: 'center',
    },
    h3: {
        textAlign: 'center',
        color: '#fff'
    },
    text: {
        color: '#fff',
        textAlign: 'justify',
        fontSize: 14
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

export default function ResetPoints() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { errors, messages } = useSelector(state => state.ui);

    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleResetUserPoints = () => {
        dispatch(resetPoints());
        setOpen(false);
        setConfirm(true);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        setOpen(false);
        setConfirm(false);
    };

    return (
        <div>
            <Paper className={classes.paper}>
                <h3 className={classes.h3}>Resetar pontuação dos membros cadastrados</h3>
                <p className={classes.text}>Nessa aba, você poderá resetar a pontuação de todos os membros com uma ação.</p>
                <p className={classes.text}>Antes de resetar, lembre-se de verificar que é isso mesmo o necessário.</p>
                <Button variant="contained" className={classes.button} onClick={handleOpen}>Atualizar</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Deseja mesmo resetar a pontuação dos membros?</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Antes de resetar, lembre-se de verificar que é isso mesmo o necessário.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleResetUserPoints} color="primary" autoFocus>
                        Atualizar
                    </Button>
                    </DialogActions>
                </Dialog>
                {errors.message && confirm ? 
                        <Snackbar open={confirm} autoHideDuration={3500} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                {errors.message}
                            </Alert>
                        </Snackbar> : messages.message  ? <Snackbar open={confirm} autoHideDuration={3500} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                {messages.message}
                            </Alert>
                        </Snackbar> : <div></div> }
            </Paper>
        </div>
    )
}
