import {useAuth} from "./useAuth.js";
import {refreshToken} from "../services/AuthService.js";

export const useRefreshToken=()=>{
    const {setAuth}=useAuth();
    const refresh=async ()=>{
        const res=await refreshToken();
        setAuth(prev=>{
            console.log(JSON.stringify(prev))
            console.log(res.data.accessToken);
            return {...prev,accessToken:res.data.accessToken}
        })
        return res.data.accessToken;
    }

    return refresh;

}