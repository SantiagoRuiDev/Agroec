import instance from "../libs/axios.js";

export const getChatConditions = async (chat_id) => {
    try {
        const {data} = await instance.get('/chat/' + chat_id, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
