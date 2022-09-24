import React, { useState } from "react";
import Setup from "./Setup";
import PreAccount from "./PreAccount";
const Router = () => {
  const [importSecret, setImport] = useState("");
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [copied, setCopied] = useState(false);
  const reset = () => {
    setSecret("");
  };
  if (!secret) {
    return (
      <Setup
        setSecret={setSecret}
        setKey={setKey}
        setImport={setImport}
        importSecret={importSecret}
      />
    );
  } else if (!copied) {
    return <PreAccount key={key} secret={secret} reset={reset} />;
  }
};

export default Router;
