import React from "react";
import { useState } from "react";
import Post from "./Post";
import PostPostForm from "./PostPostForm";
import { useEffect } from "react";
import axios from "axios";

export default function HomeBody() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const email = userData.email;

  let token = userToken.token;
  let refreshToken = userData.refreshToken;

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const userJwt = parseJwt(token);
  const userId = userJwt.id;
  const admin = userJwt.admin;

  const [postList, setPostList] = useState([]);

  const list = [...postList];

  const auth = axios.create({
    baseURL: "http://localhost:3100/api",
  });

  auth.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    auth.get(`/post`).then(res => {
      setPostList(res.data);
    });
  }, []);

  auth.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalRequest = error.config;
      if (
        error.config.url !== "/auth/access" &&
        error.response.status === 401 &&
        !originalRequest._retry === true
      ) {
        originalRequest._retry = true;
        if (refreshToken && refreshToken !== "") {
          auth.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${userData.refreshToken}`;

          await auth
            .post("/auth/access", { email })
            .then(res => {
              auth.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${res.data.token}`;
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${res.data.token}`;
              sessionStorage.setItem(
                `token`,
                `${JSON.stringify({ token: res.data.token })}`
              );
            })
            .catch(error => {
              console.log(error.response.status);
              refreshToken = null;
            });
          return auth(originalRequest);
        }
      }
    }
  );

  const deletePost = post => {
    const findPost = list.findIndex(x => {
      return x.id === post.id;
    });

    list.splice(findPost, 1);

    setPostList(list);
  };

  const postListByDate = list.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className=" text-neutral-400 font-semibold">
          {" "}
          Bienvenue {userData.firstName} !
        </div>
        <PostPostForm userId={userId} />
      </div>
      <ul>
        {postListByDate !== null
          ? postListByDate.map((postListByDate, index) => {
              return (
                <Post
                  key={index}
                  admin={admin}
                  post={postListByDate}
                  userId={userId}
                  setPost={setPostList}
                  deletePost={deletePost}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
}
