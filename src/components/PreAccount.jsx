import React from "react";

const PreAccount = ({ secret }) => {
  return (
    <div>
      <input readOnly={true} value={secret} />
    </div>
  );
};
export default PreAccount;
