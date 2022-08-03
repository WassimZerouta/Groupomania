import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import SignupBody from "../components/SignupBody";

export default function Signup() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      <Header auth={auth} />
      <SignupBody />
    </div>
  );
}
