/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./FormProduct.module.css";
import { addProduct, updateProduct } from "../../../services/ProductService";
import {useConfigUpload} from "../../../utils/ApiUtils.jsx";

// eslint-disable-next-line react/prop-types
function FormProduct({ categories, product }) {
  // eslint-disable-next-line react/prop-types
  const [name, setName] = useState(product ? product.name : "");
  // eslint-disable-next-line react/prop-types
  const [description, setDescription] = useState(product ? product.description : null);
  const [categoryId, setCategoryId] = useState(product ? product.categoryId : null);
  const [image, setImage] = useState(null);
  const configUpload=useConfigUpload();

  const handleFile = e => {
    setImage(e.target.files[0]);
  };

  const handleProductAction = async () => {
    if (product) {
      const p = { name, description, categoryId };
      // eslint-disable-next-line react/prop-types
      await updateProduct(product.id, p, image,configUpload);
    } else {
      const productData = { name, description, categoryId };
      await addProduct(productData, image,configUpload);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{product ? "Update Product" : "Add Product"}</h2>
      <form className={styles.form} onSubmit={handleProductAction}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            id="productName"
            value={name}
            type="text"
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="price">Description:</label>
          <input
            id="price"
            value={description}
            type="text"
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="parentCategory" className={styles.label}>
            Category:
          </label>
          <select
            id="parentCategory"
            value={categoryId}
            onChange={e => {
              setCategoryId(e.target.value);
            }}
            className={styles.select}
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fileInputContainer}>
          {product && (
            <div>
              <img
                style={{ height: "40px", width: "40px" }}
                alt={product.name}
                src={"data:image/jpeg;base64," + product.imageCover}
              />
            </div>
          )}
          <div>
            <label className={styles.fileInputLabel}>Choose Files</label>
            <input className={styles.fileInput} type="file" name="image" onChange={handleFile} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit">{product ? "Update Product" : "Add Product"}</button>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;
