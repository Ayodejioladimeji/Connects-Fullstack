import axios from 'axios';

// THE POST DATA API
export const postDataAPI = async (url, data) => {
  const res = await axios.post(`/api/${url}`, data);
  return res;
};

// THE POST DATA API WITH TOKEN
export const postDataAPIS = async (url, data, token) => {
  const res = await axios.post(`/api/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

// GET
export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const getDataAPIS = async (url, token) => {
  // if (token === undefined) return null;
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

// UPDATE
export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

// UPDATE
export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

// DELETE
export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

// THE POST DATA API WITH TOKEN
export const postGoogleAPI = async (url, tokenId) => {
  const res = await axios.post(`/api/${url}`, {
    tokenId: tokenId,
  });
  return res;
};
