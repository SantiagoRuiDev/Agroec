import instance from "../libs/axios.js";

export const sendSuggestion = async (schema) => {
    try {
        const {data} = await instance.post('/suggestion', schema, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const getProducts = async () => {
    try {
        const {data} = await instance.get('/suggestion/products', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}