import { 
    SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_USER_TEAM
} from '../types';

 const initialState = {
    authenticated: false,
    userTeam: [],
    credentials: [],
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

        default:
            return state;    
     }
 }