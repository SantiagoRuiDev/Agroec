import instance from "../libs/axios.js";

export const getAdvertising = async () => {
    try {
        const {data} = await instance.get('/advertising', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}