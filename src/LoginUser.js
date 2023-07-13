import React, { useState, useEffect } from 'react';

const LoginUser = () => {

  const [loginState,setLoginState] = useState( false );
  const [liUsername,setLiUsername] = useState("");
  const [liPassword,setLiPassword] = useState("");

  const doLogin = async( userDetails ) => {
    const response = await fetch( 
      "http://localhost:8000/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( userDetails )
    });
    const data = await response.json();
    alert( data.status );
    
  }

  return (
    <div className="LoginUser">
        <h4>Login</h4>
        <input
            type="text"
            id="liUsername"
            value={liUsername}
            onChange={(e) => setLiUsername(e.target.value)}
            placeholder="Username"
        />
        <br></br>
        <input
            type="password"
            id="liPassword"
            value={liPassword}
            onChange={(e) => setLiPassword(e.target.value)}
            placeholder="password"
        />
        <br></br>
        <button onClick={() => doLogin( { "username" : liUsername, "password": liPassword })}>press me</button>
    </div>
  );
}

export default LoginUser;