import { Close, Search } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import GroupCard from "./GroupCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowForwardWin,
  setShowForwardWinFalse,
} from "../features/displaySlice";
import { selectUser } from "../features/userSlice";
import { setCurrentMsg } from "../features/messageSlice";

const ForwardPopUp = () => {
  const showForwardWin = useSelector(selectShowForwardWin);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      {showForwardWin && (
        <Wrap>
          <Container>
            <h1>
              <span>Forward to: </span>
              <Close
                sx={{
                  fontSize: "2rem",
                  transition: "all .3s ease",
                  cursor: "pointer",
                  ":hover": { color: "red" },
                }}
                onClick={() => {
                  dispatch(setShowForwardWinFalse());
                  dispatch(setCurrentMsg(null));
                }}
              />
            </h1>
            <DisplayWrap>
              {user?.groups.map((group) => (
                <GroupCard key={group._id} groupInfo={group} status="forward" />
              ))}
            </DisplayWrap>
          </Container>
        </Wrap>
      )}
    </>
  );
};

export default ForwardPopUp;
const Wrap = styled.div`
  position: absolute;
  top: 15vh;
  width: 100%;
`;
const Container = styled.div`
  background-color: #111;
  padding: 2rem 1rem;
  text-align: start;
  margin: 0 auto;
  border-radius: 0.8rem;
  width: 30rem;
  > h1 {
    padding: 0 1.4rem;
    color: #eee;
    font-weight: 500;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
`;
const DisplayWrap = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 50vh;
  overflow-y: auto;
`;
