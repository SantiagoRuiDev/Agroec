import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const getSalesByProduct = async (product_id) => {
  try {
    const { data } = await instance.get("/sale/" + product_id, {
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
export const getSaleByIdentifier = async (identifier, product_id) => {
  try {
    const { data } = await instance.get(
      "/sale/" + product_id + "/" + identifier,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "x-multiuser-token": await getMultiuserToken(),
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
