import http from "../configs/http";

export const getAllSize = () => {
    return http.get(`/size`);;
}