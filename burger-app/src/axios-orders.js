import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-app-7cbbe.firebaseio.com/'
});

export default instance;