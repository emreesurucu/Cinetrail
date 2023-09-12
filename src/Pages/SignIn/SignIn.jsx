import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
  
    const {user, setUser, token, setToken} = useContext(UserContext);
  
    const handleSignIn = (e) => {
      e.preventDefault();
      axios.post("https://cinetrail-server.herokuapp.com/users/login", {email, password})
      .then(res => {
        console.log(res)
        if(res.data.message === "Email does not exist") {
          setWarning("Bad credentials, please try again!");
        } else {
          setUser(res.data);
          setToken(res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch(err => console.log(err));
    }
  
    return (
      <div className="signup-container">
          <form className="signup-form" onSubmit={handleSignIn}>
            <div className="title-container">
              <h1>Sign In</h1>
              <p>Please fill in this form to login.</p>
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="button-container">
              <button type="reset" className="cancelbtn">Cancel</button>
              <button type="submit" className="signupbtn">Sign In</button>
            </div>
            <p className="signin-message">Don't have an account? <Link to="/signup">Signup</Link></p>
            <p>{warning}</p>
          </form>
      </div>
    )
}

export default SignIn