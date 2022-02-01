import { AttachFile, Mic } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const MessageSender = () => {
  return (
    <Wrap>
      <Form>
        <input type="text" />
        <input type="submit" style={{ display: "none" }} />
      </Form>
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
      <input type="file" id="fileData" style={{ display: "none" }} />
      <IconButton>
        <Mic sx={{ fontSize: "2rem", color: "#eee" }} />
      </IconButton>
    </Wrap>
  );
};

export default MessageSender;
const Wrap = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
  background-color: rgba(50, 50, 50, 1);
  padding: 0.4rem 1.4rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
`;
const Form = styled.form`
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
