import React, { useState } from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//Dialog
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
//Teams Images
import Pain from '../../images/pain.png';
import INTZ from '../../images/intz.png';
import Flamengo from '../../images/flamengo.png';
import Furia from '../../images/furia.png';
import Kabum from '../../images/kabum.png';
import Prodigy from '../../images/prodigy.png';
import Redemption from '../../images/redemption.png';
import VivoKeyd from '../../images/vivoKeyd.png';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { createLeague } from '../../redux/actions/leagueActions';

const useStyles = makeStyles({
    buttonCreateLeague: {
        backgroundColor: "#1bd75e",
        '&:hover': {
            backgroundColor: "#1bd98e"
        },
        color: "#fff"
    },
    leagueTitle: {
        textAlign: 'center'
    },
    images: {
        width: 40
    },
    buttons: {
        margin: '0 auto',
        fontFamily: 'Roboto Condensed'
    },
    buttonNeg: {
        backgroundColor: '#bd321c',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#b82f1a'
        }
    },
    buttonAddEnd: {
        backgroundColor: "#1bd75e",
        '&:hover': {
            backgroundColor: "#1bd98e"
        },
        color: "#fff"
    },
    tit: {
        fontFamily: 'Roboto Condensed !important'
    }
});

export default function CreateLeague() {
    const { errors } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const classes = useStyles();

    //Open
    const [open, setOpen] = useState(false);

    //Team
    const [leagueName, setLeagueName] = useState('');
    const [image, setImage] = useState('no-img.png');
  
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleImageChange = (event, newImage) => {
       setImage(newImage);
    }

    const handleChange = (event) => {
        const name = event.target.value;
        setLeagueName(name);
    }

    const handleSubmit = () => {
        const leagueDetails = {
            name: leagueName,
            imageName: image
        }

        dispatch(createLeague(leagueDetails));
    }

    return (
        <div>   
            <Button variant="contained" onClick={handleClickOpen} className={classes.buttonCreateLeague}>Criar Liga</Button>
               
            {/* Form create league */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
                <DialogTitle id="form-dialog-title" className={classes.leagueTitle}><strong className={classes.tit}>Criar liga</strong></DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Bem vindo! Vejo que deseja criar uma liga para se divertir com seus amigos.
                    Espero que aproveitem bem a experiência e bom jogo! 
                </DialogContentText>
                    <p>Imagem da liga</p>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item sm={6} xs={12}>
                            <ToggleButtonGroup
                                value={image}
                                exclusive
                                onChange={handleImageChange}
                                aria-label="Imagem da liga"
                            >
                                <ToggleButton value="pain.png" aria-label="Pain Gaming">
                                    <img src={Pain} alt="Pain Gaming" className={classes.images} />
                                </ToggleButton>
                                <ToggleButton value="intz.png" aria-label="INTZ">
                                    <img src={INTZ} alt="INTZ" className={classes.images} />
                                </ToggleButton>
                                <ToggleButton value="flamengo.png" aria-label="Flamengo">
                                    <img src={Flamengo} alt="Flamengo" className={classes.images} />
                                </ToggleButton>
                                <ToggleButton value="furia.png" aria-label="Furia">
                                    <img src={Furia} alt="Furia" className={classes.images} />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <ToggleButtonGroup
                                value={image}
                                exclusive
                                onChange={handleImageChange}
                                aria-label="Imagem da liga"
                            >
                                <ToggleButton value="kabum.png" aria-label="Kabum">
                                    <img src={Kabum} alt="Kabum" className={classes.images} />
                                </ToggleButton>
                                <ToggleButton value="prodigy.png" aria-label="PRG">
                                    <img src={Prodigy} alt="PRG" className={classes.images} />
                                </ToggleButton>
                                <ToggleButton value="redemption.png" aria-label="Redemption">
                                    <img src={Redemption} alt="Redemption" className={classes.images} />
                                </ToggleButton>
                                <ToggleButton value="vivoKeyd.png" aria-label="Vivo Keyd">
                                    <img src={VivoKeyd} alt="Vivo Keyd" className={classes.images} />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        helperText={errors.name}
                        error={errors.name ? true : false}
                        label="Nome da liga"
                        type="text"
                        onChange={handleChange}
                        value={leagueName}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className={classes.buttons}>
                <Button onClick={handleClose} color="primary" className={classes.buttonNeg}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary" className={classes.buttonAddEnd}>
                    Criar liga
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
