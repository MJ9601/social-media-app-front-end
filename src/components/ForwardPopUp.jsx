import { Search } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import GroupCard from "./GroupCard";

const ForwardPopUp = () => {
  return (
    <Wrap>
      <Container>
        <h1>Forward to: </h1>
        <SearchWrap>
          <input type="text" placeholder="Search ..." />
          <Search sx={{ color: "#eee" }} />
        </SearchWrap>
        <DisplayWrap>
          <GroupCard />
        </DisplayWrap>
      </Container>
    </Wrap>
  );
};

export default ForwardPopUp;
const Wrap = styled.div`
  position: absolute;
  top: 15vh;
  width: 100%;
`;
const Container = styled.div`
  background-color: #111;
  padding: 2rem 1rem;
  text-align: start;
  margin: 0 auto;
  border-radius: 0.8rem;
  width: 30rem;
  > h1 {
    margin-left: 1.4rem;
    color: #eee;
    font-weight: 500;
    font-size: 1.7rem;
  }
`;
const SearchWrap = styled.div`
  margin: 1.4rem 0.3rem;
  border: 0.1rem solid #000;
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
  height: 50vh;
  overflow-y: auto;
`;
