import {
    LOADING_CREATE_LEAGUE,
    CLEAR_LOADING_CREATE_LEAGUE,
    CREATE_LEAGUE
} from '../types';

const initialState = {
    loadingCreateLeague: false,
    messageCreateLeague: {} 
};

export default function (state = initialState, action) {
    switch(action.type) {
        case LOADING_CREATE_LEAGUE:
            return {
                ...state,
                loadingCreateLeague: true
            }
        case CLEAR_LOADING_CREATE_LEAGUE:
            return {
                ...state,
                loadingCreateLeague: false
            }
        case CREATE_LEAGUE:
            return {
                ...state,
                messageCreateLeague: action.payload
            }
        default:
            return state;            
    }
}