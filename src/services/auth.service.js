import instance from "../libs/axios.js";
import { getCookie } from "../libs/cookie.js";

export const createUserAccount = async (schema) => {
    try {
        const {data} = await instance.post('/auth', schema)
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const finisUserAccount = async (schema) => {
    try {
        const {data} = await instance.post('/auth/finish', schema)
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const initUserSession = async (schema) => {
    try {
        const {data} = await instance.post('/auth/session', schema, { withCredentials: true })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const isAuthentified = async () => {
    try {
        const {data} = await instance.get('/auth/check', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const finalizeSession = async () => {
    try {
        const {data} = await instance.post('/auth/logout', {}, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}