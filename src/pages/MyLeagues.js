import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { getMyLeagues } from '../redux/actions/userActions';

export default function MyLeagues(props) {
    const { myLeagues } = useSelector(state => state.user);
    const{ loading } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyLeagues());
    }, [dispatch]);

    //const userHandle = props.match.params.handle;

    return (
        <div>
            <h2>Minhas ligas</h2>
            {!loading ? (
                myLeagues.map(league => (
                    <div key={Math.random() * 10000}>
                        <p>{league.name}</p>
                    </div>
                ))
            ) : (
                <CircularProgress />
            )}
            
        </div>
    )
}
