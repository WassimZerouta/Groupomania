import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileData from "./ProfileData";

export default function ProfileBody() {
  const [userList, setUserList] = useState([]);

  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const token = userToken.token;

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  const user = parseJwt(token);

  const userId = user.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/auth`)
      .then(res => setUserList(res.data));
  }, []);

  return userList.map((user, index) => {
    return (
      <div>
        <ProfileData key={index} user={user} userId={userId} />
      </div>
    );
  });
}
