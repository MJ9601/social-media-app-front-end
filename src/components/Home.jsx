import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLoadAllUsers } from "../customeHooks/customeHooks";
import { selectShowSettingGroup } from "../features/displaySlice";
import CreateGroupPopUp from "./CreateGroupPopUp";
import DeleteGroupPopUp from "./DeleteGroupPopUp";
import DeletePopUp from "./DeletePopUp";
import ForwardPopUp from "./ForwardPopUp";
import GroupSetting from "./GroupSetting";
import RoomDis from "./RoomDis";
import Sidebar from "./Sidebar";

const Home = () => {
  const showSettingGroup = useSelector(selectShowSettingGroup);

  return (
    <Wrap>
      {!showSettingGroup ? <Sidebar /> : <GroupSetting />}
      <RoomDis />
      <DeletePopUp />
      <CreateGroupPopUp />
      <DeleteGroupPopUp />
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
