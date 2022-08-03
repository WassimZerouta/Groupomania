import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import LoginBody from "../components/LoginBody";

export default function Login() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      <Header auth={auth} setAuth={setAuth} />
      <LoginBody />
    </div>
  );
}
