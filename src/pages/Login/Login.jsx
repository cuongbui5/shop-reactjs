import styles from "./Login.module.css";
import { useState} from "react";
import { login } from "../../services/AuthService";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hook/useAuth.js";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg,setErrorMsg]=useState("");
  const location=useLocation();
  const from=location.state?.form?.pathname||"/"


  const {setAuth}=useAuth();
  const navigate=useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    try{
      const res = await login(user);
      if(res.status==="ok"){
        setUsername("")
        setPassword("")
        setAuth({...res.data})
        navigate(from,{replace:true})

      }
    }catch (e){
      setErrorMsg(e.response.data.message)
    }

  };

  return (
    <div className={styles.container}>
      <h2>Login Now!</h2>
      <form onSubmit={handleSubmit}>
       
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
              onChange={e => setUsername(e.target.value)}
              type="email"
              id="email"
              required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              required />
        </div>

      

        <button type="submit">Login</button>
        {errorMsg&&<p>{errorMsg}</p>}
        <Link to="/register">Register</Link>
      </form>

    </div>
  );
}

export default Login;
