import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLoadCurrentGroup } from "../customeHooks/customeHooks";
import { selectCurrentGroup } from "../features/groupSlice";
import HeaderRoom from "./HeaderRoom";
import Message from "./Message";
import MessageSender from "./MessageSender";
import SearchMsg from "./SearchMsg";

const RoomDis = () => {
  useLoadCurrentGroup();
  const currentGroup = useSelector(selectCurrentGroup);
  return (
    <Wrap>
      {currentGroup ? (
        <>
          <HeaderRoom />
          <Container>
            <MsgWrapper>
              <MsgContainer>
                {currentGroup?.messages.map((message) => (
                  <Message key={message?._id} message={message} />
                ))}
              </MsgContainer>
            </MsgWrapper>
            <SearchMsg />
          </Container>
          <MessageSender />
        </>
      ) : (
        <DisHead>
          <h1>
            Chat<span>A</span>pp
          </h1>
        </DisHead>
      )}
    </Wrap>
  );
};

export default RoomDis;
const Wrap = styled.div`
  width: 78%;
  margin: 0 auto;
  height: 100%;
  position: relative;
  @media (max-width: 610px) {
    width: 100%;
  }
`;
const Container = styled.div`
  height: calc(100vh - 15rem);
  position: relative;
  overflow: hidden;
`;
const MsgWrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
  padding: 1rem 1.5rem;
  overflow-y: auto;
  height: 100%;
`;
const MsgContainer = styled.div`
  display: table-cell;
  vertical-align: bottom;
  width: 100vw;
  height: calc(100vh - 17rem);
`;
const DisHead = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  > h1 {
    font-size: 7rem;
    font-weight: 500;
    color: #eee;
    > span {
      color: green;
    }
  }
`;
