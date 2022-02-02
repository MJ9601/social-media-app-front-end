import { Avatar } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Setting = ({ setShowSetting }) => {
  return (
    <>
      <Wrap>
        <div>
          <label htmlFor="avatar_img">
            <Avatar src="">name</Avatar>
          </label>
          <input type="file" id="avatar_img" style={{ display: "none" }} />
          <div>
            <h1>username</h1>
            <p>user@email.com</p>
          </div>
        </div>
        <ArrowForward
          sx={{ color: "#eee", fontSize: "2rem", cursor: "pointer" }}
          onClick={() => setShowSetting(false)}
        />
      </Wrap>
      <Form>
        <label htmlFor="">Full name</label>
        <input type="text" />
        <label htmlFor="">New password</label>
        <input type="password" />
        <label htmlFor=""> Password</label>
        <input type="password" />
        <Button>Update Profile</Button>
      </Form>
    </>
  );
};

export default Setting;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    > label {
      cursor: pointer;
    }
    display: flex;
    gap: 1.5rem;
    > div {
      color: #eee;
      > h1 {
        font-weight: 500;
      }
      > p {
        font-size: 1.1rem;
      }
    }
  }
`;
const Form = styled.form`
  width: 100%;
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  color: #eee;
  > label {
    font-size: 1.4rem;
    padding-left: 1.5rem;
    margin-bottom: 0.2rem;
  }
  > input {
    margin-bottom: 1.3rem;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 3rem;
    color: #111;
    transition: all 0.4s ease-in-out;
    &:focus {
      outline: none;
      background-color: green;
    }
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 3rem;
  font-size: 1.4rem;
  transition: all 0.4s ease-in-out;
  &:focus,
  &:hover {
    outline: none;
    background-color: green;
    color: #fff;
  }
`;
