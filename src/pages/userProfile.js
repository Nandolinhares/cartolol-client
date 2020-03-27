import React, { useEffect } from 'react';
//MUI Stuff
import Grid from '@material-ui/core/Grid';
//Components
import PublicTeam from '../components/player/publicTeam';
//Redux Stuff
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from '../redux/actions/userActions';

function UserProfile(props) {
    const { user } = useSelector(state => state.user);
    const userHandle = props.match.params.handle;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile(userHandle));
    }, [dispatch, userHandle]);

    return (
        <div>
            {user.map(doc => (
                <div key={doc.userId}>
                    <Grid container spacing={2}>
                        {doc.userTeam.length > 0 ? (
                            doc.userTeam.map(team => (
                                <Grid key={team.playerId} item>
                                    <PublicTeam player={team} />
                                </Grid>
                            ))
                            ) : <p>{user.name} não tem jogadores no time</p>}
                   </Grid> 
                </div>
            ))}
        </div>
    )
}

export default UserProfile;