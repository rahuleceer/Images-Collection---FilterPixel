import React from "react";
import "./signbg.css";
import {
  Container,
  Grid,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/Auth.context";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const { user, userset } = useAuth();

  const [password, setPassword] = React.useState("");

  return (
    <div className="bg">
      <div className="nav">
        <span>
          <h1>FilterPixel</h1>
        </span>
        <span className="fields">
          <span><button onClick={ ()=> navigate('/join') }>SignUp</button></span>
        </span>
      </div>
      <br /><br /><br />
      <Container>
        <Grid
          style={{
            marginTop: "20px",
            alignItems: "center",
          }}
          grow
          gutter="xl"
        >
          <Grid.Col span={3}></Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              radius="lg"
              size="md"
              required
              type="email"
            />
          </Grid.Col>
          <Grid.Col span={3}></Grid.Col>
          <Grid.Col span={3}></Grid.Col>
          <Grid.Col md={4}>
            <PasswordInput
              placeholder="Password"
              variant="filled"
              radius="lg"
              size="md"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={3}></Grid.Col>
          <Grid.Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="subtle"
              color="grape"
              radius="lg"
              size="md"
              onClick={async () => {
                axios
                  .post("http://localhost:3003/api/v1/auth/signin", {
                    email,
                    password,
                  })
                  .then(function (response) {
                    const data = response.data;
                    const Name = data.user.Name;
                    const email = data.user.email;
                    const phone = data.user.phone;
                    const token = data.token;
                    const Userdata = {
                      Name,
                      email,
                      phone,
                      isRest: false,
                      token,
                    };
                    userset(Userdata);
                    localStorage.setItem("User", JSON.stringify(Userdata));
                    let dt = +new Date();
                    localStorage.setItem("Time", JSON.stringify(dt));
                  })
                  .catch(function (e) {
                    console.log(e);
                  });
                console.log(user);
                navigate("/");
              }}
            >
              Sign In
            </Button>
            <br />
            <h5>-------  OR  -------</h5>
            <br />
            <Button
              variant="subtle"
              color="grape"
              radius="lg"
              size="md"
              onClick={useGoogleLogin({
                onSuccess: (response) => {
                  console.log(response);
                  userset(response);
                },
                onError: (error) => {
                  console.log("Login Failed ", error);
                },
              })}
            >
              Google Login
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
