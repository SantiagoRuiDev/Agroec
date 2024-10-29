import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";


export const getProfileByUser = async () => {
  try {
    const { data } = await instance.get("/profile/me", {
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

export const getProfileByIdentifier = async (uuid) => {
  try {
    const { data } = await instance.get("/profile/" + uuid, {
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

export const getStats = async () => {
  try {
    const { data } = await instance.get("/profile/me/stats", {
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

export const getReceptionPoints = async () => {
  try {
    const { data } = await instance.get("/profile/me/reception-points", {
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
