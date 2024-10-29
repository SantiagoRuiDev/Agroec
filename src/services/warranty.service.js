import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const getWarranties = async () => {
    try {
        const {data} = await instance.get('/warranty', {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              'x-multiuser-token': await getMultiuserToken()
            },
          })
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
