import { SET_PLAYERS, LOADING_DATA, SET_PLAYER, CREATE_PLAYER } from '../types';

const initialState = {
    players: [],
    player: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_PLAYERS:
            return {
                ...state,
                players: action.payload,
                loading: false
            }
        case SET_PLAYER:
            return {
                ...state,
                player: action.payload,
                loading: false
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            } 
        case CREATE_PLAYER:
            return {
                ...state,
                players: [action.payload, ...state.players]
            }   
        default:
            return state;        
    }
}