import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSettingGroupFalse,
  ToggleCreateGroup,
  ToggleDelGroup,
  ToggleDelUser,
} from "../features/displaySlice";
import { delGroupFunc, delUserFunc } from "../requestAxios";
import { LOGOUT, selectUser } from "../features/userSlice";
import { setSelectedGroup } from "../features/groupSlice";

export const Button = ({ text, status, action, payload }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (status == "cancelCreateGroup") dispatch(ToggleCreateGroup());
    else if (status == "cancelDelGroup") dispatch(ToggleDelGroup());
    else dispatch(ToggleDelUser());
  };
  return <Button_ onClick={handleClick}>{text}</Button_>;
};

export const ButtonDel = ({ text, status, action, payload, setPayload }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleDelClick = async () => {
    if (status == "delUser") dispatch(ToggleDelUser());
    else if (status == "delGroup") dispatch(ToggleDelGroup());
    else dispatch(ToggleCreateGroup());

    if (action == "deleteUser" && payload != "") {
      // console.log(payload);
      const resp = await delUserFunc(user._id, payload);
      resp.status == 200 && dispatch(LOGOUT());
      dispatch(ToggleDelUser());
      setPayload("");
    }
    if (action == "deleteGroup") {
      const resp = await delGroupFunc(user._id, payload);
      if (resp.status == 200) {
        dispatch(setSelectedGroup(null));
        dispatch(setShowSettingGroupFalse());
      }
    }
  };
  return <ButtonDel_ onClick={handleDelClick}>{text}</ButtonDel_>;
};

const Button_ = styled.button`
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  margin-bottom: 1rem;
  border-radius: 3rem;
  font-size: 1.4rem;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:focus,
  &:hover {
    outline: none;
    background-color: green;
    color: #fff;
  }
`;
const ButtonDel_ = styled(Button_)`
  background-color: rgb(255, 0, 0);
  color: #eee;
  &:focus,
  &:hover {
    background-color: #eee;
    outline: 0.3rem solid rgb(255, 0, 0);
    color: rgb(255, 0, 0);
  }
`;
