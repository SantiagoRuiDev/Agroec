// Import Axios and Create
export const production = true;
const API = (production) ? "https://agroec-api.onrender.com/api/v1" : "http://localhost:3000/api/v1";

import axios from 'axios';

const instance = axios.create({
    baseURL: API,
});

export default instance;