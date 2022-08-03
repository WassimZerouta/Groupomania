import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PostDelete(props) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const token = userToken.token;
  const bearerToken = `Bearer ${token}`;

  const auth = axios.create({
    headers: {
      Authorization: bearerToken,
    },
  });

  const post = props.post;
  const postId = post.id;

  const userId = props.userId;

  return (
    <button>
      {" "}
      <FontAwesomeIcon
        icon={faXmark}
        className=" text-neutral-300 transition duration-500 ease hover:text-red-300 h-5"
        onClick={() => {
          const confirm = window.confirm(
            "Vous êtes sur le point de supprimer votre post !"
          );
          if (confirm) {
            auth
              .delete(`http://localhost:3100/api/post/${userId}/${postId}`)
              .then(props.deletePost(post));
          }
        }}
      ></FontAwesomeIcon>
    </button>
  );
}
