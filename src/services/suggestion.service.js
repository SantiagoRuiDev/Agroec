import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const sendSuggestion = async (schema) => {
    try {
        const {data} = await instance.post('/suggestion', schema, {
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
export const getProducts = async () => {
    try {
        const {data} = await instance.get('/suggestion/products', {
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