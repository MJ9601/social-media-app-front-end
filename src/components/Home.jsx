import React from "react";
import styled from "styled-components";
import CreateGroupPopUp from "./CreateGroupPopUp";
import DeletePopUp from "./DeletePopUp";
import ForwardPopUp from "./ForwardPopUp";
import RoomDis from "./RoomDis";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <Wrap>
      <Sidebar />
      <RoomDis />
      {/* <DeletePopUp /> */}
      {/* <CreateGroupPopUp /> */}
      <ForwardPopUp />
    </Wrap>
  );
};

export default Home;
const Wrap = styled.div`
  height: 100%;
  position: relative;
  width: 80%;
  display: flex;
  align-items: center;
  @media (max-width: 1500px) {
    width: 95%;
  }
  @media (max-width: 610px) {
    width: 98%;
  }
`;
