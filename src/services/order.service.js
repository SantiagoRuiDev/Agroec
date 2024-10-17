import instance from "../libs/axios.js";

export const generateOrderPdf = async (id) => {
  try {
    const { data } = await instance.get("/orders/pdf/" + id, {
      withCredentials: true,
      responseType: 'blob'  // Esto es importante para recibir el PDF como blob
    });

     // Crear un objeto blob con los datos recibidos
     const pdfBlob = new Blob([data], { type: 'application/pdf' });

     // Crear un enlace temporal para descargar el archivo
     const link = document.createElement('a');
     link.href = window.URL.createObjectURL(pdfBlob);
     link.download = `order_${id}.pdf`;  // Nombre del archivo descargado
     link.click();  // Forzar clic para iniciar la descarga
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
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