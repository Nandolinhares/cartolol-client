import React, { useState, useEffect } from 'react';
//MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
//Components
import MyLeague from '../components/Leagues/MyLeague';
import CreateLeague from '../components/Leagues/CreateLeague';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { getMyLeagues } from '../redux/actions/userActions';
import AddFriendToLeague from '../components/Leagues/AddFriendToLeague';

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    imageLeague: {
        width: 80
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyLeagues(props) {
    const { myLeagues, authenticated } = useSelector(state => state.user);
    const { messageCreateLeague, messageAddFriendToLeague, messageDeleteUser } = useSelector(state => state.league);
    const{ errors, loading } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getMyLeagues());
        if(messageCreateLeague.message || messageAddFriendToLeague.message || messageDeleteUser) {
            setOpenNotification(true);
        }
    }, [dispatch, messageCreateLeague, messageAddFriendToLeague, messageDeleteUser]); 

    //const userHandle = props.match.params.handle;

     //Open notification
     const [openNotification, setOpenNotification] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenNotification(false);
      };

    return (
        <div className={classes.root}>
            {!loading ? (authenticated &&(
               <div>    
                    <h2>Minhas ligas</h2>
                    {/* Add friend to league*/}
                    <Grid container spacing={3}>
                        <Grid item sm={8} xs></Grid>
                        <Grid item sm xs>
                            <CreateLeague /> 
                        </Grid>
                        <Grid item sm xs></Grid>
                    </Grid> 
                    {myLeagues.length > 0 ? (
                        myLeagues.map(league => (
                           <section key={Math.random() * 10000}>
                                <div>
                                    <h2>{league.name}</h2>
                                    
                                    <Grid container spacing={3}>
                                        <Grid item sm xs>
                                            <AddFriendToLeague league={league} />
                                        </Grid>
                                        <Grid item sm xs>
                                            <img src={league.leagueImageUrl} alt={league.name} className={classes.imageLeague} />
                                        </Grid>
                                        <Grid item sm xs></Grid>
                                    </Grid>
            
                                    {league.friends.map((friend) => ( 
                                        <MyLeague key={Math.random() * 10000} friend={friend} league={league} />
                                    )).sort(function(a, b){
                                        return a.points - b.points
                                    })}
                                </div>
                           </section>
                        ))
                        
                    ) : <p>Você não possui ligas</p>}
                    {errors.message === 'Você não pode se remover da própria liga' &&(
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
                     {messageAddFriendToLeague.message &&(
                        <Snackbar open={openNotification} autoHideDuration={3500} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="success">
                                {messageAddFriendToLeague.message}
                            </Alert>
                        </Snackbar>
                    )}
                    {messageDeleteUser.message &&(
                        <Snackbar open={openNotification} autoHideDuration={3500} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="success">
                                {messageDeleteUser.message}
                            </Alert>
                        </Snackbar>
                    )}         
               </div>
            ) 
            ) : <CircularProgress />}
            
        </div>
    )
}
