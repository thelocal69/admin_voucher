import http from "../configs/http";

export const getAllColor = () => {
    return http.get(`/color`);
}