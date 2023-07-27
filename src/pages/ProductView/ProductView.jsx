import {Fragment, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {getProductViewById} from "../../services/ProductService.js";
import {useConfigFetch} from "../../utils/ApiUtils.jsx";




function ProductView(){
    const { id } = useParams();
    const [product,setProduct]=useState(null);
    const [productDetail,setProductDetail]=useState({});
    const configFetch=useConfigFetch();


    const getProduct= async ()=>{
        try {
            const res=await getProductViewById(id,configFetch);
            setProduct(res.data)
            if(res.data&&res.data?.productDetails.length>0){
                setProductDetail({...res.data?.productDetails[0]})
            }
        }catch (e){

        }


    }
    useEffect(()=>{
       getProduct();
    },[])
    return <Fragment>
        {product&&(<div>
           <div>
               <img
                   alt={product.name}
                   src={"data:image/jpeg;base64," + product.imageCover}
               />
           </div>
            <div>
                <p>{product.name}</p>
                <p>{productDetail.price}</p>
                <div>
                    {product&&product.productDetails.map(p=><Fragment key={p.id}>
                        <button onClick={()=>{
                            setProductDetail(p)
                        }}>{p.values.map(v=>
                            <span key={v.index}>{v.value}</span>)}
                        </button>
                    </Fragment>)}
                </div>

            </div>

        </div>)}


    </Fragment>
}

export default ProductView;