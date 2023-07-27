
import { Fragment, useEffect, useState } from "react";
import styles from "./FormProductDetail.module.css";
import {
  addProductDetail,
  updateProductDetailById,
  getProductDetailById,
} from "../../../services/ProductDetailService";
import { getCategoryById } from "../../../services/CategoryService";
import {useConfigFetch, useConfigUpload} from "../../../utils/ApiUtils.jsx";


function FormProductDetail({ product, productDetail }) {


  const [price, setPrice] = useState(productDetail?productDetail.price:"");
  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState(productDetail?productDetail.values.map(obj => obj.id):[]);

  const [categoryId, setCategoryId] = useState(productDetail?productDetail.product.category.id:null);


  const [quantityStock, setQuantityStock] = useState(productDetail?productDetail.quantityStock:"");
  const [images, setImages] = useState([]);
  const configUpload=useConfigUpload();
  const configFetch=useConfigFetch();
  


   

  const getCategory = async id => {
    const res = await getCategoryById(id,configFetch);

    let allAttributes = [...res.data.attributes];
    let parent=res.data.parentCategory
    while (parent != null) {
      allAttributes = [...allAttributes, ...parent.attributes];
      parent=parent.parentCategory
    }
    

     setAttributes(allAttributes);
  };

  useEffect(() => {
    if (product) {
      getCategory(product.category.id);
    }

  }, []);

    useEffect(() => {
      if(categoryId!=null)
    getCategory(categoryId);
  }, [categoryId]);

  const handleFile = e => {
    setImages([...e.target.files]);
  };

  const handleProductDetailAction = async e => {
    e.preventDefault();

    if (productDetail) {
      const updateProductDetail = { price, quantityStock, values };
      await updateProductDetailById(productDetail.id, updateProductDetail, images,configUpload);
    } else {
      const productDetailData = { productId: product.id, price, quantityStock, values };
      await addProductDetail(productDetailData, images,configUpload);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{productDetail ? "Update Detail" : "Add Detail"}</h2>
      <form className={styles.form} onSubmit={handleProductDetailAction}>
        <div>
          <label htmlFor="description">Price:</label>
          <input
            id="description"
            value={price}
            type="text"
            onChange={e => {
              setPrice(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity Stock:</label>
          <input
            id="quantity"
            value={quantityStock}
            type="text"
            onChange={e => {
              setQuantityStock(e.target.value);
            }}
          />
        </div>

        <div>
          {attributes.map((a, index) => (
            <Fragment key={a.id}>
              <div>
                <p>{a.name}</p>
                <select
                  id="value"
                  value={values[index]}
                  onChange={e => {
                    setValues(prevValues => {
                      const newValues = [...prevValues];
                      newValues[index] = e.target.value;
                      return newValues;
                    });
                  }}
                  className={styles.select}
                >
                  <option key="0" value="">
                    Select
                  </option>
                  {a.values.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.value}
                    </option>
                  ))}
                </select>
              </div>
            </Fragment>
          ))}
        </div>

        <div className={styles.fileInputContainer}>
          {productDetail &&
            productDetail.images.map(i => (
              <Fragment key={i.id}>
                <img style={{ height: "40px", width: "40px" }} src={"data:image/jpeg;base64," + i.image} />
              </Fragment>
            ))}

          <div>
            <label className={styles.fileInputLabel}>Choose Files</label>
            <input className={styles.fileInput} multiple type="file" name="image" onChange={handleFile} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit">{productDetail ? "Update Detail" : "Add Detail"}</button>
        </div>
      </form>
    </div>
  );
}

export default FormProductDetail;
