import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, SET_USER_TEAM, POSITIVE_MESSAGES } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            console.log(res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
            //window.location.reload(false);
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS, 
                payload: err.response.data 
            });
        })
} 

export const signupUser = (newUser, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/signup", newUser)
      .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
      })
      .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
      });
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };

export const updateUserDetails = (userData) => (dispatch) => {
    
    axios.post('/user', userData)
        .then(() => {
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}  

export const resetPoints = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/users/reset')
        .then(res => {
            dispatch({
                type: POSITIVE_MESSAGES,
                payload: res.data
            });
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
        })
}

export const updateUserPoints = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/users/updatePoints')
        .then(res => {
            dispatch({
                type: POSITIVE_MESSAGES,
                payload: res.data
            })
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => console.error(err));
}

export const buyPlayer = (playerName) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`/user/player/${playerName}`)
        .then(res => {
            dispatch({
                type: POSITIVE_MESSAGES,
                payload: res.data
            })
            dispatch(getUserTeam());
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const removePlayerFromUserTeam = (playerName) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.delete(`/user/${playerName}/delete`)
        .then(res => {
            dispatch({
                type: POSITIVE_MESSAGES,
                payload: res.data
            })
            dispatch(getUserTeam());
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserTeam = () => (dispatch) => {
    axios.get('/user/team')
        .then(res => {
            dispatch({
                type: SET_USER_TEAM,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

export const getUserData = () => (dispatch) => { 
    axios.get('/user') 
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.error(err));
}

export const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.commom['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}