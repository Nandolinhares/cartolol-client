import { 
        SET_PLAYERS, 
        LOADING_DATA, 
        SET_PLAYER, 
        CREATE_PLAYER, 
        CLEAR_LOADING_PLAYERS, 
        LOADING_PLAYERS,
        GET_SUPS,
        GET_ADCS,
        GET_MIDS,
        GET_JGS,
        GET_TOPS,
        LOADING_RANKING_TEAMS,
        CLEAR_LOADING_RANKING_TEAMS,
        GET_TEAMS_RANKING 
    } from '../types';

const initialState = {
    players: [],
    player: {},
    loading: false,
    loadingPlayers: false,
    bestSups: [],
    bestAdcs: [],
    bestMids: [],
    bestJgs: [],
    bestTops: [],
    loadingRankingTeams: false,
    teams: []
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
        case LOADING_PLAYERS:
            return {
                ...state,
                loadingPlayers: true
            }    
        case CLEAR_LOADING_PLAYERS:
            return {
                ...state,
                loadingPlayers: false
            }
        case GET_SUPS:
            return {
                ...state,
                bestSups: action.payload
            }
        case GET_ADCS:
            return {
                ...state,
                bestAdcs: action.payload
            }
        case GET_MIDS:
            return {
                ...state,
                bestMids: action.payload
            }
        case GET_JGS:
            return {
                ...state,
                bestJgs: action.payload
            }
        case GET_TOPS:
            return {
                ...state,
                bestTops: action.payload
            }
        case LOADING_RANKING_TEAMS:
            return {
                ...state,
                loadingRankingTeams: true
            }
        case CLEAR_LOADING_RANKING_TEAMS:
            return {
                ...state,
                loadingRankingTeams: false
            }                             
        case GET_TEAMS_RANKING:
            return {
                ...state,
                teams: action.payload
            }          
        default:
            return state;        
    }
}