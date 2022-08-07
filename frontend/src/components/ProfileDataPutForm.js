import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

export default function ProfileDataPutForm(props) {
  const navigate = useNavigate();
  const imageRef = useRef(false);
  const formRef = useRef(false);
  const [image, setImage] = useState("");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const token = userToken.token;
  const bearerToken = `Bearer ${token}`;
  const password = userData.password;
  const email = userData.email;
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const userId = props.userId;

  const onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = imageRef.current;

    formData.append("image", imageFile.files[0]);

    axios({
      method: "put",
      url: `http://localhost:3100/api/auth/${userId}`,
      data: formData,

      headers: {
        Authorization: bearerToken,
        "content-type": "multipart/form-data",
      },
    }).then(res => {
      setImage("");
      props.setIsClicked(false);
      alert("Modifications éfféctuées");
      navigate("/accueil");
    });
  };

  sessionStorage.setItem(
    `userData`,
    `${JSON.stringify({
      firstName,
      lastName,
      password,
      email,
      image,
      token,
    })}`
  );

  return (
    <div className="flex justify-center ">
      <form
        ref={formRef}
        encType="multipart/form"
        onSubmit={onSubmit}
        className="w-full h-12 mt-5 flex items-center justify-center"
      >
        <label
          htmlFor="image"
          className=" flex items-center justify-center border-2  bg-neutral-100 rounded-xl h-12 mb-4 transition duration-500 ease hover:bg-red-300 hover:border-red-200 mt-10 shadow-md"
        >
          {" "}
          <div className="ml-8 mr-8 text-neutral-500">
            Modifiez votre photo de profil !{" "}
          </div>
        </label>
        <input
          ref={imageRef}
          id="image"
          name="image"
          type="file"
          className="hidden"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        {image !== "" ? (
          <button type="submit">
            <FontAwesomeIcon
              className="text-neutral-300 ml-5 mt-5 transition duration-500 ease hover:text-red-300 h-5 "
              icon={faPaperPlane}
            ></FontAwesomeIcon>{" "}
          </button>
        ) : null}
      </form>
    </div>
  );
}
