import { Alert } from 'react-native';
//import axios from 'axios';
import _ from 'lodash';


const BASE_URL = 'https://';
const NODE_URL = ':3000/locations';
const API_KEY = '';

const Api = {
  postFetch: (url, data) => {
    // console.log(data)
    let params = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    if (data) {
      _.set(params, 'body', JSON.stringify(data))
    }
    // console.log(url, params)
    return fetch(`${BASE_URL}${url}`, params);
  }
};
export default Api;
