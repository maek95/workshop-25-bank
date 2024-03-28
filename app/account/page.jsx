"use client"
import { useEffect, useState } from "react"
import { host } from "../host";

export default function AccountPage() {
  //const [token, setToken] = useState("");
  const [saldo, setSaldo] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [input, setInput] = useState("");
  const [transaction, setTransaction] = useState(null);

  const [transactionKey, setTransactionKey] = useState(0); // Unique key for transaction
  // TODO: should maybe handle this in backend?

  useEffect(() => {
  
    postAccount();
    
  }, [])

  useEffect(() => {
    

        handlePostTransaction();


  //}, [transaction])
  }, [transactionKey])


  async function postAccount() { // fetch the saldo  once when entering the page
    try {
      const tokenStorage = localStorage.getItem("token");
      //setToken(tokenStorage);
      console.log("fetched localStorage token: ", tokenStorage);
      const response = await fetch(`${host}/me/accounts`, {
        // users sidan på backend! dvs inte riktiga sidan!
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: tokenStorage, // "backend får in detta som en "request" i "body"... se server.js när vi skriver t.ex. const data = req.body "
        }),
      });

      const data = await response.json();
      console.log("fetched data.amount: ", data.amount, " from accountID ", data.accountId);    
      setSaldo(data.amount);
      setAccountId(data.accountId);
      console.log("saldo: ", saldo);
        
    } catch (error) {
      console.error('Error:', error)
    }
  }

  

  console.log("saldo: ", saldo);
  
  if (saldo == null || accountId == null ) {
    return <div>Loading account...</div>
  } else {
    
  }

 
  function handlePostTransaction() {
    async function postTransaction() {
      try {

        const tokenStorage = localStorage.getItem("token");
        //setToken(tokenStorage);
        console.log("fetched localStorage token: ", tokenStorage);
        const response = await fetch(`${host}/me/accounts/transactions`, {
          // users sidan på backend! dvs inte riktiga sidan!
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: tokenStorage, // to find the correct account
            transaction: transaction,
          }),
        });

        const data = await response.json();
        setInput(""); // clear input field... have to be done here..?
       
      } catch (error) {
        console.error('Error:', error)
      }
    }

    postTransaction(); 
    postAccount(); // fetch the account infromation again
  }

  function handleClickSend() {
    setTransaction(input);
    setTransactionKey(prevKey => prevKey + 1); // Increment transactionKey to trigger useEffect
  }
  

  return (
    <div>
      <h1>Hello</h1>
      
      <h3>Balance on account id {accountId}:</h3>
      <p>{saldo}kr</p>

      <label htmlFor="transaction">Deposit</label>
      <div>
        <input type="text" name="deposit" id="deposit" value={input} onChange={(e) => {
          setInput(e.target.value)}} />
        <button onClick={() => {
          //setTransaction(input);
          handleClickSend();
          console.log("input", input);
          console.log("transaction: ", transaction);
          }}>Send</button>
      </div>

    </div>
  )
}