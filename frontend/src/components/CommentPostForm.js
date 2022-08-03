import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function CommentPostForm(props) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const token = userToken.token;
  const bearerToken = `Bearer ${token}`;
  const [content, setContent] = useState("");

  const post = props.post;
  const postId = post.id;
  const userId = props.userId;

  const onSubmit = () => {
    axios({
      method: "post",
      url: `http://localhost:3100/api/post/${userId}/${postId}/comment`,
      data: { content: content },
      headers: {
        Authorization: bearerToken,
      },
    }).then(res => {
      alert("Commentaire envoyé !");
      setContent("");
    });
  };

  return (
    <form
      className="w-full h-12 ml-8 flex items-center justify-center"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="  Écrivez un commentaire.."
        maxLength="200"
        className="bg-neutral-100  border-4 border-neutral-200 w-5/6 h-12 rounded-xl shadow-xl"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      {content !== "" ? (
        <button>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="ml-4 text-neutral-300 transition duration-500 ease hover:text-red-300 h-5"
          />
        </button>
      ) : null}
    </form>
  );
}
