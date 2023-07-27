import api from "./api";




const getFromData = (productDetail, images) => {
  const formData = new FormData();
    formData.append("product-detail", new Blob([JSON.stringify(productDetail)], { type: "application/json" }));
    for (let i = 0; i < images.length; i++){
        formData.append("images", images[i]);
    }
  
  return formData;
};

export const getProductDetailById = (id,headers) => {

  return api.get(`/productDetails/${id}`,{headers});
};

export const getAllProductDetails = (headers) => {

  return api.get("/productDetails", { headers});
};

export const addProductDetail = (productDetail, images,headers) => {

  return api.post("/productDetails/add",
      getFromData(productDetail, images),
      {headers});
};
export const updateProductDetailById = (id, productDetail, images,headers) => {
  return api.put(`/productDetails/update/${id}`,
                      getFromData(productDetail, images),
               {headers});
};

export const deleteProductDetail = (id,headers) => {
  return api.delete(`/productDetails/delete/${id}`,
      { headers });
};
