import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const sendQualification = async (order_id, schema) => {
    try {
        const {data} = await instance.post('/qualification/' + order_id, schema, {
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
