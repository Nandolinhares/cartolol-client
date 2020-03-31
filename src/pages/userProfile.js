import React, { useEffect } from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
        textAlign: 'center'
    },
    imageLeague: {
        width: 80
    },
    loading: {
        textAlign: 'center'
    },
    players: {
        marginTop: 20
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
        <div>
            <section>
                <Grid container spacing={3}>
                    <Grid item sm={9}>
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
                    <Grid item sm={3}>
                       <PublicProfile handle={userHandle} />
                    </Grid>
                </Grid>
            </section>
            {!errors.message ? (
                publicUserLeagues.map(league => (
                    <div key={Math.random() * 1000} className={classes.root}>
                        <h2>{league.name}</h2>
                        <Grid container spacing={3}>
                            <Grid item sm xs></Grid>
                            <Grid item sm xs>
                                <img src={league.leagueImageUrl} alt={league.name} className={classes.imageLeague} />
                            </Grid>
                            <Grid item sm xs></Grid>
                        </Grid>
                        {league.friends.map((friend) => (
                            <League key={Math.random() * 10000} friend={friend} />
                        )).sort(function(a, b){
                            return a.points - b.points
                        })}
                    </div>
                ))
            ) : (<h2>{errors.message}</h2>)}
        </div>
    )
}

export default UserProfile;