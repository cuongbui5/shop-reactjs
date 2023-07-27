import { useState, useEffect } from "react";
import styles from "./Products.module.css";
import { getAllProducts, deleteProduct } from "../../services/ProductService";
import { getAllCategories } from "../../services/CategoryService";
import Overlay from "../../components/Popup/Overlay";
import FormProductDetail from "../../components/Popup/ProductDetail/FormProductDetail";
import FormProduct from "../../components/Popup/Product/FormProduct";
import {useConfigFetch} from "../../utils/ApiUtils.jsx";

function Products() {
  const [add, setAdd] = useState(false);
  const [addDetail, setAddDetail] = useState(false);
  const [update, setUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [clickDelete, setClickDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const configFetch=useConfigFetch();


  const getCategories = async () => {
    const res = await getAllCategories(configFetch);
    setCategories(res.data);
  };

  const getproducts = async () => {
    try {
       const res = await getAllProducts(configFetch);
       setProducts(res.data);
    } catch (error) {

    }
   
  };

  const deleteProductById = async (id) => {
    const res = await deleteProduct(id,configFetch);
    if (res.message === "success") setClickDelete(!clickDelete);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getproducts();
  }, [add, clickDelete]);

  const handleAdd = () => {
    setAdd(!add);
  };

  const handleAddDetail = (p) => {
    setAddDetail(!addDetail);
    setProduct(p)
  };

  const handleUpdate = (product) => {
     setProduct(product)
     setUpdate(!update);
  };


  return (
    <div className={styles.container}>
      <h1>Product Management</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.addButton} onClick={handleAdd}>
          Add Product
        </button>
      </div>
      {add && (
        <>
          <Overlay onClick={handleAdd}></Overlay>
          <FormProduct categories={categories} />
        </>
      )}
      {update && (
        <>
          <Overlay onClick={handleUpdate}></Overlay>
          <FormProduct categories={categories} product={product} />
        </>
      )}
      {addDetail && (
        <>
          <Overlay onClick={handleAddDetail}></Overlay>
          <FormProductDetail product={product} />
        </>
      )}

      <div>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product name</th>
              <th>Description</th>
              <th>Category ID</th>
              <th>Category name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.category.id}</td>
                <td>{p.category.name}</td>

                <td>
                  <img
                    style={{ height: "40px", width: "40px" }}
                    alt={p.name}
                    src={"data:image/jpeg;base64," + p.imageCover}
                  />
                </td>
                <td>
                  <div>
                    <button className={styles.button} onClick={() => handleUpdate(p)}>
                      Update
                    </button>
                    <button className={styles.button} onClick={() => deleteProductById(p.id)}>
                      Delete
                    </button>
                    <button className={styles.button}>Detail</button>
                    <button className={styles.button} onClick={() => handleAddDetail(p)}>
                      Add detail
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

export default Products;
