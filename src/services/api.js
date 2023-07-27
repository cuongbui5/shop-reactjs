import axios from "axios";
const BASE_URL="http://localhost:8000/api/v1";

const instance = axios.create({
  baseURL:BASE_URL ,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL:BASE_URL ,
  withCredentials: true,
});



instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  
  return Promise.reject(error)
}) 



export default instance;