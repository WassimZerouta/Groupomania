import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function LoginBody() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3100/api/auth/login", {
        password,
        email,
      })
      .then(res => {
        if (!res.data.auth) {
          setErrorMessage("Adresse email ou mot de passe incorrect");
        } else {
          setIsAuthorised(true);
          sessionStorage.setItem(`userData`, `${JSON.stringify(res.data)}`);
          sessionStorage.setItem(
            `token`,
            `${JSON.stringify({ token: res.data.token })}`
          );
        }
      })
      .catch(() => {
        setErrorMessage("Adresse email ou mot de passe incorrect");
      });
  };

  return (
    <div className="flex justify-center items-center pt-10 h_full">
      <form
        onSubmit={onSubmit}
        className="bg-neutral-100 flex flex-col items-center justify-center w-2/6 h-2/5 border-2 border-red-200 rounded-xl shadow-xl"
      >
        <div className=" w-3/4">
          <FontAwesomeIcon icon={faEnvelope} className="text-red-300 h-5" />

          <input
            type="email"
            placeholder="   Adresse e-mail"
            className="bg-neutral-100 justify-self-center h-12 w-5/6 rounded-xl ml-2 border-2 border-neutral-300 mt-10 shadow-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className=" w-3/4">
          <FontAwesomeIcon icon={faLock} className="text-red-300 h-5" />

          <input
            type="password"
            placeholder="   Mot de passe"
            className="bg-neutral-100 border-2 h-12 w-5/6 ml-2 rounded-xl border-neutral-300 mt-10 shadow-md"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="text-red-600 mt-2"> {errorMessage} </div>
        <button
          type="submit"
          className="border-2 border-neutral-300 bg-neutral-100 rounded-xl h-12 mb-4 w-2/6 transition duration-500 ease hover:bg-red-300 hover:border-red-200 mt-10 shadow-md"
        >
          {" "}
          Connexion{" "}
        </button>
        <div>Vous n'avez pas de compte ? </div>

        <NavLink
          to="/signup"
          className="text-red-300 hover:text-red-500 transition duration-300 ease-in-out mb-10"
        >
          {" "}
          inscrivez-vous !
        </NavLink>
      </form>

      {isAuthorised ? navigate("/accueil") : null}
    </div>
  );
}
