import instance from "../libs/axios.js";

export const getMultiuserById = async (uuid) => {
    try {
        const {data} = await instance.get('/multiusers/' + uuid, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const getMultiusersByUser = async () => {
    try {
        const {data} = await instance.get('/multiusers', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const getMultiuserRoles = async () => {
    try {
        const {data} = await instance.get('/multiusers/roles', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const createMultiuser = async (schema) => {
    try {
        const {data} = await instance.post('/multiusers', schema, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const editMultiuser = async (uuid, schema) => {
    try {
        const {data} = await instance.put('/multiusers/' + uuid, schema, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const deleteMultiuser = async (uuid) => {
    try {
        const {data} = await instance.delete('/multiusers/' + uuid, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
