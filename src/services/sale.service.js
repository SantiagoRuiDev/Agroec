import instance from "../libs/axios.js";

export const getSalesByProduct = async (product_id) => {
    try {
        const {data} = await instance.get('/sale/' + product_id, { withCredentials: true })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const getSaleByIdentifier = async (identifier, product_id) => {
    try {
        const {data} = await instance.get('/sale/' + product_id + "/" + identifier, { withCredentials: true })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}