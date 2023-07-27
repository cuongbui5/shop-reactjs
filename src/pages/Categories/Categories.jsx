import { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import CategoryForm from "../../components/Popup/Category/FormCategory";
import { getAllCategories, deleteCategoryById } from "../../services/CategoryService";
import Overlay from "../../components/Popup/Overlay";
import FormAttribute from "../../components/Popup/Attribute/FormAttribute";
import {useConfigFetch} from "../../utils/ApiUtils.jsx";

function Categories() {
  const [addForm, setAddFrom] = useState(false);
  const [updateForm, setUpdateFrom] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [attributePp, setAttributePp] = useState(false);
  const [category, setCategory] = useState(null);
  const configFetch=useConfigFetch();
  const fetchCategories = async () => {
    let res = await getAllCategories(configFetch);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, [deleteCategory]);

  const handleAddPopup = () => {
    setAddFrom(!addForm);
  };

  const handleDeleteCategory =async(id) => {
        const res = await deleteCategoryById(id);
        if (res.message === "success") {
          setDeleteCategory(!deleteCategory);
        }
      
  };
   const handleAttributePopup = category => {
     setCategory(category);
     setAttributePp(!attributePp);
   };

  const handleEditPopup = category => {
    setCategory(category);
    setUpdateFrom(!updateForm);
  };
  return (
    <div className={styles.container}>
      <h1>Category Management</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleAddPopup} className={styles.addButton}>
          Add Category
        </button>
      </div>
      {addForm && (
        <>
          <Overlay onClick={handleAddPopup}></Overlay>
          <CategoryForm categories={categories} />
        </>
      )}
      {updateForm && (
        <>
          <Overlay onClick={handleEditPopup}></Overlay>
          <CategoryForm category={category} categories={categories} />
        </>
      )}
      {attributePp && (
        <>
          <Overlay onClick={handleAttributePopup}></Overlay>
          <FormAttribute categoryId={category.id} />
        </>
      )}

      <div>
        <table>
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category name</th>
              <th>Parent ID</th>
              <th>Parent name</th>
              <th>Attribute</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, index) => (
              <tr key={index}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{(c.parentCategory && c.parentCategory.id) || ""}</td>
                <td>{(c.parentCategory && c.parentCategory.name) || ""}</td>
                <td>
                  {c.attributes.map((a, index) => {
                    return <p key={index}>{a.name}</p>;
                  })}
                </td>
                <td>
                  <img
                    style={{ height: "40px", width: "40px" }}
                    alt={c.name}
                    src={"data:image/jpeg;base64," + c.image}
                  />
                </td>
                <td>
                  <div>
                    <button className={styles.button} onClick={() => handleEditPopup(c)}>
                      Edit
                    </button>
                    <button className={styles.button} onClick={() => handleDeleteCategory(c.id)}>
                      Delete
                    </button>
                    <button className={styles.button} onClick={() => handleAttributePopup(c)}>
                      Add Attribute
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
