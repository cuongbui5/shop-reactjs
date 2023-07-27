import {Fragment, useEffect, useState} from "react";
import {getAllProductViews} from "../../services/ProductService.js";
import {Link} from "react-router-dom";
import {useConfigFetch} from "../../utils/ApiUtils.jsx";
import {useRefreshToken} from "../../hook/useRefreshToken.js";
import useAxiosPrivate from "../../hook/useAxiosPrivate.js";



function Home() {
  const [products,setProducts]=useState([]);

  //const configFetch=useConfigFetch();
  const controller=new AbortController();


  const axiosPrivate=useAxiosPrivate();
  const getProductView=async ()=>{
    try {
      const res=await axiosPrivate.get("/products/view",{
        signal:controller.signal
      });
      setProducts(res.data.data);
    }catch (e){
      console.log(e.message)
    }

  }

  useEffect(()=>{
    getProductView()
  },[])
 


  return (
    <Fragment>
      <h1>All Product</h1>
        <div>
          {products.length>0&&products.map(p=><Link key={p.id} to={`/product-view/${p.id}`} >
            <h1>{p.name}</h1>
            <img src={"data:image/jpeg;base64," + p.imageCover} alt={p.name}/>
            <p>{p.price}</p>
            <Fragment>
              <button>Add Cart</button>
            </Fragment>
          </Link>)}
        </div>


    </Fragment>
  );
}

export default Home;
