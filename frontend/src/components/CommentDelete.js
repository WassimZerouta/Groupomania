import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CommentDelete(props) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));

  const token = userToken.token;
  const Bearertoken = `Bearer ${token}`;

  const auth = axios.create({
    headers: {
      Authorization: Bearertoken,
    },
  });

  const userId = props.userId;
  const post = props.post;
  const postId = post.id;
  const admin = props.admin;
  const comment = props.comments;
  const commentUserId = comment.UserId;
  const commentId = comment.commentid;

  return (
    <button className="h-12 mr-4 w-1/8 ">
      <FontAwesomeIcon
        icon={faXmark}
        className=" text-neutral-300 transition duration-500 ease hover:text-red-300 h-5"
        onClick={() => {
          const confirm = window.confirm(
            "Vous êtes sur le point de supprimer votre commentaire !"
          );
          if (confirm) {
            auth
              .delete(
                `http://localhost:3100/api/post/${userId}/${postId}/comment/${commentId}`
              )
              .then(props.deleteComment(comment));
          }
        }}
      ></FontAwesomeIcon>
    </button>
  );
}
