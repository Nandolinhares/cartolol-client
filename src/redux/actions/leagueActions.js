import {
    LOADING_CREATE_LEAGUE,
    CLEAR_LOADING_CREATE_LEAGUE,
    CREATE_LEAGUE,
    SET_ERRORS,
    ADD_FRIEND_TO_LEAGUE,
    LOADING_ADD_FRIEND_TO_LEAGUE,
    CLEAR_LOADING_ADD_FRIEND_TO_LEAGUE,
    LOADING_PUBLIC_LEAGUE,
    CLEAR_LOADING_PUBLIC_LEAGUE,
    GET_PUBLIC_LEAGUE,
    LOADING_REMOVE_USER_FROM_LEAGUE,
    CLEAR_LOADING_REMOVE_USER_FROM_LEAGUE,
    DELETING_USER_FROM_LEAGUE
} from '../types';
import axios from 'axios';

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
            dispatch({ type: CLEAR_LOADING_CREATE_LEAGUE });
        });
}

export const addFriendToLeague = (leagueName, friendHandle) => (dispatch) => {
    dispatch({ type: LOADING_ADD_FRIEND_TO_LEAGUE });
    axios.post(`/leagues/addFriend/${leagueName}/${friendHandle}`)
        .then(res => {
            dispatch({
                type: ADD_FRIEND_TO_LEAGUE,
                payload: res.data
            });
            dispatch({ type: CLEAR_LOADING_ADD_FRIEND_TO_LEAGUE });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            dispatch({ type: CLEAR_LOADING_ADD_FRIEND_TO_LEAGUE });
        })
}
export const getOneLeague = (leagueName) => (dispatch) => {
    dispatch({ type: LOADING_PUBLIC_LEAGUE });
    axios.get(`/leagues/${leagueName}`)
        .then(res => {
            dispatch({
                type: GET_PUBLIC_LEAGUE,
                payload: res.data
            });
            dispatch({ type: CLEAR_LOADING_PUBLIC_LEAGUE });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const removeUserFromLeague = (leagueName, handle) => (dispatch) => {
    dispatch({ type: LOADING_REMOVE_USER_FROM_LEAGUE });
    axios.delete(`/leagues/${leagueName}/${handle}`)
        .then(res => {
            dispatch({
                type: DELETING_USER_FROM_LEAGUE,
                payload: res.data
            });
            dispatch({ type: CLEAR_LOADING_REMOVE_USER_FROM_LEAGUE });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}