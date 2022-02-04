import React from "react";
import styled from "styled-components";
import { Button, ButtonDel } from "./Buttons";

const DeletePopUp = ({ name }) => {
  return (
    <Wrap>
      <Container>
        <h2>
          You are about to delete <span>{"name"}</span>. The process is
          irreversible.
        </h2>
        <p>Are you sure? </p>
        <div>
          <input type="password" placeholder="Password .." />
          <div>
            <Button text="Cencel" />
            <ButtonDel text="Delete" />
          </div>
        </div>
      </Container>
    </Wrap>
  );
};

export default DeletePopUp;

const Wrap = styled.div`
  position: absolute;
  top: 25vh;
  width: 100%;
`;
const Container = styled.div`
  background-color: #111;
  padding: 2rem 1rem;
  text-align: center;
  margin: 0 auto;
  border-radius: 0.8rem;
  width: 30rem;
  > p,
  h2 {
    font-size: 1.8rem;
    padding-left: 1.5rem;
    margin-bottom: 0.7rem;
    color: #eee;
    text-align: start;
    font-weight: 500;
    > span {
      color: green;
    }
  }
  > p {
    margin-bottom: 2rem;
  }

  > div {
    margin-top: 3rem;
    > input {
      width: 100%;
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
        color: #eee;
      }
    }
    > div {
      display: flex;
      gap: 2rem;
    }
  }
`;
