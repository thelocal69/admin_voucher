import axios from "axios";
import { toast } from 'react-toastify';


const http = axios.create({
    baseURL: `http://localhost:8083`,
});


http.defaults.withCredentials = true;


http.interceptors.response.use(function (response) {
    return response.data;
}, function (config) {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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

// http.interceptors.response.use(
//     function (config) {
//         let token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

export default http;