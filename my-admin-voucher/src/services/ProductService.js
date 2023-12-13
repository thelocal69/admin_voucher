import http from "../configs/http";

export const getAllProduct = (page) => {
    return http.get(`/product?page=${page}`);
}

export const insertProduct = (obj) => {
    return http.post(`/product/api/insert`, obj);
}