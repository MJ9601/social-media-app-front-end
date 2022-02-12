import { ArrowBack, MoreVert, Search, Settings } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLoadCurrentGroup } from "../customeHooks/customeHooks";
import {
  setShowGroupSettingResponsiveTrue,
  setShowSearchMsgTrue,
  setShowSettingGroupTrue,
  setShowSidebarResponsiveTrue,
} from "../features/displaySlice";
import { selectCurrentGroup } from "../features/groupSlice";
import { setGroupMsgs } from "../features/messageSlice";
import { selectUser } from "../features/userSlice";

const HeaderRoom = () => {
  useLoadCurrentGroup();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentGroup = useSelector(selectCurrentGroup);
  const [group, setGroup] = useState(currentGroup);

  useEffect(() => {
    if (currentGroup?.isPrivate) {
      setGroup(
        currentGroup.members.filter((member) => member._id != user._id)[0]
      );
    } else setGroup(currentGroup);
  });
  return (
    <Wrap>
      <ArrowBack
        className="setting-icon"
        onClick={() => dispatch(setShowSidebarResponsiveTrue())}
      />
      <div>
        <Avatar src={group?.imgUrl}>
          {!currentGroup?.isPrivate && currentGroup?.name[0]}
        </Avatar>
        <div>
          <h1>
            {currentGroup?.isPrivate ? group?.fullName : currentGroup?.name}
          </h1>
          <p>{currentGroup?.isPrivate ? "" : currentGroup?.members.length}</p>
        </div>
      </div>
      <div>
        <IconButton
          onClick={() => {
            dispatch(setShowSearchMsgTrue());
            dispatch(setGroupMsgs(currentGroup?.messages));
          }}
        >
          <Search sx={{ fontSize: "2rem" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(setShowSettingGroupTrue());
            dispatch(setShowGroupSettingResponsiveTrue());
          }}
        >
          <Settings sx={{ fontSize: "2rem" }} />
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
    position: relative;
    display: flex;
    gap: 1.3rem;
    > div {
      margin-top: -0.2rem;
      > h1 {
        font-weight: 500;
        width: 12rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
