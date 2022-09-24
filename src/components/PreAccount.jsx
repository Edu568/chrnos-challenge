import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import StellarSdk from "stellar-sdk";
import axios from "axios";
const PreAccount = ({ secret, reset, setCopied }) => {
  const [copy, setCopy] = useState("Copy to Clipboard");
  const pair = StellarSdk.Keypair.fromSecret(secret);
  const moveforward = async () => {
    try {
      const response = await axios(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(
          pair.publicKey()
        )}`
      );
      setCopied(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <p>Please make sure to copy and save your Secret key in a safe place.</p>
      <input readOnly={true} value={secret} />
      <CopyToClipboard text={secret} onCopy={() => setCopy("Copied!")}>
        <button>{copy}</button>
      </CopyToClipboard>
      <button onClick={reset}>Regresar</button>
      <button onClick={moveforward}>Confirmar</button>
    </div>
  );
};
export default PreAccount;
