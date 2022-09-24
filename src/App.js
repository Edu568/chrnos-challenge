import Setup from "./components/Setup";
import PreAccount from "./components/PreAccount";
import { useState } from "react";
function App() {
  const [importSecret, setImport] = useState("");
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  return (
    <div className="App">
      <Setup />
      <PreAccount key={key} secret={secret} />
    </div>
  );
}

export default App;
