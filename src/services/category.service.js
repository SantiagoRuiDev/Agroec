import instance from "../libs/axios.js";

export const getCategories = async () => {
    try {
        const {data} = await instance.get('/category', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const getTutorials = async (category_id) => {
    try {
        const {data} = await instance.get('/category/tutorials/' + category_id, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}