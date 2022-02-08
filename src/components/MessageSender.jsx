import { AttachFile, Mic } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLoadCurrentGroup } from "../customeHooks/customeHooks";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { selectUser } from "../features/userSlice";
import { createMsgFunc } from "../requestAxios";
import ProgressBar from "./ProgressBar";

const MessageSender = () => {
  const [active, setActive] = useState(false);
  const [file, setFile] = useState(null);
  const [msgText, setMsgText] = useState("");
  const user = useSelector(selectUser);
  const currentGroup = useSelector(selectCurrentGroup);
  const dispatch = useDispatch();
  const sendMsgFunc = async (e) => {
    e.preventDefault();
    console.log("0000");
    if (file) setActive(true);
    else {
      const resp = await createMsgFunc(
        user._id,
        currentGroup._id,
        msgText,
        "",
        "",
        ""
      );
      if (resp.status == 200) {
        setMsgText("");
        dispatch(setSelectedGroup(resp.data));
      }
    }
  };
  return (
    <Wrapper>
      {active && (
        <ProgressBar
          file={file}
          setFile={setFile}
          action="createMsg"
          setActive={setActive}
          formData={{ msgText: msgText, onReplyTo: "", setMsgText: setMsgText }}
        />
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
