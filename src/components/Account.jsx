import React, { useState } from "react";
import { useEffect } from "react";
import StellarSdk from "stellar-sdk";

const Account = ({ keyo, secret }) => {
  console.log("hola", keyo);
  const [account, setAccount] = useState(null);
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const [valueInput, setValue] = useState("1.0000000");
  const accountSet = async () => {
    const getData = await server.loadAccount(keyo);
    setAccount(getData);
  };

  useEffect(() => {
    accountSet();
  }, [keyo]);

  return (
    <div>
      <h1>My Key: {secret}</h1>
      {account &&
        account.balances.map((el) => (
          <span>
            Balance:
            {`${el.asset_type === "native" ? "XLM" : "Native"} -
            ${Number(el.balance).toFixed(2)}`}
          </span>
        ))}
      <h3>Make a Payment</h3>
      <input
        value={valueInput}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default Account;
