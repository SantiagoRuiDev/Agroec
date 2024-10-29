import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";


export const createLicitation = async (product_id, schema) => {
  try {
    const { data } = await instance.post("/licitation/" + product_id, schema, {
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

export const getLicitations = async () => {
  try {
    const { data } = await instance.get("/licitation/me", {
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

export const getLicitationById = async (id) => {
  try {
    const { data } = await instance.get("/licitation/" + id, {
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

export const getLicitationsByUserAndProduct = async (product_id) => {
  try {
    const { data } = await instance.get("/licitation/me/" + product_id, {
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

export const getLicitationsByProduct = async () => {
  try {
    const { data } = await instance.get("/licitation", {
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

export const closeLicitation = async (uuid) => {
  try {
    const { data } = await instance.put(
      "/licitation/set-closed/" + uuid,
      {},
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

export const deleteLicitation = async (uuid) => {
  try {
    const { data } = await instance.delete("/licitation/" + uuid, {
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
