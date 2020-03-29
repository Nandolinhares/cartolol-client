import React, { useState, useEffect } from 'react';
//MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Dialog
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
//Components
import League from '../components/Leagues/League';
//Teams Images
import Pain from '../images/pain.png';
import INTZ from '../images/intz.png';
import Flamengo from '../images/flamengo.png';
import Furia from '../images/furia.png';
import Kabum from '../images/kabum.png';
import Prodigy from '../images/prodigy.png';
import Redemption from '../images/redemption.png';
import VivoKeyd from '../images/vivoKeyd.png';
// import Flamengo from '../images/flamengo.png';
// import Pain from '../images/pain.png';
// import INTZ from '../images/intz.png';
// import Flamengo from '../images/flamengo.png';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { getMyLeagues } from '../redux/actions/userActions';
import { createLeague } from '../redux/actions/leagueActions';

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    imageLeague: {
        width: 80
    },
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
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyLeagues(props) {
    const { myLeagues, authenticated } = useSelector(state => state.user);
    const { errors } = useSelector(state => state.ui);
    const { messageCreateLeague } = useSelector(state => state.league)
    const{ loading } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    //Open notification
    const [openNotification, setOpenNotification] = useState(false);


    //Open
    const [open, setOpen] = useState(false);

    //Team
    const [leagueName, setLeagueName] = useState('');
    const [image, setImage] = useState('no-img.png');

    useEffect(() => {
        dispatch(getMyLeagues());
    }, [dispatch]);

    useEffect(() => {
        if(messageCreateLeague.message) {
           setOpen(false);
           setLeagueName('');
        }
    }, [messageCreateLeague])

    //const userHandle = props.match.params.handle;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenNotification(false);
      };

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
        setOpenNotification(true);
        messageCreateLeague.message = '';
    }


    return (
        <div className={classes.root}>
            {!loading ? (authenticated &&(
               <div>    
                    <h2>Minhas ligas</h2>  
                    <Grid container spacing={3}>
                        <Grid item sm></Grid>
                        <Grid item sm></Grid>
                        <Grid item sm>
                            <Button variant="contained" onClick={handleClickOpen} className={classes.buttonCreateLeague}>Criar liga</Button>
                        </Grid>
                    </Grid>
                    {/* Form create league */}
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
                        <DialogTitle id="form-dialog-title" className={classes.leagueTitle}>Criar Liga</DialogTitle>
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
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Criar liga
                        </Button>
                        </DialogActions>
                    </Dialog>
                    {errors.message &&(
                        <Snackbar open={openNotification} autoHideDuration={3500} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="error">
                                {errors.message}
                            </Alert>
                        </Snackbar>
                    )}
                    {messageCreateLeague.message &&(
                        <Snackbar open={openNotification} autoHideDuration={3500} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="success">
                                {messageCreateLeague.message}
                            </Alert>
                        </Snackbar>
                    )}
                    {myLeagues.length > 0 ? (
                        myLeagues.map(league => (
                            <div key={Math.random() * 10000}>
                                <h2>{league.name}</h2>
                                <img src={league.leagueImageUrl} className={classes.imageLeague} />
        
                                {league.friends.map((friend, index) => (
                                <League key={Math.random() * 10000} friend={friend} />
                                )).sort(function(a, b){
                                    return a.points - b.points
                                })}
                            </div>
                        ))
                    ) : <p>Você não possui ligas</p>}
               </div>
            ) 
            ) : <CircularProgress />}
            
        </div>
    )
}
