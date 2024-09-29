import instance from "../libs/axios.js";

export const sendQualification = async (order_id, schema) => {
    try {
        const {data} = await instance.post('/qualification/' + order_id, schema, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
