import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const getMarketProducts = async () => {
    try {
        const {data} = await instance.get('/products', {
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