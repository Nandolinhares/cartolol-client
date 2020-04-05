import React, { useEffect } from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//Components
import PublicTeam from '../components/player/publicTeam';
//Components
import League from '../components/Leagues/League';
import PublicProfile from '../components/profile/PublicProfile';
//Redux Stuff
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, getUserLeagues } from '../redux/actions/userActions';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        width: '100%'
    },
    imageLeague: {
        width: 80
    },
    loading: {
        textAlign: 'center'
    },
    players: {
        marginTop: 20
    },
    paperLeagues: {
        padding: 10
    },
    h2: {
        color: '#fff'
    },
    profile: {
        width: '100%'
    }
});

function UserProfile(props) {
    const { user, publicUserLeagues } = useSelector(state => state.user);
    const { loading, errors } = useSelector(state => state.ui);
    const userHandle = props.match.params.handle;
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getUserProfile(userHandle));
        dispatch(getUserLeagues(userHandle));
    }, [dispatch, userHandle]);

    return (
        <div className="container">
            <section>
                <Grid container spacing={3}>
                    <Grid item sm={9}>
                        <h2>Week Team</h2>
                            {!loading ? (
                            user.map(doc => (
                                <div key={doc.userId}>
                                    <Grid container spacing={2} className={classes.players}>
                                        {doc.userTeam.length > 0 ? (
                                            doc.userTeam.map(team => (
                                                <Grid key={team.playerId} item>
                                                    <PublicTeam player={team} />
                                                </Grid>
                                            ))
                                            ) : <p>{user.name} não tem jogadores no time</p>}
                                </Grid> 
                                </div>
                            ))
                        ) : (
                            <div className={classes.loading}>
                                <CircularProgress />
                            </div>
                        )}
                    </Grid>
                    <Grid item sm={3} className={classes.profile}>
                       <PublicProfile handle={userHandle} />
                    </Grid>
                </Grid>
            </section>
            {!errors.message ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={2}>
                            {publicUserLeagues.map(league => (
                                <Grid item sm={4} key={Math.random() * 1000} className={classes.root}>
                                    <Paper elevation={3} className={classes.paperLeagues}>
                                        <h2 className={classes.h2}>{league.name}</h2>      
                                        <img src={league.leagueImageUrl} alt={league.name} className={classes.imageLeague} />
                                        {league.friends.map((friend, index) => (
                                            <League key={Math.random() * 10000} friend={friend} index={index} />
                                        )).sort(function(a, b){
                                            return a.points - b.points
                                        })}
                                    </Paper>                  
                                </Grid> 
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            ) : (<h2>{errors.message}</h2>)}
        </div>
    )
}

export default UserProfile;