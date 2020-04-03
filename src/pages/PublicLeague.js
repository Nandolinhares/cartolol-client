import React, { useEffect } from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import League from '../components/Leagues/League';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { getOneLeague } from '../redux/actions/leagueActions';

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    imageLeague: {
        width: 80
    }
});

function PublicLeague(props) {
    const classes = useStyles();
    const { publicLeague } = useSelector(state => state.league);
    const dispatch = useDispatch();
    const leagueName = props.match.params.league;

    useEffect(() => {
        dispatch(getOneLeague(leagueName))
    }, [dispatch, leagueName])

    return (
        <div className="container">
            <div className={classes.root}>
                {publicLeague.map(league => (
                    <div key={Math.random() * 10000}>
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
                ))}
            </div>   
        </div>
    )
}

export default PublicLeague;