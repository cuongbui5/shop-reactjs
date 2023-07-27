/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./FormCategory.module.css";
import { addNewCategory, updateCategoryById } from "../../../services/CategoryService";
import {useConfigUpload} from "../../../utils/ApiUtils.jsx";

function CategoryForm({ category, categories }) {
  const isEditing = !!category;
  console.log(category);
  const [name, setName] = useState(category?.name || "");
  const [parentId, setParentId] = useState((category&&category.parentCategory&&category.parentCategory.id) || "");
  const [image, setImage] = useState(null);
  const configUpload=useConfigUpload();


  const handleFile = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    //e.preventDefault();
    const categoryData = { name, parentId };
    if (isEditing) {
        await updateCategoryById(category.id, categoryData, image,configUpload);
    } else {
        await addNewCategory(categoryData, image,configUpload);
    }
         
  };

  return (
    <div className={styles.container}>
      <h2>{isEditing ? "Update Category" : "Add Category"}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            id="categoryName"
            value={name}
            type="text"
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="parentCategory" className={styles.label}>
            Parent Category:
          </label>
          <select
            id="parentCategory"
            value={parentId}
            onChange={e => {
              setParentId(e.target.value);
            }}
            className={styles.select}
          >
            <option value="">Select parent category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>Choose Files</label>
          <input className={styles.fileInput} type="file" name="image" onChange={handleFile} />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit">{isEditing ? "Update Category" : "Add Category"}</button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
