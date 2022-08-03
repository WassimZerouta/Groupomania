import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScrewdriverWrench,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import ProfileDataPutForm from "./ProfileDataPutForm";
import ProfileDataDelete from "./ProfileDataDelete";
import defautProfilePicture from "../assets/avatar.jpeg";

export default function ProfileData(props) {
  const [isClicked, setIsClicked] = useState(false);

  const user = props.user;
  const userId = props.userId;

  if (user.id === userId) {
    return (
      <div className="flex flex-col items-center justify-center ">
        {user.image !== null ? (
          <div className="w-40 h-40 mt-10  rounded-full border-4 border-red-200 overflow-hidden">
            <img
              src={user.image}
              alt="profile"
              className=" w-40 h-40 rounded-full bg-neutral-100  "
            ></img>
          </div>
        ) : (
          <div className="w-40 h-40 mt-10  rounded-full border-4 border-red-200 overflow-hidden">
            <img
              src={defautProfilePicture}
              alt="profile"
              className=" w-40 h-40 rounded-full bg-neutral-100  "
            ></img>
          </div>
        )}
        <div className="text-neutral-400 text-xl font-semibold mt-5 flex">
          {" "}
          <div className="mr-1">{user.firstName}</div>
          <div className="ml-1">{user.lastName}</div>
        </div>
        <FontAwesomeIcon
          icon={faScrewdriverWrench}
          className=" text-xl mt-5 text-neutral-300 transition duration-500 ease hover:text-red-300 h-5"
          onClick={() => setIsClicked(true)}
        />
        {isClicked === true ? (
          <div className=" flex  items-center">
            {" "}
            <div className="flex flex-col items-center ml-20 ">
              <ProfileDataPutForm
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                userId={props.userId}
              />
              <div>
                {" "}
                <ProfileDataDelete userId={props.userId} />{" "}
              </div>
            </div>
            <button className="mt-10">
              <FontAwesomeIcon
                className="text-neutral-300 ml-10 transition duration-500 ease hover:text-red-300 h-5 "
                icon={faArrowRight}
                onClick={() => setIsClicked(false)}
              ></FontAwesomeIcon>
            </button>{" "}
          </div>
        ) : null}
      </div>
    );
  }
}
