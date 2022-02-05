import { MoreVert } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";

const GroupCard = ({ groupInfo }) => {
  const user = useSelector(selectUser);
  const [group, setGroup] = useState(groupInfo);
  const groupMembers = groupInfo?.members.length;
  // console.log(groupInfo)

  useEffect(() => {
    if (groupInfo?.members.length == 2) {
      setGroup(
        groupInfo?.members.filter((member) => member._id != user._id)[0]
      );
    }
  }, [user]);

  return (
    <Wrap>
      <Avatar src={group?.imgUrl} sx={{ bgcolor: "orange" }}>
        {groupMembers !== 2 ? group?.name[0] : group?.fullName[0]}
      </Avatar>
      <div>
        <h1>{groupMembers !== 2 ? group?.name : group?.fullName}</h1>
        <p>{groupInfo?.messages[groupInfo?.messages.length - 1]?.text}</p>
      </div>
      {groupInfo?.messages.length != 0 && (
        <ShowMsgNum>{groupInfo?.messages.length}</ShowMsgNum>
      )}
    </Wrap>
  );
};

export default GroupCard;
const Wrap = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  border-radius: 3rem;
  margin: 0.4rem 0;
  gap: 1.3rem;
  transition: all 0.4s ease-in-out;
  > div {
    color: #eee;
    > h1 {
      font-weight: 500;
    }
  }
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;
const ShowMsgNum = styled.div`
  position: absolute;
  background-color: blue;
  top: 35%;
  right: 5%;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  text-align: center;
  padding-top: 0.1rem;
  font-size: 1.2rem;
`;
