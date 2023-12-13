import http from "../configs/http";

export const getAllProduct = () => {
    return http.get(`/product/api/getAll`);
}