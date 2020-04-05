import React, { useState } from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { addFriendToLeague } from '../../redux/actions/leagueActions';

const useStyles = makeStyles({
    buttonAddFriend: {
        backgroundColor: "#1bd75e",
        '&:hover': {
            backgroundColor: "#1bd98e"
        },
        color: "#fff"
    },
});

export default function AddFriendToLeague(props) {
    const { errors } = useSelector(state => state.ui);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [friendHandle, setFriendHandle] = useState('');
    const league = props.league;
    const dispatch = useDispatch();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
        const friend = event.target.value
        setFriendHandle(friend);
    }

    const handleSubmit = () => {
        const leagueName = league.name;
        const friend = friendHandle

        if(friend.trim() === '') {
            alert('O campo nome não pode ficar vazio');
        } else {
            dispatch(addFriendToLeague(leagueName, friend));
        }
    }

    return (
        <div>
            <Tooltip title="Adicionar amigo a liga" placement="top">   
                <IconButton className={classes.buttonAddFriend} onClick={handleClickOpen}>
                    <AddIcon  />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar amigo em {league.name}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                   Digite o nome de usuário do amigo que deseja adicionar
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="friendHandle"
                    label="Nome de usuário do amigo"
                    type="text"
                    helperText={errors.message}
                    error={errors.message ? true : false }
                    onChange={handleChange}
                    value={friendHandle}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Adicionar
                </Button>
                </DialogActions>
            </Dialog>        
        </div>
    )
}
