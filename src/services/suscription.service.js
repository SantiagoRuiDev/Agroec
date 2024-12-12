import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const getPlans = async () => {
  try {
    const { data } = await instance.get("/suscription/plan", {
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


export const getSuscription = async () => {
  try {
    const { data } = await instance.get("/suscription", {
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


export const cancel = async () => {
  try {
    const { data } = await instance.post("/suscription/cancel", {},{
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

export const suscribe = async (uuid_plan, identifier, document) => {
  try {
    const { data } = await instance.post("/suscription", {plan: uuid_plan, identificador: identifier, documento: document},{
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
