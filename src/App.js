import React, { useState, useEffect } from 'react';


import './App.css';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

const App = () => {

  return (
    <div className="App">
      <CreateUser />
      <LoginUser />
    </div>
  );
}

export default App;
