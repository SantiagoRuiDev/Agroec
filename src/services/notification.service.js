import instance from "../libs/axios.js";

export const getNotifications = async () => {
    try {
        const {data} = await instance.get('/notifications', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const setUserOneSignalSubscription = async (uuid_subscription) => {
    try {
        const {data} = await instance.put('/notifications/' + uuid_subscription, {}, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}