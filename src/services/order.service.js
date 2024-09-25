import instance from "../libs/axios.js";

export const getOrders = async () => {
  try {
    const { data } = await instance.get("/orders/me", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const getOrdersUnpaid = async () => {
  try {
    const { data } = await instance.get("/orders/me/unpaid", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const getOrderById = async (uuid) => {
  try {
    const { data } = await instance.get("/orders/" + uuid, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const payWarranty = async (uuid, order_uuid, paymentMethod) => {
  try {
    const { data } = await instance.post("/warranty/" + uuid, {metodo_pago: paymentMethod, orden: order_uuid}, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const payFee = async (uuid, amount) => {
  try {
    const { data } = await instance.post("/wallet/fee/" + uuid, {monto_fee: amount}, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const setOrderReceivedStatus = async (order_uuid, quantity) => {
  try {
    const { data } = await instance.put("/orders/set-received/" + order_uuid, {cantidad: quantity}, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
export const setOrderRejectedStatus = async (order_uuid, rejectReason) => {
  try {
    const { data } = await instance.put("/orders/set-rejected/" + order_uuid, {razon: rejectReason}, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}