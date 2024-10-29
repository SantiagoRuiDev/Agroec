import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const getNotifications = async () => {
  try {
    const { data } = await instance.get("/notifications", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "x-multiuser-token": await getMultiuserToken(),
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const setUserOneSignalSubscription = async (uuid_subscription) => {
  try {
    const { data } = await instance.put(
      "/notifications/" + uuid_subscription,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-multiuser-token": await getMultiuserToken(),
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
