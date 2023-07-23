import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignInUser";
import SignUp from "./pages/auth/SignUpUser";
import useAuth from "./context/Auth.context";
import Home from "./pages/app/home"


export default function App() {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/join" element={<SignUp />}></Route>
        </Routes>
      ) : (
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
      )}
    </>
  );
}
