import http from "../configs/http";

export const getAllSize = () => {
    return http.get(`/size`);;
}

export const getAllSizeName = () => {
    return http.get(`/size/api/getName`);;
}