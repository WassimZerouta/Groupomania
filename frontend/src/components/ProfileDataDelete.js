import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileDataDelete(props) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const token = userToken.token;
  const userId = props.userId;
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  const auth = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="ml-8 mr-8 border-neutral-300 text-neutral-500 bg-neutral-100 rounded-xl transition duration-500 ease hover:bg-red-300 hover:border-red-200 mt-10 shadow-md">
      <button
        onClick={() =>
          auth.delete(`http://localhost:3100/api/auth/${userId}/`).then(res => {
            alert("Profil supprimé");
            setIsDeleted(true);
            sessionStorage.clear();
          })
        }
      >
        <div className="mt-4 mb-4 ml-4 mr-4">Supprimez votre compte ! </div>
      </button>
      {isDeleted ? navigate("/login") : null}
    </div>
  );
}
