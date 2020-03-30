import {
    LOADING_CREATE_LEAGUE,
    CLEAR_LOADING_CREATE_LEAGUE,
    CREATE_LEAGUE,
    SET_ERRORS
} from '../types';
import axios from 'axios';

import { getMyLeagues } from './userActions';

export const createLeague = (leagueDetails) => (dispatch) => {
    dispatch({ type: LOADING_CREATE_LEAGUE });
    axios.post('/leagues/create', leagueDetails)
        .then(res => {
            dispatch({
                type: CREATE_LEAGUE,
                payload: res.data
            });

            dispatch({ type: CLEAR_LOADING_CREATE_LEAGUE });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}