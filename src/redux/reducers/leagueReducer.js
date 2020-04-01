import {
    LOADING_CREATE_LEAGUE,
    CLEAR_LOADING_CREATE_LEAGUE,
    CREATE_LEAGUE,
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

const initialState = {
    loadingCreateLeague: false,
    messageCreateLeague: {},
    loadingAddFriendsToLeague: false,
    messageAddFriendToLeague: {},
    loadingPublicLeague: false,
    publicLeague: [],
    loadingRemoveUserFromLeague: false,
    messageDeleteUser: {} 
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
        case LOADING_REMOVE_USER_FROM_LEAGUE:
            return {
                ...state,
                loadingRemoveUserFromLeague: true
            }
        case CLEAR_LOADING_REMOVE_USER_FROM_LEAGUE:
            return {
                ...state,
                loadingRemoveUserFromLeague: false
            }                        
        case DELETING_USER_FROM_LEAGUE:
            return {
                ...state,
                messageDeleteUser: action.payload
            }    
        default:
            return state;            
    }
}