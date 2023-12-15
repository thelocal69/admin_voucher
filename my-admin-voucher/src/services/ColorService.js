import http from "../configs/http";

export const getAllColor = () => {
    return http.get(`/color`);
}

export const getAllColorName = () => {
    return http.get(`/color/api/getName`);
}