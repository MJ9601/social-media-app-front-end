import { KeyboardArrowDown, Reply } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";

const Message = ({ isSearch, message }) => {
  const user = useSelector(selectUser);

  const isUser = message?.creater?._id == user._id ? true : false;
  const [showOp, setShowOp] = useState(false);
  const date = new Date(message?.updatedAt);

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
                <h3>Reply</h3>
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
        {message?.fileUrl && (
          <FileWrapper>
            {message?.fileType == "image" && <Img src={message?.fileUrl} />}
            {message?.fileType == "video" && (
              <Video src={message?.fileUrl} controls />
            )}
            {message?.fileType == "audio" && (
              <Audio src={message?.fileUrl} controls />
            )}
          </FileWrapper>
        )}
        <H2>{message?.creater.fullName}</H2>
        <h1>{message?.text}</h1>

        <p>
          {date.toLocaleTimeString()} {date.toLocaleDateString()}
        </p>
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
  background-color: ${(props) => (props.isUser ? "var(--primary)" : "#eee")};
  width: 100%;
  position: relative;
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
const H2 = styled.h2`
  position: absolute;
  top: -2rem;
  left: 0.4rem;
  width: 100%;
  white-space: nowrap;
  color: #fff;
  font-weight: 400;
  font-size: 1.2rem;
`;
const OptionWrapper = styled.div`
  position: absolute;
  background-color: #222;
  right: 5rem;
  top: -1rem;
  width: 7rem;
  border-radius: 0.4rem;
  padding: 0.4rem 0.6rem;
  z-index: 100;
  > h3 {
    cursor: pointer;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    z-index: 100;
    color: #eee;
    font-weight: 400;
    transition: all 0.4s ease;
    &:hover {
      color: #3ccb25;
    }
  }
`;
const FileWrapper = styled.div`
  margin-top: 1rem;
  margin-right: 2rem;
`;

const Img = styled.img`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
`;
const Video = styled.video`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
`;
const Audio = styled.audio`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
`;
