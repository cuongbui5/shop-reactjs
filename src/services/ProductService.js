import api from "./api";





const getFromData = (product, image) => {
  const formData = new FormData();
  formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
  formData.append("image", image);
  return formData;
};

export const getAllProducts = (headers) => {


  return api.get("/products", { headers });
};

export const getAllProductViews = (headers) => {

    return api.get("/products/view", { headers });
};

export const getProductViewById = (id,headers) => {

    return api.get(`/products/view/${id}`, { headers });
};


export const addProduct = (product, image,headers) => {

  return api.post("/products/add", getFromData(product, image), { headers });
};
export const updateProduct = (id, product, image,headers) => {

  return api.put(`/products/update/${id}`, getFromData(product, image), { headers });
};

export const deleteProduct = (id,headers) => {

  return api.delete(`/products/delete/${id}`, { headers });
};
