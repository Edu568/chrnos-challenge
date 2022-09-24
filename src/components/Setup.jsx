import React, { useState } from "react";
import StellarSdk from "stellar-sdk";
const Setup = ({ setSecret, setKey }) => {
  const [importSecret, setImport] = useState("");
  const [error, setError] = useState("");

  const createAccount = () => {
    const pair = StellarSdk.Keypair.random();
    const secret = pair.secret();
    const publicK = pair.publicKey();

    setSecret(secret);
    setKey(publicK);
  };

  const importAcc = () => {
    if (importSecret.length === 56) {
      const acc = StellarSdk.KeyPair.fromSecret(importSecret);
      const accPublic = acc.publicKey();
      const accSecret = acc.secret();
      setError("");
    } else {
      setError("Error al verificar la llave secreta");
    }
  };
  return (
    <>
      <h1 className="text-5xl">Bienvenido a Stellar</h1>
      <span className="text-xl">
        Crea tu billetera de forma instantanea y segura
      </span>
      <p>
        {" "}
        <button
          className="bg-blue-600 text-white border-solid rounded border-gray-500 w-[150px] mt-5"
          onClick={() => createAccount()}
        >
          Crear Cuenta
        </button>
      </p>
      <p className="mt-5">Si ya tienes cuenta, importala!</p>
      <div className="flex">
        <input
          type="text"
          placeholder="Ingresa tu llave privada"
          className="text-center"
          value={importSecret}
          onChange={(e) => setImport(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white border-solid rounded border-gray-500 w-[100px]"
          onClick={importAcc}
        >
          Importar
        </button>
      </div>
      {error && <span className="text-red-600 my-3">{error}</span>}
    </>
  );
};

export default Setup;
