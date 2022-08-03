import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommentDelete from "./CommentDelete";
import CommentPutForm from "./CommentPutForm";
import defautProfilePicture from "../assets/avatar.jpeg";

export default function Comment(props) {
  const [isClicked, setIsClicked] = useState(false);
  const comments = props.comments;
  const commentUserId = comments.UserId;
  const user = comments.User;
  const admin = props.admin;

  const userId = props.userId;

  const date = new Date(comments.createdAt);
  const commentDate = new Intl.DateTimeFormat("fr", {
    timeStyle: "short",
    dateStyle: "short",
  }).format(date);

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center">
      <div className=" flex flex-col items-center justify-center w-5/6 h-40 bg-red-50  border-red-300 rounded-xl shadow-xl mb-5">
        <div className=" w-full   border-b-2 border-neutral-200 border-b-neutral-200">
          <div className="  ml-5 mt-2 mb-2 ">
            <div className="flex items-center justify-between content-between ">
              <div className="flex items-center justify-between">
                {user.image !== null ? (
                  <div className="w-12 h-12  rounded-full border-2 border-neutral-100 overflow-hidden">
                    {" "}
                    <img
                      src={user.image}
                      alt="Profile picture"
                      className=" w-12 h-12 rounded-full   "
                    ></img>{" "}
                  </div>
                ) : (
                  <div className="w-12 h-12  rounded-full border-2 border-neutral-100 overflow-hidden">
                    {" "}
                    <img
                      src={defautProfilePicture}
                      alt="Profile picture"
                      className=" w-12 h-12 rounded-full   "
                    ></img>{" "}
                  </div>
                )}
                <div className=" ml-4 text-neutral-300 font-semibold">
                  {user.firstName}
                </div>
              </div>
              <div className=" flex flex-row items-center mr-4">
                <div className="mr-4 text-neutral-300 font-semibold">
                  {" "}
                  {commentDate}
                </div>
                <div className="flex flex-row items-center ">
                  {userId === commentUserId ? (
                    <div className="  text-neutral-500">
                      <button className="h-12 mr-4 w-1/8 ">
                        {" "}
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className=" text-neutral-300 transition duration-500 ease hover:text-red-300 h-5"
                          onClick={() => setIsClicked(true)}
                        ></FontAwesomeIcon>
                      </button>
                    </div>
                  ) : null}
                  {userId === commentUserId || admin ? (
                    <CommentDelete
                      admin={admin}
                      comments={props.comments}
                      post={props.post}
                      userId={userId}
                      deleteComment={props.deleteComment}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full h-4/6   flex flex-col  border-neutral-200 border-b-neutral-200">
          <div className="flex flex-col  ">
            <div className=" flex justify-end "></div>
            <div className="mt-8 ml-10 text-neutral-400 ">
              {" "}
              {comments.content}{" "}
            </div>
            {isClicked === true ? (
              <div className=" w-full flex justify-center ">
                <CommentPutForm
                  post={props.post}
                  comment={props.comments}
                  updateComment={props.updateComment}
                  setIsClicked={setIsClicked}
                  userId={userId}
                />
                <button>
                  <FontAwesomeIcon
                    className="text-neutral-300 ml-10 transition duration-500 ease hover:text-red-300 h-5 "
                    icon={faArrowRight}
                    onClick={() => setIsClicked(false)}
                  ></FontAwesomeIcon>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
