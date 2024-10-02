import instance from "../libs/axios.js";

export const getCategories = async () => {
    try {
        const {data} = await instance.get('/input/category', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const getByCategory = async (category_id) => {
    try {
        const {data} = await instance.get('/input/' + category_id, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const getById = async (input_id) => {
    try {
        const {data} = await instance.get('/input/details/' + input_id, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}