import axios from "axios";
const baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

const getUrl = (endpoint) => `${baseURL}${endpoint}`;
const getConfigs = (config) => ({
  headers: {
    Accept: "*/*",
    "Content-Type": "application/hal+json; charset=utf-8",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  ...config,
});

const request = async (method, endpoint, params = {}, payload = {}) => {
  let request;
  if (method === "post") {
    request = axios.post(
      getUrl(endpoint),
      { ...payload },
      getConfigs({ params })
    );
  } else if (method === "get") {
    request = axios.get(getUrl(endpoint), getConfigs({ params }));
  } else {
    request = axios.delete(getUrl(endpoint), getConfigs({ params }));
  }

  const { data } = await request;

  return data;
};

export const get = (endpoint, params = {}) => request("get", endpoint, params);

export const post = (endpoint, data = {}, params = {}) =>
  request("post", endpoint, params, data);

export const del = (endpoint, data = {}, params = {}) =>
  request("delete", endpoint, params, data);
