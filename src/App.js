import React, { useState, useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import UserAccount from './UserAccount';

const App = () => {

  const [loginState,setLoginState] = useState( false );
  const [securityToken,setSecurityToken] = useState( "" );
  const [activeWalletId,setActiveWalletId] = useState( 0 );

  const handleOnLogin = ( username, token, walletId ) => {
    setLoginState( true );
    setSecurityToken( token );
    setActiveWalletId( walletId );
  }

  const handleLogout = () => {
    setLoginState( false );
  }

  const doBalanceCheck = async () => {
    const response = await fetch( 
      "http://localhost:8000/sec/showBalance",{
      method: "POST",
      mode: "cors",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        "X-Custom": securityToken
      },
      body: JSON.stringify( { "walletId": activeWalletId } )
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
      { loginState === false ? ( 
        <LoginUser 
          onLogin={ handleOnLogin }
        />
        ):(
          <UserAccount
            handleLogout={handleLogout}
          />
        )}

    </div>
    
  );
}

export default App;
