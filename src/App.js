import React, { useState, useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import UserAccount from './UserAccount';

const App = () => {

  const [userDetails,setUserDetails] = useState( { loginState: false } );

  const handleOnLogin = ( username, token, walletId ) => {
    setUserDetails( {
        loginState: true,
        "username": username,
        "token": token,
        "walletId": walletId
    });
  }

  const handleLogout = () => {
    setUserDetails( {
      loginState: false
    });
  }

  const doBalanceCheck = async () => {
    const response = await fetch( 
      "http://localhost:8000/sec/showBalance",{
      method: "POST",
      mode: "cors",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        "X-Custom": userDetails.token
      },
      body: JSON.stringify( { "walletId": userDetails.walletId } )
    });
    if ( response.status == 200 ) {
      const data = await response.json();
      console.log( data );
    }
    else {
      alert( "unauthorized");
    }

  }

  return (
    <div className="App">
      <CreateUser />
      { userDetails.loginState === false ? ( 
        <LoginUser 
          onLogin={ handleOnLogin }
        />
        ):(
          <UserAccount
            handleLogout={handleLogout}
            userDetails={userDetails}
          />
        )}

    </div>
    
  );
}

export default App;
