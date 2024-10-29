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

export const rechargeWallet = async (monto, metodo) => {
  try {
    const { data } = await instance.post(
      "/wallet/recharge",
      { monto_recarga: monto, metodo_pago: metodo },
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
