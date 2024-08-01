"use client";

import axios from "axios";

axios.defaults.baseURL = "/api";

axios.interceptors.request.use(
  (config: any) => {
    const getSession = getCookie("session");
    config.headers["Authorization"] = getSession ? `Bearer ${getSession}` : "";

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    const response: any = typeof error.response != undefined ? error.response.data : error;
    return Promise.reject(response);
  }
);

function getCookie(name: string) {
  return document.cookie.split(';').reduce((prev: any, c: any) => {
    var arr = c.split('=');
    return (arr[0].trim() === name) ? arr[1] : prev;
  }, undefined);
}

export default axios;