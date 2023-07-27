import api from "./api";



export const getValues = (headers) => {

  return api.get("/values",{headers});
};

export const addNewValue = (attributeId, value,headers) => {

  return api.post("/values/add", { attributeId, value }, { headers });
};
export const updateValue = (id, value,headers) => {

  return api.put(`/values/update/${id}`, { value }, { headers});
};

export const deleteValueById = (id,headers) => {

  return api.delete(`/values/delete/${id}`, { headers });
};
