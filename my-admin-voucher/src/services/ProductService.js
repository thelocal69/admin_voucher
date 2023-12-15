import http from "../configs/http";

export const getAllProductNoClause = () => {
    return http.get(`/product/api/getAll`);
}

export const getAllProduct = (page, sortBy, sortField) => {
    return http.get(`/product?page=${page}&sortBy=${sortBy}&sortField=${sortField}`);
}

export const getProductByName = (name) => {
    return http.get(`/product/api/productName?name=${name}`);
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