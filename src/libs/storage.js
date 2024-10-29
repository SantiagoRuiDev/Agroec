import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";

// Guardar el token
export async function storeToken(token) {
  await SecureStoragePlugin.set({
    key: "auth-token",
    value: token,
  });
}

export async function storeMultiuserToken(token) {
  await SecureStoragePlugin.set({
    key: "multiuser-token",
    value: token,
  });
}

export async function removeToken() {
  await SecureStoragePlugin.remove({key: "auth-token"});
}

export async function removeMultiuserToken() {
  await SecureStoragePlugin.remove({key: "multiuser-token"});
}

// Obtener el token
export async function getToken() {
  try {
    const { value } = await SecureStoragePlugin.get({ key: "auth-token" });
    return value;
  } catch (error) {
    return null;
  }
}

export async function getMultiuserToken() {
  try {
    const { value } = await SecureStoragePlugin.get({ key: "multiuser-token" });
    return value;
  } catch (error) {
    return null;
  }
}
