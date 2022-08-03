import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import CommentPostForm from "./CommentPostForm";
import PostDelete from "./PostDelete";
import defautProfilePicture from "../assets/avatar.jpeg";

export default function Post(props) {
  const userId = props.userId;
  const post = props.post;
  const user = post.User;
  const admin = props.admin;
  const comments = post.Comments;

  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState(false);
  const [allComments, setAllComments] = useState(false);
  const list = [...commentList];

  const updateComment = comments => {
    const comment = {
      commentid: comments.commentid,
      PostId: comments.PostId,
      UserId: comments.UserId,
      content: comments.content,
      User: comments.User,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
    };

    const commentId = list.findIndex(x => {
      return x.commentid === comment.commentid;
    });

    list.splice(commentId, 1);
    list.push(comment);
    setCommentList(list);
  };

  const deleteComment = comment => {
    const findComment = list.findIndex(x => {
      return x.commentid === comment.commentid;
    });

    list.splice(findComment, 1);
    setCommentList(list);
  };

  let lastCommentIndex = commentList.length;
  let lastComment =
    lastCommentIndex !== undefined ? commentList[lastCommentIndex - 1] : null;

  const date = new Date(post.createdAt);
  const postDate = new Intl.DateTimeFormat("fr", {
    timeStyle: "short",
    dateStyle: "short",
  }).format(date);

  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <div className="bg-neutral-100 flex flex-col items-center justify-center mb-10  w-4/6 h-2/5 border-4 border-red-50 rounded-xl shadow-xl">
        <div className=" flex justify-between items-center w-full border-b-2 border-neutral-200 border-b-neutral-200">
          {user.image !== null ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center ml-5 mt-2 mb-2">
                <div className="w-12 h-12  rounded-full border-2 border-red-100 overflow-hidden">
                  {" "}
                  <img
                    src={user.image}
                    alt="Profile"
                    className=" w-12 h-12 rounded-full   "
                  ></img>{" "}
                </div>
                <div className=" ml-4 text-neutral-400 font-semibold">
                  {user.firstName}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center ml-5 mt-2 mb-2">
                <div className="w-12 h-12  rounded-full border-2 border-red-100 overflow-hidden">
                  {" "}
                  <img
                    src={defautProfilePicture}
                    alt=""
                    className=" w-12 h-12 rounded-full   "
                  ></img>
                </div>
                <div className=" ml-4 text-neutral-400">{user.firstName}</div>
              </div>
            </div>
          )}
          <div className=" flex flex-row items-center mr-4">
            <div className="mr-4 text-neutral-400 font-semibold">
              {" "}
              {postDate}
            </div>
            {userId === post.UserId || admin ? (
              <div className="h-12 w-1/8 flex items-center ">
                <PostDelete
                  post={props.post}
                  deletePost={props.deletePost}
                  userId={userId}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex w-full justify-center bg-red-50 border-b-2 border-neutral-200 border-b-neutral-200">
          <img
            src={props.post.image}
            alt="post"
            className="flex w-full h-96 items-center justify-center  text-neutral-500"
          ></img>
        </div>
        <div className="w-full mt-5  mb-5 border-b-2  border-neutral-200 border-b-neutral-200 text-neutral-500">
          <div className="flex flex-col  items-center">
            <div className="w-full">
              {allComments === true ? (
                commentList.map((commentList, index) => {
                  return (
                    <Comment
                      admin={admin}
                      key={index}
                      comments={commentList}
                      post={post}
                      userId={userId}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                    />
                  );
                })
              ) : lastComment !== undefined ? (
                <Comment
                  comments={lastComment}
                  post={post}
                  userId={userId}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                />
              ) : null}
            </div>
            {commentList.length > 1 ? (
              <button className="h-12 mr-4 w-1/8 ">
                {" "}
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className=" text-neutral-300 transition duration-500 ease hover:text-red-300 h-5"
                  onClick={() => {
                    if (allComments === false) {
                      setAllComments(true);
                    } else if (allComments === true) {
                      setAllComments(false);
                    }
                  }}
                ></FontAwesomeIcon>
              </button>
            ) : null}
          </div>
        </div>
        <CommentPostForm
          post={post}
          comments={commentList}
          newComment={newComment}
          setNewComment={setNewComment}
          userId={userId}
        />
      </div>
    </div>
  );
}
