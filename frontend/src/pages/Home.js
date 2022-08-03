import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import HomeBody from "../components/HomeBody";

export default function Home() {
  const [acceuilActive, setAcceuilActive] = useState(true);
  const [auth, setAuth] = useState(true);

  return (
    <div>
      <Header acceuilActive={acceuilActive} auth={auth} />
      <HomeBody />
    </div>
  );
}
