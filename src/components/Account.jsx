import React, { useState } from "react";
import { useEffect } from "react";
import StellarSdk from "stellar-sdk";

const Account = ({ keyo, secret }) => {
  console.log("secret", secret);
  const [account, setAccount] = useState(null);
  const [recepto, setReceptor] = useState("");
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const [valueInput, setValue] = useState("1.0000000");
  const sender = StellarSdk.Keypair.fromSecret(secret);
  const accountSet = async () => {
    const getData = await server.loadAccount(keyo);
    setAccount(getData);
  };

  const submitPayment = async () => {
    try {
      let innerTransaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: recepto,
            asset: StellarSdk.Asset.native(),
            amount: valueInput.toString(),
            source: keyo,
          })
        )
        .setTimeout(30)
        .build();
      innerTransaction.sign(sender);
      const updated = await server.submitTransaction(innerTransaction);
      const getData = await server.loadAccount(keyo);
      setAccount(getData);
      setReceptor("");
      setValue("");

      console.log("Transaction submited!");
    } catch (error) {
      console.log(error);
    }
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
      <input
        placeholder="Ingrese la cuenta destino"
        onChange={(e) => setReceptor(e.target.value)}
      />

      <button onClick={submitPayment}>Submit</button>
    </div>
  );
};

export default Account;
