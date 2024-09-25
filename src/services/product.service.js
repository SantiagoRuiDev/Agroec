import instance from "../libs/axios.js";

export const getMarketProducts = async () => {
    try {
        const {data} = await instance.get('/products', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}