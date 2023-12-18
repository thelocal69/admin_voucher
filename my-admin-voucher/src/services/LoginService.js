import http from '../configs/http';

export const loginUser = (obj) => {
    return http.post(`/account/signin`, obj)
        .catch((err) => console.log(err.message));
}