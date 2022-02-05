import { KeyboardArrowDown, Reply } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const Message = ({ isSearch }) => {
  const [isUser, setIsUser] = useState(false);
  const [showOp, setShowOp] = useState(false);
  return (
    <Wrap isUser={isUser} isSearch={isSearch}>
      <ContentWrap isUser={isUser}>
        {!isSearch && (
          <>
            <KeyboardArrowDown
              sx={{
                position: "absolute",
                top: "0",
                right: "1.5rem",
                fontSize: "2.5rem",
                cursor: "pointer",
              }}
              onClick={() => setShowOp(true)}
            />
            {showOp && (
              <OptionWrapper>
                <h3>Replay</h3>
                {isUser && (
                  <>
                    <h3>Delete</h3>
                    <h3>Edit</h3>
                  </>
                )}
              </OptionWrapper>
            )}
          </>
        )}
        <h2>sender</h2>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          dolore?Lorem ipsum dolor sit amet.
        </h1>
        <p>date</p>
      </ContentWrap>
      {!isSearch && (
        <IconButton sx={{ ml: ".4rem" }}>
          {!isUser && (
            <Reply
              sx={{ transform: "rotateY(180deg)", color: "rgb(150, 150,150)" }}
            />
          )}
        </IconButton>
      )}
    </Wrap>
  );
};

export default Message;
const Wrap = styled.div`
  margin: 2.5rem 0;
  margin-left: ${(props) => (props.isUser ? "auto" : "1rem")};
  width: fit-content;
  height: fit-content;
  max-width: 80rem;
  display: flex;
  cursor: ${(props) => props.isSearch && "pointer"};
`;

const ContentWrap = styled.div`
  position: relative;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  background-color: ${(props) => (props.isUser ? "green" : "#eee")};
  width: 100%;
  > h2 {
    margin-top: -2.3rem;
    color: #fff;
    font-weight: 400;
    font-size: 1.2rem;
  }
  > h1 {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    padding-right: 2.5rem;
  }
  > p {
    width: 100;
    text-align: end;
    font-size: 1.2rem;
  }
`;

const OptionWrapper = styled.div`
  position: absolute;
  background-color: #222;
  right: 5rem;
  top: -1rem;
  width: 7rem;
  border-radius: 0.4rem;
  padding: 0.4rem 0.6rem;
  > h3 {
    cursor: pointer;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    z-index: 100;
    color: #eee;
    font-weight: 400;
    transition: all 0.4s ease;
    &:hover {
      color: green;
    }
  }
`;
