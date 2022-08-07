import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function SignupBody() {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errEmailmessage, setErrEmailMessage] = useState("");
  const [errPasswordmessage, setErrPasswordMessage] = useState("");
  const [errFirstNamemessage, setErrFirstNameMessage] = useState("");
  const [errLastNamemessage, setErrLastNameMessage] = useState("");

  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);

  async function onSubmit(e) {
    await regExpTest(e);
    if (validEmail && validPassword && validFirstName && validLastName) {
      axios
        .post("http://localhost:3100/api/auth/signup", {
          firstName,
          lastName,
          password,
          email,
        })
        .then(res => {
          navigate("/");
        })
        .catch(res => setErrEmailMessage("Email déjà utilisé !"));
    }
  }

  const regExpTest = e => {
    e.preventDefault();

    const emailRegExp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}", "g");
    if (!emailRegExp.test(email)) {
      setValidEmail(false);
      setErrEmailMessage("Email invalide");
    } else {
      setValidEmail(true);
      setErrEmailMessage("");
    }
    const passwordRegExp = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
    if (!passwordRegExp.test(password)) {
      setValidPassword(false);
      setErrPasswordMessage("Mot de passe incorrect");
    } else {
      setValidPassword(true);
      setErrPasswordMessage("");
    }
    const firstNameRegExp = new RegExp(
      "([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*",
      "g"
    );
    if (!firstNameRegExp.test(firstName)) {
      setValidFirstName(false);
      setErrFirstNameMessage("Prenom incorrect");
    } else {
      setValidFirstName(true);
      setErrFirstNameMessage("");
    }
    const lastNameRegExp = new RegExp(
      "([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*",
      "g"
    );
    if (!lastNameRegExp.test(lastName)) {
      setValidLastName(false);
      setErrLastNameMessage("Nom incorrect");
    } else {
      setValidLastName(true);
      setErrLastNameMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center pt-10 h_full">
      <form
        onSubmit={onSubmit}
        className="bg-neutral-100 flex flex-col items-center justify-center mb-20 w-2/6 h-2/5 border-2 border-red-200 rounded-xl shadow-xl"
      >
        <div className=" w-3/4">
          <FontAwesomeIcon icon={faUser} className="text-red-300 h-5" />

          <input
            type="text"
            placeholder="   Nom"
            className="bg-neutral-100 justify-self-center h-12 w-5/6 rounded-xl ml-2 border-2 border-neutral-300 mt-10 shadow-md"
            value={lastName}
            onChange={e => setlastName(e.target.value)}
          />
          <div className=" text-red-600 ml-8"> {errLastNamemessage} </div>
        </div>
        <div className=" w-3/4">
          <FontAwesomeIcon icon={faUser} className="text-red-300 h-5" />

          <input
            type="text"
            placeholder="   Prénom"
            className="bg-neutral-100 justify-self-center h-12 w-5/6 rounded-xl  ml-2 border-2 border-neutral-300 mt-10 shadow-md"
            value={firstName}
            onChange={e => setfirstName(e.target.value)}
          />
          <div className=" text-red-600 ml-8"> {errFirstNamemessage} </div>
        </div>
        <div className=" w-3/4">
          <FontAwesomeIcon icon={faEnvelope} className="text-red-300 h-5" />

          <input
            type="email"
            placeholder="   Adresse e-mail"
            className="bg-neutral-100 justify-self-center h-12 w-5/6 rounded-xl ml-2 border-2 border-neutral-300 mt-10 shadow-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className=" text-red-600 ml-8"> {errEmailmessage} </div>
        </div>
        <div className=" w-3/4">
          <FontAwesomeIcon icon={faLock} className="text-red-300 h-5" />

          <input
            type="password"
            placeholder="   Mot de passe"
            className="bg-neutral-100  border-2 h-12 w-5/6 ml-2 rounded-xl border-neutral-300 mt-10 shadow-md"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className=" text-red-600 ml-8"> {errPasswordmessage} </div>
        </div>
        <button className="border-2 border-neutral-300 bg-neutral-100 rounded-xl h-12 mb-4 mt-10 w-2/6 transition duration-500 ease hover:bg-red-300 hover:border-red-200 shadow-md">
          S'inscrire{" "}
        </button>
        <div>Vous avez déja un compte ? </div>{" "}
        <NavLink
          to="/login"
          className="text-red-300 hover:text-red-500 transition duration-300 ease-in-out mb-10"
        >
          {" "}
          Connectez-vous !
        </NavLink>
      </form>
    </div>
  );
}
