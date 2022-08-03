import React from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function CommentPutForm(props) {
  const [content, setContent] = useState("");

  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const token = userToken.token;
  const bearerToken = `Bearer ${token}`;

  const comment = props.comment;
  const createdAt = comment.createdAt;
  const updatedAt = comment.updatedAt;
  const User = comment.User;
  const commentId = comment.commentid;
  const commentPostId = comment.PostId;

  const userId = props.userId;

  const auth = axios.create({
    headers: {
      Authorization: bearerToken,
    },
  });

  const onSubmit = e => {
    e.preventDefault();
    auth
      .put(
        `http://localhost:3100/api/post/${userId}/${commentPostId}/comment/${commentId}`,
        {
          content,
        }
      )
      .then(res => {
        const comment = {
          commentid: commentId,
          PostId: commentPostId,
          UserId: userId,
          content: content,
          User: User,
          createdAt: createdAt,
          updatedAt: updatedAt,
        };
        props.updateComment(comment);
        alert("Commentaire modifié");
        setContent("");
        props.setIsClicked(false);
      });
  };

  return (
    <div className="w-5/6 flex justify-center ">
      <form
        onSubmit={onSubmit}
        className="w-4/6 h-12 flex items-center centent-center"
      >
        <input
          type="text"
          placeholder="  Modifiez votre comentaire.."
          maxLength="200"
          className="bg-neutral-100 border-2  border-red-200  w-full h-12 rounded-xl shadow-xl"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {content !== "" ? (
          <button>
            <FontAwesomeIcon
              className="text-neutral-300 ml-5 transition duration-500 ease hover:text-red-300 h-5 "
              icon={faPaperPlane}
            ></FontAwesomeIcon>{" "}
          </button>
        ) : null}
      </form>
    </div>
  );
}
