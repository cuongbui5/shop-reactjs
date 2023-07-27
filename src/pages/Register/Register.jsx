import { useState } from "react";
import styles from "./Register.module.css"
import { register } from "../../services/AuthService";
import {Link} from "react-router-dom";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message,setMessage]=useState("");

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password, passwordConfirm }
        const res = await register(user);
        if(res.message){
            setMessage(res.message)
            setPassword("")
            setUsername("")
            setPasswordConfirm("")
        }

    }



    return (
      <div className={styles.container}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input onChange={e => setUsername(e.target.value)}
                   value={username}
                   type="email"
                   id="email"
                   required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input onChange={e => setPassword(e.target.value)}
                   value={password}
                   type="password"
                   id="password"
                   required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="passwordc">Password Confirm:</label>
            <input
              onChange={e => setPasswordConfirm(e.target.value)}
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              required
            />
          </div>

          <button type="submit">Register</button>
            {message&&(
                <p>{message}</p>
            )
            }
            <Link to={"/login"}>Login now!</Link>
        </form>
      </div>
    );
}

export default Register;