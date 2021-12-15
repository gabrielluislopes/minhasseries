import {SET_FIELD, SERIE_SAVED_SUCCESS, SET_ALL_FIELDS, RESET_FORM} from "../actions";

const INITIAL_STATE = {
    id: null,
    title: '',
    gender: 'Ação',
    rate: 0,
    img: '',
    description: ''
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case SET_FIELD:
            const clonedState = {...state};
            clonedState[action.field] = action.value;
            return clonedState;
        case SERIE_SAVED_SUCCESS:
            return INITIAL_STATE;
        case SET_ALL_FIELDS:
            return action.serie;
        case RESET_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
}
