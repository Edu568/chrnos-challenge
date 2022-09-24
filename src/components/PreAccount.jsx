import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
const PreAccount = ({ secret }) => {
  return (
    <div className="container">
      <input readOnly={true} value={secret} />
      <CopyToClipboard text={secret}>
        <button>Copy Secret Key </button>
      </CopyToClipboard>
    </div>
  );
};
export default PreAccount;
