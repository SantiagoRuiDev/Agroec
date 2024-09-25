import instance from "../libs/axios.js";

export const getWarranties = async () => {
    try {
        const {data} = await instance.get('/warranty', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
