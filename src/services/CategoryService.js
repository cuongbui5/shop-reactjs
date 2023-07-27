import api from "./api";





 

const getFromData = (category, image) => {
  const formData = new FormData();
  formData.append("category", new Blob([JSON.stringify(category)], { type: "application/json" }));
  formData.append("image", image);
  return formData;
};

export const getAllCategories = (headers) => {
  return api.get("/categories", { headers });

};

export const getCategoryById = (id,headers) => {
  return api.get(`/categories/${id}`, { headers});
}

export const addNewCategory = (category, image,headers) => {
  return api.post("/categories/add", getFromData(category, image), { headers });
};
export const updateCategoryById = (id, category, image, headers) => {
  return api.put(`/categories/update/${id}`, getFromData(category, image), { headers});
};

export const deleteCategoryById = (id,headers) => {

  return api.delete(`/categories/delete/${id}`, { headers });
};
