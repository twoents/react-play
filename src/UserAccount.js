import React, { useState, useEffect, useRef } from 'react';

const UserAccount = ( { handleLogout, userDetails } ) => {

    const dataFetchedRef = useRef(false);
    const [wallet,setWallet] = useState( {} );
    const [transactions,setTransactions] = useState( [] ); 
    const [debitAmount,setDebitAmount] = useState( 0.00 );
    const [debitDesc,setDebitDesc] = useState( "" );
    const [creditAmount,setCreditAmount] = useState( 0.00 );
    const [creditDesc,setCreditDesc] = useState( "" );
    const [fromDate,setFromDate] = useState( null );
    const [toDate,setToDate] = useState( null );

    const getBalance = async () => {
        const response = await fetch( 
          "http://localhost:8000/wal/getBalance",{
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-Custom": userDetails.token
          },
          body: JSON.stringify( { "walletId": userDetails.walletId } )
        });

        if ( response.status === 200 ) {
          const data = await response.json();
          setWallet( data );
        }
        else if ( response.status === 401 ) {
          alert( "unauthorized" );
          handleLogout();
        }
    }
        
    const doDebit = async ( reqDetails ) => {
        const response = await fetch( 
            "http://localhost:8000/wal/doDebit",{
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-Custom": userDetails.token
            },
            body: JSON.stringify({ "walletId": userDetails.walletId,
                            "description": debitDesc,
                            "amount": debitAmount } )
          });
          if ( response.status === 200 ) {
            const data = await response.json();
            setWallet( data );
            setDebitAmount( "0.00" );
            setDebitDesc( "" );
          }
          else if ( response.status === 401 ) {
            alert( "unauthorized" );
            handleLogout();
          }
      }

    const doCredit = async ( reqDetails ) => {
        const response = await fetch( 
            "http://localhost:8000/wal/doCredit",{
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-Custom": userDetails.token
            },
            body: JSON.stringify({ "walletId": userDetails.walletId,
                            "description": creditDesc,
                            "amount": creditAmount } )
          });
          if ( response.status === 200 ) {
            const data = await response.json();
            setWallet( data );
            setCreditAmount( "0.00" );
            setCreditDesc( "" );
          }
          else if ( response.status === 401 ) {
            alert( "unauthorized" );
            handleLogout();
          }
    }

    const getTransactions = async ( reqDetails ) => {
        const response = await fetch( 
            "http://localhost:8000/wal/getTransactions",{
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-Custom": userDetails.token
            },
            body: JSON.stringify({ "walletId": userDetails.walletId,
                            "fromDate": fromDate,
                            "toDate": toDate } )
          });
          if ( response.status === 200 ) {
            const data = await response.json();
            setTransactions( data );
          }
          else if ( response.status === 401 ) {
            alert( "unauthorized" );
            handleLogout();
          }
    }

    useEffect(() => {
        if ( dataFetchedRef.current ) return
        dataFetchedRef.current = true
        getBalance()
        getTransactions()
    }, []);

    return(
        <div className="card">
            <div className="card-header">
                <span className="h4">Account Details for "{userDetails.username}"</span>
                <a className="btn btn-danger" href="#"  style={{float: 'right'}} role="button" onClick={handleLogout}>Logout</a>
            </div>
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col h4">Balance for wallet named "{wallet.walName}" is {wallet.balance > 0 ? wallet.balance.toFixed(2) : "0.00" }</div>
                    </div>
                    { transactions.length > 0 ? (
                    <>
                    <div className="row">
                        <div className="col text-bg-light">date</div>
                        <div className="col text-bg-light">description</div>
                        <div className="col text-bg-light">amount</div>
                    </div>
                    <div className="row">
                        {transactions.map( ( transaction ) => ( 
                        <>
                        <div className="col">{transaction.txDate}</div>       
                        <div className="col">{transaction.description}</div>       
                        <div className="col">{transaction.amount}</div>
                        <div class="w-100"></div>
       
                        </>
                        ))}
                    </div>
                    </>
                    ) : (
                    <div className="row">
                        <div className="col text-bg-light">no transactions yet</div>
                    </div>
                    )}
                    <hr></hr>
                    <div className="row">
                        <div className="col text-bg-light">
                            <input 
                                id="debitAmount"
                                type='number'
                                placeholder="debit amount"
                                onChange={(e) => setDebitAmount(e.target.value)}
                            />
                            <input 
                                id="debitDesc"
                                type='text'
                                placeholder="description"
                                onChange={(e) => setDebitDesc(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={() => doDebit( { walletId: userDetails.walletId, amount: debitAmount })}>debit account</button>
                        </div>
                        <div className="col text-bg-light">
                        <input 
                                id="creditAmount"
                                type='number'
                                placeholder="credit amount"
                                onChange={(e) => setCreditAmount(e.target.value)}
                            />
                            <input 
                                id="creditDesc"
                                type='text'
                                placeholder="description"
                                onChange={(e) => setCreditDesc(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={() => doCredit( { walletId: userDetails.walletId, amount: creditAmount })}>credit account</button>
                        </div>
                        </div>
                        <div className="row" style={{paddingTop: '10px'}}>
                        <div className="col text-bg-light">
                        <input 
                                id="fromDate"
                                type='date'
                                placeholder="from date"
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        <input 
                                id="toDate"
                                type='date'
                                placeholder="to date"
                                onChange={(e) => setToDate(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={() => getTransactions( { walletId: userDetails.walletId, "fromDate": fromDate, "toDate": toDate })}>show transactions</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;