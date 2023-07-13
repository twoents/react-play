import React, { useState } from 'react';

const CreateUser = () => {

    const [caUsername,setCaUsername] = useState("");
    const [caPassword,setCaPassword] = useState("");

    const createAccount =  async ( userDetails ) => {
        const response = await fetch( 
          "http://localhost:8000/createAccount",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify( userDetails )
        });
        const data = await response.json();
        alert( data.userId );
      }
    
      return (
        <div>
        <h4>Create a new user</h4>
        <input
            type="text"
            id="caUsername"
            value={caUsername}
            onChange={(e) => setCaUsername(e.target.value)}
            placeholder="Username"
        />
        <br></br>
        <input
            type="password"
            id="caPassword"
            value={caPassword}
            onChange={(e) => setCaPassword(e.target.value)}
            placeholder="password"
        />
        <br></br>
        <button onClick={() => createAccount( { "username" : caUsername, "password": caPassword })}>press me</button>
        </div>
      );
    



}

export default CreateUser;