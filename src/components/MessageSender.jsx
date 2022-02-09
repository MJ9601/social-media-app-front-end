import { AttachFile, Close, Mic } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLoadCurrentGroup } from "../customeHooks/customeHooks";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { selectCurrentMsg, setCurrentMsg } from "../features/messageSlice";
import { selectUser } from "../features/userSlice";
import { createMsgFunc, editMsgFunc } from "../requestAxios";
import ProgressBar from "./ProgressBar";

const MessageSender = () => {
  const currentMsg = useSelector(selectCurrentMsg);
  const [active, setActive] = useState(false);
  const [file, setFile] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [replyMsg, setReplyMsg] = useState(null);
  const user = useSelector(selectUser);
  const currentGroup = useSelector(selectCurrentGroup);
  const dispatch = useDispatch();

  useEffect(() => {
    currentMsg?.action == "edit" && setMsgText(currentMsg?.text);
    currentMsg?.action == "reply" && setReplyMsg(currentMsg);
    console.log(currentMsg);
  }, [currentMsg]);

  const sendMsgFunc = async (e) => {
    e.preventDefault();
    if (currentMsg?.action == "edit") {
      const resp = await editMsgFunc(
        user._id,
        currentMsg._id,
        msgText,
        currentGroup._id
      );
      if (resp.status == 200) {
        setMsgText("");
        dispatch(setSelectedGroup(resp.data));
      }
    } else {
      if (file) setActive(true);
      else {
        const resp = await createMsgFunc(
          user._id,
          currentGroup._id,
          msgText,
          "",
          "",
          !replyMsg ? "" : replyMsg?._id
        );
        if (resp.status == 200) {
          setMsgText("");
          dispatch(setSelectedGroup(resp.data));
        }
      }
    }
    dispatch(setCurrentMsg(null));
    setReplyMsg(null);
  };
  return (
    <Wrapper>
      {active && (
        <ProgressBar
          file={file}
          setFile={setFile}
          action="createMsg"
          setActive={setActive}
          formData={{
            msgText: msgText,
            onReplyTo: !replyMsg ? "" : replyMsg?._id,
            setMsgText: setMsgText,
          }}
        />
      )}
      {replyMsg?.action == "reply" && (
        <ReplyWrap>
          <Close
            sx={{
              position: "absolute",
              right: "2rem",
              top: "1rem",
              fontSize: "1.8rem",
              cursor: "pointer",
              ":hover": {
                color: "red",
              },
            }}
            onClick={() => {
              setReplyMsg(null);
              dispatch(setCurrentMsg(null));
            }}
          />
          <h3>{replyMsg?.creater?.fullName}:</h3>

          <p>{replyMsg?.text}</p>
          {replyMsg?.fileType == "image" && <img src={replyMsg?.fileUrl} />}
          {replyMsg?.fileType == "video" && <video src={replyMsg?.fileUrl} />}
          {replyMsg?.fileType == "audio" && <audio src={replyMsg?.fileUrl} />}
        </ReplyWrap>
      )}
      <Wrap>
        <form action="">
          <Container>
            <input
              type="text"
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
            />
          </Container>
          <label htmlFor="fileData">
            <AttachFile
              sx={{
                fontSize: "2rem",
                color: "#eee",
                cursor: "pointer",
                mx: ".5rem",
              }}
            />
          </label>
          <input
            type="file"
            id="fileData"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="submit"
            style={{ display: "none" }}
            onClick={sendMsgFunc}
          />
          <IconButton>
            <Mic sx={{ fontSize: "2rem", color: "#eee" }} />
          </IconButton>
        </form>
      </Wrap>
    </Wrapper>
  );
};

export default MessageSender;
const Wrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
`;
const Wrap = styled.div`
  width: 100%;
  background-color: rgba(50, 50, 50, 1);
  padding: 0.4rem 1.4rem;
  border-radius: 0.4rem;
  > form {
    display: flex;
    align-items: center;
  }
`;
const Container = styled.div`
  width: 95%;
  border: 0.1rem solid #111;
  border-radius: 3rem;
  padding: 0.4rem 2rem;
  > input {
    width: 100%;
    font-size: 1.5rem;
    padding: 0.5rem 0;
    color: #eee;
    background-color: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;
const ReplyWrap = styled.div`
  width: 100%;
  background-color: #eee;
  padding: 0 2rem;
  position: relative;
  border-top-left-radius: 0.9rem;
  border-top-right-radius: 0.9rem;
  background-color: rgba(50, 50, 50, 1);
  > h3 {
    color: #eee;
    position: absolute;
    top: -2.2rem;
    font-size: 1.4rem;
    font-weight: 500;
  }
  > p {
    color: #eee;
    font-size: 1.3rem;
    padding-top: 1rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > img {
    height: 10rem;
    object-fit: contain;
    border-radius: 0.5rem;
  }
  > video {
    height: 10rem;
    object-fit: contain;
    border-radius: 0.5rem;
  }
  > audio {
    height: 10rem;
    object-fit: contain;
    border-radius: 0.5rem;
  }
`;
