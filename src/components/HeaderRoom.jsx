import { MoreVert, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const HeaderRoom = () => {
  return (
    <Wrap>
      <div>
        <Avatar src="">U</Avatar>
        <h1>username</h1>
      </div>
      <div>
        <IconButton>
          <Search sx={{ fontSize: "2rem" }} />
        </IconButton>
        <IconButton>
          <MoreVert sx={{ fontSize: "2rem" }} />
        </IconButton>
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
    display: flex;
    gap: 1.3rem;
    > h1 {
      font-weight: 500;
      margin-top: 0.4rem;
    }
  }
`;
