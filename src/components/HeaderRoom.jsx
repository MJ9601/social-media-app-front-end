import { ArrowBack, MoreVert, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const HeaderRoom = ({}) => {
  const [showOp, setShowOp] = useState(false);
  return (
    <Wrap>
      <ArrowBack className="setting-icon" />
      <div>
        <Avatar src="">U</Avatar>
        <div>
          <h1>username</h1>
          <p>last seen at ...</p>
        </div>
      </div>
      <div>
        <IconButton>
          <Search sx={{ fontSize: "2rem" }} />
        </IconButton>
        <IconButton onClick={() => setShowOp(true)}>
          <MoreVert sx={{ fontSize: "2rem" }} />
        </IconButton>
        {showOp && <OpWrap>Delete</OpWrap>}
      </div>
    </Wrap>
  );
};

export default HeaderRoom;
const Wrap = styled.div`
  width: 100%;
  background-color: rgba(150, 150, 150, 0.7);
  padding: 0.7rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.4rem;
  > div {
    position: relative;
    display: flex;
    gap: 1.3rem;
    > div {
      margin-top: -0.2rem;
      > h1 {
        font-weight: 500;
      }
      > p {
        font-size: 1.2rem;
      }
    }
  }
`;
const OpWrap = styled.div`
  position: absolute;
  top: 5rem;
  right: 4rem;
  background-color: #888;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  z-index: 101;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: green;
  }
`;
