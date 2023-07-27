import Categories from "../pages/Categories/Categories";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Attributes from "../pages/Attribute/Attributes";
import ProductView from "../pages/ProductView/ProductView.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import * as PropTypes from "prop-types";


 export const protectedRouterAdmin = [
     { path: "/products", component: Products },
     { path: "/categories", component: Categories },
     { path: "/productDetails", component: ProductDetail },
     { path: "/attributes", component: Attributes },

  
 ];

export const protectedRouterUser = [
    { path: "/", component: Home },
    {path: "/product-view/:id", component: ProductView },


];




export const publicRouter = [
    { path: "/login", component: Login },
    { path: "/forbidden", component: PageNotFound },
    { path: "/register", component: Register },




];

