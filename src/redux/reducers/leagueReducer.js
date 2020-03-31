import {
    LOADING_CREATE_LEAGUE,
    CLEAR_LOADING_CREATE_LEAGUE,
    CREATE_LEAGUE,
    ADD_FRIEND_TO_LEAGUE,
    LOADING_ADD_FRIEND_TO_LEAGUE,
    CLEAR_LOADING_ADD_FRIEND_TO_LEAGUE,
    LOADING_PUBLIC_LEAGUE,
    CLEAR_LOADING_PUBLIC_LEAGUE,
    GET_PUBLIC_LEAGUE
} from '../types';

const initialState = {
    loadingCreateLeague: false,
    messageCreateLeague: {},
    loadingAddFriendsToLeague: false,
    messageAddFriendToLeague: {},
    loadingPublicLeague: false,
    publicLeague: [] 
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
        case LOADING_ADD_FRIEND_TO_LEAGUE:
            return {
                ...state,
                loadingAddFriendsToLeague: true
            }
        case CLEAR_LOADING_ADD_FRIEND_TO_LEAGUE:
            return {
                ...state,
                loadingAddFriendsToLeague: false
            }        
        case ADD_FRIEND_TO_LEAGUE:
            return {
                ...state,
                messageAddFriendToLeague: action.payload
            }
        case LOADING_PUBLIC_LEAGUE:
            return {
                ...state,
                loadingPublicLeague: true
            }
        case CLEAR_LOADING_PUBLIC_LEAGUE:
            return {
                ...state,
                loadingPublicLeague: false
            }
        case GET_PUBLIC_LEAGUE:
            return {
                ...state,
                publicLeague: action.payload
            }                
        default:
            return state;            
    }
}