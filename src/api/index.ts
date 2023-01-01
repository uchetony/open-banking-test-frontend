import axios from 'axios';

const API= axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})

export default API;

API.interceptors.response.use(
    (response) => response.data, 
    (error) => Promise.reject(error?.response?.data)
);

export const updateApiAuthorization = (token: string) => {
    API.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}/api`;
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const getTokenAndUpdateApiAuthorization = () => {
    try {
        const currentToken = localStorage.getItem("open_banking_token");
        const token = currentToken && JSON.parse(currentToken);

        if (token) updateApiAuthorization(token);
    } catch(_) {}
}

getTokenAndUpdateApiAuthorization();