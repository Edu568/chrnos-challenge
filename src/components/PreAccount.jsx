import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
const PreAccount = ({ secret, reset }) => {
  const [copy, setCopy] = useState("Copy to Clipboard");

  return (
    <div className="container">
      <p>Please make sure to copy and save your Secret key in a safe place.</p>
      <input readOnly={true} value={secret} />
      <CopyToClipboard text={secret} onCopy={() => setCopy("Copied!")}>
        <button>{copy}</button>
      </CopyToClipboard>
      <button onClick={reset}>Regresar</button>
      <button>Confirmar</button>
    </div>
  );
};
export default PreAccount;
