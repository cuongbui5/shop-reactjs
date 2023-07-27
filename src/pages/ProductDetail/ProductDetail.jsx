import { useEffect, useState } from "react";
import { getAllProductDetails,deleteProductDetail } from "../../services/ProductDetailService";
import Overlay from "../../components/Popup/Overlay";
import styles from "./ProductDetail.module.css"
import FormProductDetail from "../../components/Popup/ProductDetail/FormProductDetail";
import { deleteImageById } from "../../services/ImageService";
import { Fragment } from "react";
import {useConfigFetch} from "../../utils/ApiUtils.jsx";
function ProductDetail() {
    const [products, setProducts] = useState([])
    const [productDetail, setProductDetail] = useState(null);
    const [update, setUpdate] = useState(false);
     const [clickDelete, setClickDelete] = useState(false);
     const configFetch=useConfigFetch();


    const getProductDetails =async () => {
        try {
            const res = await getAllProductDetails(configFetch);
            setProducts(res.data);
        }catch (e){
            console.log(e)
        }

  }
  
   const deleteImage = async id => {
     await deleteImageById(id,configFetch);
     await getProductDetails()
   };
    

    useEffect(() => {
        getProductDetails();
    }, [clickDelete, update])
    
  const handleUpdate = (p) => {

   setProductDetail(p);
    setUpdate(!update)
       
    }

    const deleteProductById =async (id) => {
        const res=await deleteProductDetail(id);
        if (res.message === "success") setClickDelete(!clickDelete);
    }
   
 


    return (
      <div className={styles.container}>
        <h1>Product Detail Management</h1>

        {update && (
          <>
            <Overlay onClick={handleUpdate}></Overlay>
            <FormProductDetail productDetail={productDetail} />
          </>
        )}

        <div>
          <table>
            <thead>
              <tr key={"-1"}>
                <th>ID</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Image Cover</th>
                <th>version</th>
                <th>Price</th>
                <th>Quantity Stock</th>
                <th>Image Detail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.product.id}</td>
                    <td>{p.product.name}</td>
                    <td>
                      <img
                        style={{ height: "40px", width: "40px" }}
                        alt={p.name}
                        src={"data:image/jpeg;base64," + p.product.imageCover}
                      />
                    </td>
                    <td>
                      {p.values.map(v => (
                        <span key={v.id}>{v.value} </span>
                      ))}
                    </td>
                    <td>{p.price}</td>

                    <td>{p.quantityStock}</td>

                    <td>
                      {p.images.length > 0 &&
                        p.images.map((i, index) => {
                          return (
                            <Fragment key={index}>
                              <img
                                style={{ height: "40px", width: "40px" }}
                                src={"data:image/jpeg;base64," + i.image}
                                alt={i.id}
                              />
                              <button onClick={() => deleteImage(i.id)}>
                                <ion-icon name="close-outline"></ion-icon>
                              </button>
                            </Fragment>
                          );
                        })}
                    </td>
                    <td>
                      <div>
                        <button className={styles.button} onClick={() => handleUpdate(p)}>
                          Update
                        </button>
                        <button className={styles.button} onClick={() => deleteProductById(p.id)}>
                          Delete
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

export default ProductDetail;