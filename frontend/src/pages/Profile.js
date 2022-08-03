import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import ProfileBody from "../components/ProfileBody";

export default function Profile() {
  const [acceuilActive, setAcceuilActive] = useState(false);
  const [auth, setAuth] = useState(true);

  return (
    <div>
      <Header
        acceuilActive={acceuilActive}
        setAcceuilActive={setAcceuilActive}
        auth={auth}
      />
      <ProfileBody />
    </div>
  );
}
