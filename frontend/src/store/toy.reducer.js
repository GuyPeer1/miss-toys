// import { toyService } from "../services/toy.service.js"
import { toyService } from "../services/toy-back.service.js"

export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REMOVE_TOY = 'REMOVE_TOY'
export const SET_FILTER = 'SET_FILTER'
export const UPDATE_TOY = 'UPDATE_TOY'
export const ADD_TOY = 'ADD_TOY'


const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action) {
    let toys
    let lastRemovedToy
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case REMOVE_TOY:
            lastRemovedToy = state.toys.find(c => c._id === action.toyId)
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastRemovedToy }
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        default:
            return state
    }
}


