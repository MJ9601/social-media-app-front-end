import { Close, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectShowSearchMsg,
  setShowSearchMsgFalse,
} from "../features/displaySlice";
import Message from "./Message";

const SearchMsg = () => {
  const show = useSelector(selectShowSearchMsg);
  const dispatch = useDispatch();
  return (
    <Wrap isShow={show}>
      <Close
        sx={{
          fontSize: "2rem",
          color: "#eee",
          cursor: "pointer",
          transition: "all .3s ease",
          ":hover": { color: "red" },
        }}
        onClick={() => dispatch(setShowSearchMsgFalse())}
      />
      <SearchWrap>
        <input type="text" placeholder="Search ..." />
        <Search sx={{ color: "#eee" }} />
      </SearchWrap>
      <MsgWrap>
        <Message isSearch={true} />
        <Message isSearch={true} />
        <Message isSearch={true} />
      </MsgWrap>
    </Wrap>
  );
};

export default SearchMsg;
const Wrap = styled.div`
  padding: 1rem;
  position: absolute;
  top: 0;
  right: ${(props) => (props.isShow ? 0 : "-100%")};
  height: 100%;
  width: 30rem;
  background-color: #222;
  transition: all 0.4s ease;
  @media (max-width: 610px) {
    width: 100%;
  }
`;
const SearchWrap = styled.div`
  margin: 1.4rem 0.3rem;
  border: 0.1rem solid #111;
  border-radius: 3rem;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > input {
    background-color: transparent;
    color: #fff;
    width: 85%;
    border: none;
    padding: 0.4rem;
    margin-left: 0.3rem;
    &:focus {
      outline: none;
    }
  }
`;
const MsgWrap = styled.div`
  height: calc(100vh - 25rem);
  width: 100%;
  padding; .6rem;
  overflow-y: auto;
`;
