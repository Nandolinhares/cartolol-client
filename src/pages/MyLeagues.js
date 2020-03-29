import React, { useEffect } from 'react';
//MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
//Components
import League from '../components/Leagues/League';
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

export default function MyLeagues(props) {
    const { myLeagues, authenticated } = useSelector(state => state.user);
    const{ loading } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getMyLeagues());
    }, [dispatch]);

    //const userHandle = props.match.params.handle;

    return (
        <div className={classes.root}>
            <h2>Minhas ligas</h2>
            {!loading ? (authenticated &&(
               <div>          
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
