import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { selectUser } from "../features/userSlice";
import {
  addMemberToGroupFunc,
  removeMemberFromGroupFunc,
  startPrivateChatFunc,
} from "../requestAxios";

const UserCard = ({ status, userInfo }) => {
  const selectedGroup = useSelector(selectCurrentGroup);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useSelector(selectUser);
  const currentGroup = useSelector(selectCurrentGroup);
  const dispatch = useDispatch();

  const addMemberToGroup = async () => {
    const resp = await addMemberToGroupFunc(
      user?._id,
      currentGroup?._id,
      userInfo?._id
    );
    dispatch(setSelectedGroup(resp.data));
  };
  const removeMemberFromGroup = async () => {
    const resp = await removeMemberFromGroupFunc(
      user?._id,
      currentGroup?._id,
      userInfo?._id
    );
    dispatch(setSelectedGroup(resp.data));
  };
  const startPrivateChat = async () => {
    const resp = await startPrivateChatFunc(user?._id, userInfo?._id);
    if (resp.status == 200) dispatch(setSelectedGroup(resp.data));
  };

  useEffect(() => {
    if (userInfo?._id == selectedGroup?.admin) setIsAdmin(true);
  }, []);
  return (
    <Wrap>
      <Avatar src={userInfo?.imgUrl} sx={{ bgcolor: "orange" }}></Avatar>
      <div>
        <h1>{userInfo?.fullName}</h1>
        <p>{userInfo?.customeId}</p>
      </div>
      {!isAdmin && (
        <section>
          {status != "groupSearch" && status != "userSearch" && (
            <Button onClick={removeMemberFromGroup}>Remove</Button>
          )}
          <Button onClick={startPrivateChat}>Start chating</Button>
          {status !== "groupMember" && status != "userSearch" && (
            <Button onClick={addMemberToGroup}>Add </Button>
          )}
        </section>
      )}
    </Wrap>
  );
};

export default UserCard;
const Wrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  border-radius: 3rem;
  margin: 0.4rem 0;
  gap: 1.3rem;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  > div {
    color: #eee;
    > h1 {
      font-weight: 500;
      font-size: 1.5rem;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  > section {
    position: absolute;
    background-color: transparent;
    top: 0;
    right: 0;
    width: 90%;
    height: 100%;
    padding-top: 0.1rem;
    font-size: 1.2rem;
    align-items: center;
    justify-content: end;
    gap: 1.3rem;
    display: none;
    padding: 0 0.5rem;
    transition: all 0.3s ease;
  }
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
    > section {
      display: flex;
    }
  }
`;
const ShowMsgNum = styled.div``;
const Button = styled.button`
  outline: 0.2rem solid #eee;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border-radius: 2rem;
  color: #fff;
  background-color: #111;
  font-size: 1.4rem;
  transition: all 0.3s ease;
  &:hover {
    outline: 0.2rem solid red;
  }
`;
