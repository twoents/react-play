import React, { useState } from 'react';

const LoginUser = ( { onLogin, onLoginFailed, onLogoff } ) => {

  const [liUsername,setLiUsername] = useState("");
  const [liPassword,setLiPassword] = useState("");

  const doLogin = async( userDetails ) => {
    try {
      const response = await fetch( 
        "http://localhost:8000/login",{
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "X-Custom": "Please just register"
        },
        body: JSON.stringify( userDetails )
      });
      const data = await response.json();
      if ( data.status === "OK" ) {
        onLogin( userDetails.username, data.token, data.walletId );
      }
      else {
        onLoginFailed( "invalid username/password");      
      }
    }
    catch ( e ) {
      onLoginFailed( "technical error");      
    }
  }

  return (
    <div className="card">
      <div className="card-header">
          <span className="h4">Account Login</span>
      </div>
      <div className="card-body">
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
            id="liPasswosrd"
            value={liPassword}
            onChange={(e) => setLiPassword(e.target.value)}
            placeholder="password"
        />
        <br></br>
        <button className="btn btn-primary" onClick={() => doLogin( { "username" : liUsername, "password": liPassword })}>press me</button>
      </div>
    </div>
  );
}

export default LoginUser;