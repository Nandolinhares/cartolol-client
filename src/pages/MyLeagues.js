import React, { useState, useEffect } from 'react';
//MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Components
import League from '../components/Leagues/League';
import CreateLeague from '../components/Leagues/CreateLeague';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { getMyLeagues } from '../redux/actions/userActions';

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
    const { errors } = useSelector(state => state.ui);
    const { messageCreateLeague } = useSelector(state => state.league);
    const{ loading } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getMyLeagues());
        if(messageCreateLeague.message) {
            setOpenNotification(true);
        }
    }, [dispatch, messageCreateLeague]); 

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
                    <CreateLeague />
                    {myLeagues.length > 0 ? (
                        myLeagues.map(league => (
                            <div key={Math.random() * 10000}>
                                <h2>{league.name}</h2>
                                <img src={league.leagueImageUrl} alt={league.name} className={classes.imageLeague} />
        
                                {league.friends.map((friend) => (
                                <League key={Math.random() * 10000} friend={friend} />
                                )).sort(function(a, b){
                                    return a.points - b.points
                                })}
                            </div>
                        ))
                    ) : <p>Você não possui ligas</p>}
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
               </div>
            ) 
            ) : <CircularProgress />}
            
        </div>
    )
}
