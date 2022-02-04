import React, { useRef, useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [isUser, setIsUser] = useState(true);
  const loginRef = useRef();
  const signupRef = useRef();
  const handleSignin = async (e) => {
    e.preventDefault();
    const formInputs = [...loginRef.current.elements].map((element) => ({
      name: element.name,
      value: element.value,
    }));
    console.log(formInputs);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
  };
  return (
    <Wrap>
      <h1>
        Chat<span>A</span>pp
      </h1>
      {isUser ? (
        <Form ref={loginRef}>
          <label htmlFor="">Username</label>
          <input type="text" name="email" />
          <label htmlFor="">Password</label>
          <input type="password" name="password" />
          <Button onClick={handleSignin}>Sign In</Button>
          <ForgetWrap>
            <a href="#">Forget your password?</a>
          </ForgetWrap>
        </Form>
      ) : (
        <Form ref={signupRef}>
          <label htmlFor="">Full name</label>
          <input type="text" name="fullName"/>
          <label htmlFor="">Email</label>
          <input type="email" name="email"/>
          <label htmlFor="">Password</label>
          <input type="password" name="password"/>
          <label htmlFor="">Repeat password</label>
          <input type="password" />
          <Button onClick={handleSignup}>Sign Up</Button>
        </Form>
      )}
      <OrDiv>
        <span>OR</span>
      </OrDiv>
      <SignUpWrap>
        <Button onClick={() => setIsUser(!isUser)}>
          {isUser ? "Sign Up" : "Sign In"}
        </Button>
      </SignUpWrap>
    </Wrap>
  );
};

export default Login;
const Wrap = styled.div`
  width: 35rem;
  background: #888;
  padding: 1rem;
  border-radius: 0.4rem;
  box-shadow: 0.1rem 0.1rem 1.4rem 0.7rem rgba(255, 255, 255, 0.1);
  > h1 {
    color: #eee;
    width: 100%;
    text-align: center;
    font-weight: 500;
    > span {
      color: var(--primary);
    }
  }
`;
const Form = styled.form`
  padding-top: 1rem;
  width: 95%;
  margin: auto;
  display: flex;
  flex-direction: column;
  > label {
    padding-left: 2rem;
    font-size: 1.5rem;
    padding-top: 1rem;
    color: #eee;
    padding-bottom: 0.3rem;
  }
  > input {
    width: 100%;
    padding: 0.7rem 1.5rem;
    border-radius: 3rem;
    border: none;
    font-size: 1.5rem;
    &:focus {
      outline: 0.2rem solid #555;
      border: none;
    }
  }
`;
const ForgetWrap = styled.div`
  margin: 1.3rem 0 0 1.6rem;
  > a {
    color: #eee;
    font-size: 1.5rem;
    text-decoration: none;
    transition: all 0.4s ease;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const OrDiv = styled.div`
  margin: 2rem 0;
  display: flex;
  align-items: center;
  width: 100;
  > span {
    color: #eee;
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0 0.3rem;
  }
  &:before {
    content: "";
    width: 45%;
    height: 0.2rem;
    background: linear-gradient(to right, transparent, #eee);
  }
  &:after {
    content: "";
    width: 45%;
    height: 0.2rem;
    background: linear-gradient(to left, transparent, #eee);
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.6rem;
  margin-bottom: 1.6rem;
  padding: 0.5rem 0;
  border-radius: 3rem;
  border: none;
  padding: 0.5rem 0;
  font-size: 1.7rem;
  font-weight: 600;
  color: rgb(100, 100, 100);
  cursor: pointer;
  box-shadow: 0.1rem 0.1rem 0.4rem 0.1rem rgba(0, 0, 0, 0.8);
  transition: all 0.4s ease-in-out;
  &:hover {
    box-shadow: none;
    color: green;
  }
  &:focus {
    color: green;
    outline: none;
    box-shadow: none;
  }
`;
const SignUpWrap = styled.div`
  width: 95%;
  margin: 0 auto;
`;
