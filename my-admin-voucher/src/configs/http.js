import axios from "axios";
import { toast } from 'react-toastify';
import store from "../redux/store";


const http = axios.create({
    baseURL: `http://localhost:8083`,
});

http.interceptors.request.use(
    function (config) {
        const token = store.getState().auth.accessToken;
        console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.defaults.withCredentials = true;



//http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

http.interceptors.response.use(function (response) {
    return response.data;
}
    , function (error) {
        if (error.response.status === 403) {
            toast.error("Please login by admin !");
        } else if (error.response.status === 500) {
            toast.error("Token expired !");
        } else {
            toast.error(error.response.data.message);
        }
        return Promise.reject(error);
    });



export default http;