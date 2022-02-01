import { MoreVert } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const GroupCard = () => {
  return (
    <Wrap>
      <Avatar src="" sx={{ bgcolor: "orange" }}>
        u
      </Avatar>
      <h1>username</h1>
    </Wrap>
  );
};

export default GroupCard;
const Wrap = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  border-radius: 3rem;
  margin: 0.2rem 0;
  gap: 1.3rem;
  transition: all 0.4s ease-in-out;
  > h1 {
    margin-top: -0.5rem;
    font-weight: 400;
    color: #eee;
  }
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;
