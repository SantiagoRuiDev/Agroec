import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";

export const getWalletStats = async () => {
  try {
    const { data } = await instance.get("/wallet", {
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

export const rechargeWallet = async (
  monto,
  metodo,
  identificador,
  documento
) => {
  try {
    const { data } = await instance.post(
      "/wallet/recharge",
      {
        monto_recarga: monto,
        metodo_pago: metodo,
        identificador: identificador,
        documento: documento,
      },
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


export const getWalletCards = async () => {
  try {
    const { data } = await instance.get("/wallet/cards", {
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
export const addCard = async (schema) => {
  try {
    const { data } = await instance.post("/wallet/cards", schema, {
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
export const removeCard = async (id) => {
  try {
    const { data } = await instance.delete("/wallet/cards/" + id, {
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