import axios from 'axios';

export default axios.create({
    // baseURL: 'http://localhost:8000/',
    baseURL: 'http://192.168.180.31:8000',
    headers: {
        Authorization: localStorage.getItem('token') !== 'null' ? 'Bearer ' + localStorage.getItem('token'):'',
        'Content-Type': 'application/json',
    },
    responseType: 'json'
});