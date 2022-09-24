import React, { useState } from "react";
import { useEffect } from "react";
import StellarSdk from "stellar-sdk";

const Account = ({ keyo, secret }) => {
  console.log("secret", secret);
  const [account, setAccount] = useState(null);
  const [recepto, setReceptor] = useState("");
  const [distributor, setDistributor] = useState("");
  const [code, setCode] = useState("");
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const [valueInput, setValue] = useState("1.0000000");
  const sender = StellarSdk.Keypair.fromSecret(secret);
  const accountSet = async () => {
    const getData = await server.loadAccount(keyo);
    setAccount(getData);
  };

  const createAsset = async () => {
    const distributor1 = StellarSdk.Keypair.fromSecret(distributor);
    let USDX = new StellarSdk.Asset(code, keyo);

    await server.loadAccount(keyo);
    server
      .loadAccount(distributor1.publicKey())
      .then(function (response) {
        var transaction = new StellarSdk.TransactionBuilder(response, {
          fee: 100,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })

          // The `changeTrust` operation creates (or alters) a trustline
          // The `limit` parameter below is optional
          .addOperation(
            StellarSdk.Operation.changeTrust({
              asset: USDX,
              limit: "1000",
            })
          )
          // setTimeout is required for a transaction
          .setTimeout(100)
          .build();
        transaction.sign(distributor1);
        console.log("jujuju");
        return server.submitTransaction(transaction);
      })
      .then(console.log("Creado"))
      // Second, the issuing account actually sends a payment using the asset
      .then(function () {
        return server.loadAccount(keyo);
      })
      .then(function (issuer) {
        var transaction = new StellarSdk.TransactionBuilder(issuer, {
          fee: 100,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: distributor1.publicKey(),
              asset: USDX,
              amount: "10",
            })
          )
          // setTimeout is required for a transaction
          .setTimeout(100)
          .build();

        transaction.sign(sender);
        server.submitTransaction(transaction);
      })
      .then(async (response) => {
        const cuco = await server.loadAccount(keyo);
        setAccount(cuco);
      })

      .catch(function (error) {
        console.error("Error!", error);
      });
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
      {account && console.log(account)}
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

      <div>
        <h3>Create an Asset</h3>

        <input
          type="text"
          placeholder="Distribution Secret KEY"
          onChange={(e) => setDistributor(e.target.value)}
        />
        <input
          type="text"
          placeholder="ASSET CODE"
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={createAsset}>Create Asset</button>
      </div>
    </div>
  );
};

export default Account;
