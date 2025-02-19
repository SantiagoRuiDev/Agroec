import instance from "../libs/axios.js";
import { getToken, getMultiuserToken } from "../libs/storage.js";


export const createLicitationProposal = async (product_id, schema) => {
  try {
    const { data } = await instance.post(
      "/proposal/licitation/" + product_id,
      schema,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "x-multiuser-token": await getMultiuserToken(),
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLicitationProposalByUser = async () => {
  try {
    const { data } = await instance.get("/proposal/licitation/me", {
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
export const getLicitationProposalByUserAndProduct = async (product_id) => {
  try {
    const { data } = await instance.get(
      "/proposal/licitation/product-filter/" + product_id,
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
export const getProposalInformation = async (proposal_id) => {
  try {
    const { data } = await instance.get(
      "/proposal/" + proposal_id,
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
export const getSaleProposalsByUserAndProduct = async (product_id) => {
  try {
    const { data } = await instance.get(
      "/proposal/sale/product-filter/" + product_id,
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
export const rejectProposal = async (proposal_id) => {
  try {
    const { data } = await instance.post(
      "/proposal/reject/" + proposal_id,
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
    throw error;
  }
};
export const acceptProposal = async (proposal_id) => {
  try {
    const { data } = await instance.post(
      "/proposal/accept/" + proposal_id,
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
    throw error;
  }
};
export const declineProposal = async (proposal_id) => {
  try {
    const { data } = await instance.post(
      "/proposal/decline/sale/" + proposal_id,
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
export const updateProposalConditions = async (condition_id, schema) => {
  try {
    const { data } = await instance.put(
      "/proposal/condition/" + condition_id,
      schema,
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
export const deleteDelivery = async (uuid) => {
  try {
    const { data } = await instance.delete(
      "/proposal/condition/remove-delivery/" + uuid,
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
export const deleteQualityParam = async (uuid) => {
  try {
    const { data } = await instance.delete(
      "/proposal/condition/remove-param/" + uuid,
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
export const updateDelivery = async (delivery_id, schema) => {
  try {
    const { data } = await instance.put(
      "/proposal/condition/delivery/" + delivery_id,
      schema,
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
export const updateQualityParam = async (param_id, schema) => {
  try {
    const { data } = await instance.put(
      "/proposal/condition/param/" + param_id,
      schema,
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
