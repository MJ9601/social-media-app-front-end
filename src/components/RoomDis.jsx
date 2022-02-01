import React from "react";
import styled from "styled-components";
import HeaderRoom from "./HeaderRoom";
import Message from "./Message";
import MessageSender from "./MessageSender";

const RoomDis = () => {
  return (
    <Wrap>
      <HeaderRoom />
      <MsgWrapper>
        <Message />
        <Message />
        <Message />
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
`;
const MsgWrapper = styled.div`
  width: 70vw;
  overflow-y: auto;
  display: table-cell;
  vertical-align: bottom;
  height: calc(100vh - 15rem);
`;
