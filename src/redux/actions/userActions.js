import 
{ 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI,
    LOADING_POINTS,
    CLEAR_LOADING_POINTS, 
    SET_UNAUTHENTICATED, 
    LOADING_USER, 
    SET_USER_TEAM, 
    POSITIVE_MESSAGES,
    SET_USERS_BY_POINTS,
    GET_USER_PROFILE,
    GET_USER_LEAGUES,
    GET_USER_TEAM,
    CLEAR_USER_TEAM,
    LOADING_PUBLIC_USER_LEAGUES,
    CLEAR_LOADING_PUBLIC_USER_LEAGUES,
    GET_PUBLIC_USER_LEAGUES 
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            //console.log(res.data);
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

export const buyPlayer = (playerName, playerPosition) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`/user/player/${playerName}/${playerPosition}`)
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

export const getUserByPoints = () => (dispatch) => {
    dispatch({ type: LOADING_POINTS });
    axios.get('/users/position')
        .then(res => {
            dispatch({
                type: SET_USERS_BY_POINTS,
                payload: res.data
            })
            dispatch({ type: CLEAR_LOADING_POINTS });
        })
        .catch(err => {
            console.error(err);
            dispatch({ type: CLEAR_LOADING_POINTS });
        });
}

export const getUserProfile = (handle) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/users/profile/${handle}`)
        .then(res => {
            dispatch({
                type: GET_USER_PROFILE,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const resetUserPassword = (email) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/resetUserPassword', email)
        .then(res => {
            dispatch({
                type: POSITIVE_MESSAGES,
                payload: res.data
            })
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
    dispatch({ type: GET_USER_TEAM });
    axios.get('/user/team')
        .then(res => {
            dispatch({
                type: SET_USER_TEAM,
                payload: res.data
            });
            dispatch({ type: CLEAR_USER_TEAM });
        })
        .catch(err => {
            console.error(err);
            dispatch({ type: CLEAR_USER_TEAM });
        });
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

//Leagues
export const getMyLeagues = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get('/user/leagues')
        .then(res => {
            dispatch({
                type: GET_USER_LEAGUES,
                payload: res.data
            })
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

export const getUserLeagues = (handle) => (dispatch) => {
    dispatch({ type: LOADING_PUBLIC_USER_LEAGUES });
    axios.get(`/user/leagues/${handle}`)
        .then(res => {
            dispatch({
                type: GET_PUBLIC_USER_LEAGUES,
                payload: res.data
            })
            dispatch({ type: CLEAR_LOADING_PUBLIC_USER_LEAGUES });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}