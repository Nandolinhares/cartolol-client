import { 
    SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_USER_TEAM,
    SET_USERS_BY_POINTS,
    GET_USER_PROFILE,
    GET_USER_LEAGUES
} from '../types';

 const initialState = {
    authenticated: false,
    userTeam: [],
    credentials: [],
    users: [],
    user: [],
    myLeagues: [],
    loading: false
 }

 export default function(state = initialState, action){
     switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
 
        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER_TEAM: 
            return {
                ...state,
                userTeam: action.payload,
                loading: false
            }; 

        case SET_USER:
           return {
               ...state,
               authenticated: true,
               loading: false,
               ...action.payload
           };

        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case SET_USERS_BY_POINTS:
            return {
                ...state,
                users: action.payload
            } 
        case GET_USER_PROFILE:
            return {
                ...state,
                user: action.payload
            }                 
        case GET_USER_LEAGUES:
            return {
                ...state,
                myLeagues: action.payload,
                loading: false
            }    
        default:
            return state;    
     }
 }