import { KeyboardArrowDown, Reply } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useCancelCliking } from "../customeHooks/customeHooks";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { setCurrentMsg } from "../features/messageSlice";
import { selectUser } from "../features/userSlice";
import { deleteMsgFunc } from "../requestAxios";

const Message = ({ isSearch, message }) => {
  const user = useSelector(selectUser);
  const boxRef = useRef(null);
  const isClicked = useCancelCliking(boxRef);
  const currentGroup = useSelector(selectCurrentGroup);
  const dispatch = useDispatch();
  const isUser = message?.creater?._id == user._id ? true : false;
  const [showOp, setShowOp] = useState(false);
  const date = new Date(message?.updatedAt);
  useEffect(() => {
    setShowOp(!isClicked && isClicked);
  }, [isClicked]);

  const deleteMsg = async () => {
    const resp = await deleteMsgFunc(user._id, message._id, currentGroup._id);
    if (resp.status == 200) {
      setShowOp(false);
      dispatch(setSelectedGroup(resp.data));
    }
  };

  return (
    <Wrap isUser={isUser} isSearch={isSearch}>
      <ContentWrap isUser={isUser}>
        {!isSearch && (
          <>
            {message.onReplyTo && (
              <ReplyWrap>
                <div>
                  <p>{message.onReplyTo?.text}</p>
                  {message.onReplyTo?.fileType == "image" && (
                    <img src={message.onReplyTo?.fileUrl} />
                  )}
                  {message.onReplyTo?.fileType == "video" && (
                    <video src={message.onReplyTo?.fileUrl} />
                  )}
                  {message.onReplyTo?.fileType == "audio" && (
                    <audio src={message.onReplyTo?.fileUrl} />
                  )}
                </div>
              </ReplyWrap>
            )}
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
              <OptionWrapper ref={boxRef}>
                <h3
                  onClick={() => {
                    dispatch(setCurrentMsg({ ...message, action: "reply" }));
                    setShowOp(false);
                  }}
                >
                  Reply
                </h3>
                {isUser && (
                  <>
                    <h3 onClick={deleteMsg}>Delete</h3>
                    <h3
                      onClick={() => {
                        dispatch(setCurrentMsg({ ...message, action: "edit" }));
                        setShowOp(false);
                      }}
                    >
                      Edit
                    </h3>
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
  padding: 0.5rem 0rem;
  border-radius: 1rem;
  background-color: ${(props) => (props.isUser ? "var(--primary)" : "#eee")};
  width: 100%;
  position: relative;
  > h1 {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    padding-left: 1.4rem;
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
  padding-left: 1.4rem;
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
  margin-left: 1rem;
  margin-right: 1.2rem;
`;
const Video = styled.video`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-left: 1rem;
  margin-right: 1.2rem;
`;
const Audio = styled.audio`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-left: 1rem;
  margin-right: 1.2rem;
  color: var(--primary);
`;
const ReplyWrap = styled.div`
  width: 100%;
  padding: 0;
  > div {
    width: 100%;
    background-color: green;
    padding: 1rem;
    margin-top: 2rem;
    > p {
      font-size: 1.4rem;
      width: 20rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    > img,
    video,
    audio {
      height: 10rem;
      object-fit: contain;
    }
  }
`;
