import api from "./api";



export const register = (user) => {
   return api.post("/auth/register", user);
 }
export const login = (user) => {
    return api.post("/auth/login", user)
};
export const refreshToken = () => {
    return api.get("/auth/refresh")
};
