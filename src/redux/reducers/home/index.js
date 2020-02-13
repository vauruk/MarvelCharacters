/**
 * @autor Vanderson de Moura Vauruk
 */

import * as types from '../../actions/home/types';

const footerNavDefault = [0, 4, 8]

const initialState = {
    listCharacter: [],
    loading: false,
    count: 0,
    footerNav: footerNavDefault,
    offset: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_CHARACTERS: {
            return { ...state, listCharacter: action.payload };
        }
        case types.LOADING: {
            return { ...state, loading: action.payload };
        }
        case types.COUNTER_CHARACTERS: {
            return { ...state, count: action.payload };
        }
        case types.SET_OFFSET: {

            return { ...state, offset: action.payload };
        }
        case types.SET_ARR_FOOTERNAV: {

            return { ...state, footerNav: action.payload };
        }
        case types.CLEAN_STATE: {

            return { ...state, footerNav: footerNavDefault };
        }
        default:
            //console.log("default reducer", typesCore.LOADING_START)
            return state;
    }
};