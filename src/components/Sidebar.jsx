import { Search, Settings } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import GroupCard from "./GroupCard";

const Sidebar = () => {
  return (
    <Wrap>
      <UserInfoWrap>
        <div>
          <Avatar src="">name</Avatar>
          <Info>
            <h1>username</h1>
            <p>user@email.com</p>
          </Info>
        </div>
        <IconButton
          sx={{ ":hover": { backgroundColor: "rgb(200, 200, 200)" } }}
        >
          <Settings
            sx={{
              color: "#eee",
              fontSize: "2rem",
              ":hover": { color: "#000" },
            }}
          />
        </IconButton>
      </UserInfoWrap>
      <SearchWrap>
        <input type="text" placeholder="Search ..." />
        <Search sx={{ color: "#eee" }} />
        <input type="submit" style={{ display: "none" }} />
      </SearchWrap>
      <GroupWrapper>
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </GroupWrapper>
    </Wrap>
  );
};

export default Sidebar;
const Wrap = styled.div`
  height: 100%;
  width: 20%;
  max-width: 50rem;
  padding: 0 1.5rem;
  position: relative;
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 0.1rem;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #eee, transparent);
  }
`;
const UserInfoWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;
const Info = styled.div`
  > h1 {
    font-wieght: 400;
    color: #eee;
  }
  > p {
    font-size: 1.3rem;
    color: #eee;
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
const GroupWrapper = styled.div`
  width: 100%;
  height: calc(100% - 11rem);
  overflow-y: auto;
`;
