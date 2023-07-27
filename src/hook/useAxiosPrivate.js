import {useRefreshToken} from "./useRefreshToken.js";
import {useAuth} from "./useAuth.js";
import {axiosPrivate} from "../services/api.js";
import {useEffect} from "react";


const useAxiosPrivate=()=>{
    const refresh=useRefreshToken();
    const {auth}=useAuth();
    useEffect(()=>{
        const req=axiosPrivate.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization']=`Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error)=>Promise.reject(error)
        )

        const res=axiosPrivate.interceptors.response.use(
            response=>response,
            async (err)=>{
                const preReq=err?.config;
                if(err?.response?.status===401){
                    preReq.sent=true;
                    const accessToken=await refresh();

                    preReq.headers['Authorization']=`Bearer ${accessToken}`
                    return axiosPrivate(preReq);
                }
                return Promise.reject(err)
            }
        )
        return ()=>{
            axiosPrivate.interceptors.request.eject(req)
            axiosPrivate.interceptors.response.eject(res);

        }
    },[auth,refresh])

    return axiosPrivate;

}

export default useAxiosPrivate;