import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectDelGroup, selectDelUser } from "../features/displaySlice";
import { selectCurrentGroup } from "../features/groupSlice";
import { selectUser } from "../features/userSlice";
import { Button, ButtonDel } from "./Buttons";

const DeleteGroupPopUp = () => {
  const delGroup = useSelector(selectDelGroup);
  const selectedGroup = useSelector(selectCurrentGroup);

  return (
    <>
      {delGroup && (
        <Wrap>
          <Container>
            <h2>
              You are about to delete
              <span> {delGroup && selectedGroup.name}</span> Group. The process
              is irreversible.
            </h2>
            <p>Are you sure? </p>
            <div>
              <div>
                <Button text="Cencel" status="cancelDelGroup" />
                <ButtonDel
                  text="Delete"
                  action="deleteGroup"
                  payload={selectedGroup._id}
                  status="delGroup"
                />
              </div>
            </div>
          </Container>
        </Wrap>
      )}
    </>
  );
};

export default DeleteGroupPopUp;

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
    font-size: 1.4rem;
    padding-left: 1.5rem;
    margin-bottom: 0.7rem;
    color: #eee;
    text-align: start;
    font-weight: 500;
    > span {
      color: green;
      font-size: 1.6rem;
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
