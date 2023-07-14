import React, { useState, useEffect, useRef } from 'react';

/*
  const dataFetchedRef = useRef(false);

  const fetchData = () => {
        console.log('Fetching data...');
        setCounter((oldValue) =>; oldValue+1);
    }

  useEffect(() =>; {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      fetchData();
  },[])
  */


const UserAccount = ( { handleLogout, userDetails } ) => {

    const [init,setInit] = useState( false );
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if ( dataFetchedRef.current ) return;
        dataFetchedRef.current = true;
        console.log( "Mounted component");
    }, []);

    return(
        <div className="card">
            <div className="card-header">
                <span className="h4">Account Details for {userDetails.username}</span>
                <a className="btn btn-danger" href="#"  style={{float: 'right'}} role="button" onClick={handleLogout}>Logout</a>
            </div>
            <div className="card-body">
                <div className="container">




                </div>
            </div>
        </div>
    );
}

export default UserAccount;