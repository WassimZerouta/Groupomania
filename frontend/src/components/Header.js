import React from "react";
import wallPaper from "../assets/icon.png";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="flex flex-col items-center justify-center border-b-2 border-neutral-300 border-b-neutral-200">
      <img className="relative z-0 bg-cover w-32 h-32" src={wallPaper} alt="" />
      <h1 className="font-sans text-xl font-bold text-red-200">GROUPOMANIA</h1>
      {props.auth ? (
        <div>
          <div className="flex justify-center items-center  mt-5  ">
            {props.acceuilActive ? (
              <NavLink to="/profile">
                <h2 className="w-20 text-neutral-400 font-semibold  hover:text-red-300 transition duration-300 ease-in-out mb-5">
                  Profil
                </h2>
              </NavLink>
            ) : (
              <NavLink to="/accueil">
                <h2 className="w-20 text-neutral-400 font-semibold  hover:text-red-300 transition duration-300 ease-in-out mb-5">
                  Accueil
                </h2>
              </NavLink>
            )}
            <button onClick={() => sessionStorage.clear()}>
              <NavLink to="/">
                <h2 className=" w-20 text-neutral-400 font-semibold  hover:text-red-300 transition duration-300 ease-in-out mb-5">
                  Déconnexion
                </h2>
              </NavLink>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
