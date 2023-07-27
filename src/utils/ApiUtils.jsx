import {useAuth} from "../hook/useAuth.js";


const useAccessToken=()=>{
  const {auth}=useAuth();
  return auth.accessToken;
}

export const useConfigUpload = () => {
  const accessToken = useAccessToken();
  return {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${accessToken}`,
  };
};

export const useConfigFetch = () => {
  const accessToken = useAccessToken();
  return {
    "Authorization": `Bearer ${accessToken}`,
  };
};

