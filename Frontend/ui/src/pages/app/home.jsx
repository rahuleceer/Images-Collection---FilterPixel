import React, { useState } from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import S3 from "./s3"
import Cloud from "./cloud"

export default function Home() {
  const { user, signout, isS3, setIsS3 } = useAuth();
  //console.log(user.Name);

  const navigate = useNavigate();

  return (
    <div>
      <div className="nav">
        <span>
          <h1>FilterPixel</h1>
        </span>
        <span className="fields">
          <span>
            <button
              onClick={function (e) {
                setIsS3(1);
                navigate("/");
              }}
            >
              S3
            </button>
          </span>
          <span>
            <button
              onClick={function (e) {
                setIsS3(0);
                navigate("/");
              }}
            >
              Google Drive
            </button>
          </span>
          <span>
            <button
              onClick={function (e) {
                googleLogout();
                signout();
              }}
            >
              logout
            </button>
          </span>
          <span>{user.Name}</span>
        </span>
      </div>
      <br />
        <div>
          { isS3==1 ? <S3 /> : <Cloud />}
        </div>
    </div>
  );
}
