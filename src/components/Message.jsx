import { Reply } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const Message = () => {
  const [isUser, setIsUser] = useState(false);
  return (
    <Wrap>
      <Container isUser={isUser}>
        <IconButton>
          <Reply />
        </IconButton>
        <ContentWrap>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          dolore?
        </ContentWrap>
      </Container>
    </Wrap>
  );
};

export default Message;
const Wrap = styled.div`
  position: relative;
  margin-bottom: 0.8rem;
  width: 100%;
  overflow: hidden;
  padding: 0 2rem;
  border: 0.1rem solid #eee;
`;
const Container = styled.div`
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  right: ${(props) => props.isUser && "2rem"};
  left: ${(props) => !props.isUser && "2rem"};
  background-color: red;
`;
const ContentWrap = styled.div``;
