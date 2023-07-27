import api from "./api"


export const deleteImageById = (id,headers) => {

  return api.delete(`/images/delete/${id}`,{headers});
};
