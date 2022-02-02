import { Search, Settings } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import GroupCard from "./GroupCard";
import Setting from "./Setting";

const Sidebar = () => {
  const [isShow, setIsShow] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  return (
    <Wrap isShow={isShow}>
      {!showSetting ? (
        <>
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
              onClick={() => setShowSetting(true)}
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
          </SearchWrap>
          <GroupWrapper>
            <GroupCard />
            <GroupCard />
          </GroupWrapper>
        </>
      ) : (
        <Setting setShowSetting={setShowSetting} />
      )}
    </Wrap>
  );
};

export default Sidebar;
const Wrap = styled.div`
  height: 100%;
  width: 20%;
  max-width: 50rem;
  min-width: 25rem;
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
  @media (max-width: 601px) {
    padding-top: 0.5rem;
    position: fixed;
    width: 100%;
    max-width: 100%;
    background-color: rgba(30, 30, 30, 1);
    z-index: 100;
    top: 0;
    transition: all 0.3s ease-in-out;
    left: ${(props) => (props.isShow ? 0 : "-100%")};
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
