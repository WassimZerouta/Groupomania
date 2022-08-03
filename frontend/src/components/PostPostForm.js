import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function PostPostForm(props) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const token = userToken.token;
  const bearerToken = `Bearer ${token}`;

  const imageRef = useRef(false);
  const formRef = useRef(false);

  const formData = new FormData();
  const imageFile = imageRef.current;
  const [image, setImage] = useState("");

  const userId = props.userId;

  const onSubmit = e => {
    e.preventDefault();
    formData.append("image", imageFile.files[0]);
    axios({
      method: "post",
      url: `http://localhost:3100/api/post/${userId}`,
      data: formData,
      headers: {
        Authorization: bearerToken,
        "content-type": "multipart/form-data",
      },
    }).then(res => {
      window.location.reload();
      setImage("");
    });
  };

  return (
    <form
      ref={formRef}
      encType="multipart/form"
      onSubmit={onSubmit}
      className="w-full flex items-center justify-center"
    >
      <label
        htmlFor="image"
        className=" flex items-center justify-center border-2 border-red-50 bg-red-50 rounded-xl h-12 mb-4 transition duration-500 ease hover:bg-red-200 hover:border-red-100 mt-10 shadow-md"
      >
        <div className="ml-5 mr-5 text-neutral-400 font-semibold">
          Choisissez votre gif !
        </div>
      </label>
      <input
        ref={imageRef}
        className="hidden"
        type="file"
        name="image"
        id="image"
        filename="image"
        onChange={e => {
          setImage(URL.createObjectURL(e.target.files[0]));
        }}
      ></input>
      {image !== "" ? (
        <button type="submit">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="ml-4 mt-6 text-neutral-300 transition duration-500 ease hover:text-red-300 h-5"
          />
        </button>
      ) : null}
    </form>
  );
}
