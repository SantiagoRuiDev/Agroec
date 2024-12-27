import instance from "../libs/axios.js";
import { getToken, getMultiuserToken, removeToken, removeMultiuserToken } from "../libs/storage.js";

export const recoverPassword = async (email) => {
  try {
    const { data } = await instance.post(
      "/auth/reset-password",
      {correo: email}
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createUserAccount = async (schema) => {
  try {
    const { data } = await instance.post("/auth", schema);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const finisUserAccount = async (schema) => {
  try {
    const { data } = await instance.post("/auth/finish", schema);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const initUserSession = async (schema) => {
  try {
    const { data } = await instance.post("/auth/session", schema);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const isAuthentified = async () => {
  try {
    const { data } = await instance.get("/auth/check", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "x-multiuser-token": await getMultiuserToken(),
      },
    });
    return data;
  } catch (error) {
    await removeToken();
    await removeMultiuserToken();
    throw new Error(error.response.data.message);
  }
};

export const finalizeSession = async () => {
  try {
    const { data } = await instance.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'x-multiuser-token': await getMultiuserToken()
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateAccount = async (schema) => {
  try {
    const { data } = await instance.put(
      "/auth",
      schema,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'x-multiuser-token': await getMultiuserToken()
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};