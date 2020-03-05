import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            //this.props.history.push('/');
            dispatch({ type: CLEAR_ERRORS });
            window.location.reload(false);
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data 
            });
        })
} 