import React from "react";
import styled from "styled-components";
import RoomDis from "./RoomDis";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <Wrap>
      <Sidebar />
      <RoomDis />
    </Wrap>
  );
};

export default Home;
const Wrap = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
`;
