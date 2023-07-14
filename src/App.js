import React, { useState } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import UserAccount from './UserAccount';

const App = () => {

  const [userDetails,setUserDetails] = useState( { loginState: false } );

  const handleLogin = ( username, token, walletId ) => {
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

  const handleLoginFailed = (  errorMessage ) => {
    alert( errorMessage );
  }

  return (
    <div className="App">
      <CreateUser />
      { userDetails.loginState === false ? ( 
        <LoginUser 
          onLogin={ handleLogin }
          onLoginFailed={handleLoginFailed}
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
