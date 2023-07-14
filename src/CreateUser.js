import React, { useState } from 'react';

const CreateUser = () => {

    const [caViewMode,setCaViewMode] = useState( false );
    const [caUsername,setCaUsername] = useState( "" );
    const [caPassword,setCaPassword] = useState( "" );
    const [caAccountLog, setCaAccountLog] = useState( [] );

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
        if ( data.userId ) {
            setCaAccountLog( accountLog => [...accountLog, { "username": userDetails.username, "userId": data.userId }] );
        }
//        alert( data.userId );
      }

      const hideCreateUser = () => {
        setCaViewMode( false );
      }
      const showCreateUser = () => {
        setCaViewMode( true );
      }

      return (
        caViewMode !== false ?
         ( 
        <div className="card">
            <div className="card-header">
                <span className="h4">Account creation</span>
                <button className="btn btn-danger" style={{float: 'right'}} onClick={hideCreateUser}>hide create user</button>
            </div>
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h4>User details</h4>
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
                            <button className="btn btn-primary" onClick={() => createAccount( { "username" : caUsername, "password": caPassword })}>press me</button>
                        </div>
                        <div className='col-sm-6'>
                            <h4>User creation log</h4>
                            {caAccountLog.slice(-4).map( (account => (<div key={account.userId}>{account.username} created with an id of {account.userId}</div> ) ) )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : (
        <div className="card">
            <div className="card-header">
                <span className="h4">Account creation</span>
                <button className="btn btn-primary"  style={{float: 'right'}} href="#" onClick={showCreateUser}>show create user</button>
            </div>
        </div>
        )
      );
    



}

export default CreateUser;