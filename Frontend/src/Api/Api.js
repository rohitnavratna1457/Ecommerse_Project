import axios from "axios";
import * as siteConfig from "../Config/Config"

const API = axios.create({
    baseURL: siteConfig.default.apiBaseURL,
    timeout: siteConfig.default.apiTimeout,
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    credentials: true,
})

API.interceptors.request.use(
    (config) => {
        return config
    },
    (error) =>{
        Promise.reject(error)
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        Promise.reject(error)
    }
);

export default API;