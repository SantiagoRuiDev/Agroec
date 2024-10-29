import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";


export const getMultiuserById = async (uuid) => {
    try {
        const {data} = await instance.get('/multiusers/' + uuid, {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              'x-multiuser-token': await getMultiuserToken()
            },
          })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const getMultiusersByUser = async () => {
    try {
        const {data} = await instance.get('/multiusers', {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              'x-multiuser-token': await getMultiuserToken()
            },
          })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const getMultiuserRoles = async () => {
    try {
        const {data} = await instance.get('/multiusers/roles', {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              'x-multiuser-token': await getMultiuserToken()
            },
          })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const createMultiuser = async (schema) => {
    try {
        const {data} = await instance.post('/multiusers', schema, {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              'x-multiuser-token': await getMultiuserToken()
            },
          })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const editMultiuser = async (uuid, schema) => {
    try {
        const {data} = await instance.put('/multiusers/' + uuid, schema, {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              'x-multiuser-token': await getMultiuserToken()
            },
          })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}


export const deleteMultiuser = async (uuid) => {
    try {
        const {data} = await instance.delete('/multiusers/' + uuid, {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              'x-multiuser-token': await getMultiuserToken()
            },
          })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
