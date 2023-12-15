import http from "../configs/http";

export const getAllCategory = () => {
    return http.get(`/category`);
}

export const getAllCategoryName = () => {
    return http.get(`/category/api/getName`);
}