import { ArrowForward, AttachFile, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Button, ButtonDel } from "./Buttons";
import GroupCard from "./GroupCard";

const GroupSetting = () => {
  return (
    <Wrapper>
      <Wrap>
        <div>
          <Avatar src="">name</Avatar>
          <div>
            <h1>name</h1>
            <p>members</p>
          </div>
        </div>
        <ArrowForward
          sx={{ color: "#eee", fontSize: "2rem", cursor: "pointer" }}
          // onClick={() => setShowSetting(false)}
        />
      </Wrap>
      <Container>
        <h1>Members</h1>
        <DisplayWrap>
          <GroupCard />
        </DisplayWrap>
      </Container>
      <Container>
        <h1>Add Member</h1>
        <SearchWrap>
          <input type="text" placeholder="Search ..." />
          <Search sx={{ color: "#eee" }} />
        </SearchWrap>
      </Container>
      <DisplayWrap>
        <GroupCard />
      </DisplayWrap>
      <Container>
        <h1>Setting</h1>
        <FormWrap>
          <InputWrap>
            <div>
              <label htmlFor="">Name</label>
              <input type="text" />
            </div>
            <label htmlFor="groupPic">
              <AttachFile
                sx={{
                  fontSize: "2rem",
                  color: "#eee",
                  cursor: "pointer",
                  mx: ".5rem",
                }}
              />
            </label>
            <input type="file" style={{ display: "none" }} id="groupPic" />
          </InputWrap>

          <Button text="Update" />
        </FormWrap>
        <ButtonWrap>
          <ButtonDel text="Delete" />
        </ButtonWrap>
      </Container>
    </Wrapper>
  );
};

export default GroupSetting;
const Wrapper = styled.div`
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
const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    > label {
      cursor: pointer;
    }
    display: flex;
    gap: 1.5rem;
    > div {
      color: #eee;
      > h1 {
        font-weight: 500;
      }
      > p {
        font-size: 1.1rem;
      }
    }
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
const DisplayWrap = styled.div`
  width: 100%;
  height: 21rem;
  overflow-y: auto;
`;
const Container = styled.div`
  > h1 {
    color: #eee;
    margin-top: 2.5rem;
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding: 2rem 1rem 0 1rem;
  margin-top: 2rem;
`;
const InputWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 1.5rem;
  > div {
    display: flex;
    flex-direction: column;
    > label {
      font-size: 1.5rem;
      margin-left: 1.3rem;
      padding-bottom: 0.3rem;
      color: #eee;
    }
    > input {
      background-color: #eee;
      color: #111;
      width: 100%;
      border: none;
      padding: 0.4rem 1.4rem;
      font-size: 1.5rem;
      border-radius: 3rem;

      &:focus,
      &:hover {
        outline: none;
      }
    }
  }
`;

const ButtonWrap = styled.div`
  margin-top: 2rem;
`;
