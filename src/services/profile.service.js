import instance from "../libs/axios.js";

export const getProfileByUser = async () => {
    try {
        const {data} = await instance.get('/profile/me', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const getProfileByIdentifier = async (uuid) => {
    try {
        const {data} = await instance.get('/profile/' + uuid, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const getStats = async () => {
    try {
        const {data} = await instance.get('/profile/me/stats', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const getReceptionPoints = async () => {
    try {
        const {data} = await instance.get('/profile/me/reception-points', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}