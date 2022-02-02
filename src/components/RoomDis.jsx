import React, { useState } from "react";
import styled from "styled-components";
import HeaderRoom from "./HeaderRoom";
import Message from "./Message";
import MessageSender from "./MessageSender";
import SearchMsg from "./SearchMsg";

const RoomDis = () => {
  return (
    <Wrap>
      <HeaderRoom />
      <MsgWrapper>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <SearchMsg />
      </MsgWrapper>
      <MessageSender />
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
const MsgWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  padding: 1rem 1.5rem;
  overflow-y: auto;
  height: calc(100vh - 15rem);
`;
