import api from "./api";
import {  useConfigFetch } from "../utils/ApiUtils.jsx";

export const getAttributes = (headers) => {

  return api.get("/attributes",{headers});
};


export const addNewAttribute = (categoryId, name,headers) => {

  return api.post("/attributes/add", { categoryId, name }, { headers });
};
export const updateAttribute = (id, categoryId, name,headers) => {

  return api.put(`/attributes/update/${id}`, { categoryId, name }, { headers });
};

export const deleteAttributeById = (id,headers) => {

  return api.delete(`/attributes/delete/${id}`, { headers });
};
