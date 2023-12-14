import http from "../configs/http";

export const getAllProduct = (page) => {
    return http.get(`/product?page=${page}`);
}

export const insertProduct = (obj) => {
    return http.post(`/product/api/insert`, obj);
}

export const updateProduct = (obj) => {
    return http.put(`/product/api/update/id/${obj?.id}`, obj);
}

export const deleteProduct = (obj) => {
    return http.delete(`/product/api/delete/id/${obj.id}`, { data: obj });
}