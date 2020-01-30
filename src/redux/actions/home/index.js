import * as types from './types';
import _ from 'lodash'
import md5 from 'crypto-js/md5';

const rootPath = 'https://gateway.marvel.com/v1/public/characters?'

const ts = 'vauruk'
const publicKey = '3501e3f005cd22950df0827a0f5a1245'
const privateKey = '8105d5e6fc9822213e5b786460d9419e5fa2fdcf'

export const listCharacterAction = (name) => {
    const hash = md5(ts + privateKey + publicKey)
   // const path = `${rootPath}?ts=${ts}&apikey=${publicKey}&hash=${hash}`

    return (dispatch, getState) => {
        const offset = getState().home.offset
        let data = new URLSearchParams();

        data.append('ts', ts);
        data.append('apikey', publicKey);
        data.append('hash', hash);
        data.append('orderBy', 'name');
        data.append('limit', 4);
        data.append('offset', offset);
        if (name) {
            data.append('nameStartsWith', name);
        }

        fetch(rootPath + data)
            .then(
                dispatch({ type: types.LOADING, payload: true })
            )
            .then((response) => response.json())
            .then(responseJson => {
                dispatch({
                    type: types.LIST_CHARACTERS,
                    payload: responseJson.data.results
                });
                dispatch({ type: types.LOADING, payload: false })
            }).catch(error => {
                dispatch({ type: types.LOADING, payload: false })
                //console.log("error", error.toJSON());
                console.log("error", error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("daTA", error.response.data);
                    console.log("STATUS", error.response.status);
                    console.log("HEADERS", error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log("error.request", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log("config", error.config);
            })
    }
}

/**
 * Set o offset para avancar e voltar no filtro
 * @param {*} name 
 * @param {*} limit 
 */
export const setOffSetAction = (num) => {

    return (dispatch, getState) => {
        let offsetNew = getState().home.offset + num
        let arrNew = []
        if (offsetNew > 0 && offsetNew >= 4) {
            arrNew.push(offsetNew - 4)
            arrNew.push(offsetNew)
            arrNew.push(offsetNew + 4)
            dispatch({ type: types.SET_ARR_FOOTERNAV, payload: arrNew })
        } else if(num === 0) {
            arrNew.push(0)
            arrNew.push(4)
            arrNew.push(8)
            dispatch({ type: types.SET_ARR_FOOTERNAV, payload: arrNew })
        }
        dispatch({ type: types.SET_OFFSET, payload: offsetNew })
    }
}
export const navOffSetAction = (offset) => {
    return dispatch => {
        dispatch({ type: types.SET_OFFSET, payload: offset })
    }
}