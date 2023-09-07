import React from "react";
import Login from "./Login";
import Register from "./Register";
import './LoginApi.css';

function LoginApi(){
    return(
        <div className="api">
            <div className="wrapper">
        <Login/>
        <br/>
        <br/>
        <Register/>
        </div>
        </div>
    )
}

export default LoginApi