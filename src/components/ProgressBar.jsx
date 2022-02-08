import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import styled from "styled-components";
import { useStorage } from "../customeHooks/useStorage";
import {
  setShowSettingGroupFalse,
  setShowSettingGroupTrue,
  ToggleCreateGroup,
} from "../features/displaySlice";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { LOGIN, selectUser } from "../features/userSlice";
import {
  createGroupFunc,
  createMsgFunc,
  updateGroupSettingFunc,
  updateProfileFunc,
} from "../requestAxios";

const ProgressBar = ({ file, action, setActive, setFile, formData }) => {
  const { url, progress } = useStorage(file);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectCurrentGroup);

  useEffect(() => {
    const completedUpload = async () => {
      if (progress == 100) {
        setActive(false);
        setFile(null);
        if (action == "updateUser") {
          const resp = await updateProfileFunc(user._id, formData, url);
          resp.status == 200 && dispatch(LOGIN(resp.data));
        }
        if (action == "createGroup") {
          const resp = await createGroupFunc(user._id, formData, url);
          console.log(resp);
          if (resp.status == 201) {
            dispatch(setSelectedGroup(resp.data));
          }
          dispatch(ToggleCreateGroup());
        }
        if (action == "updateGroup") {
          const resp = await updateGroupSettingFunc(
            selectedGroup._id,
            user._id,
            formData,
            url
          );
          if (resp.status == 200) {
            dispatch(setSelectedGroup(resp.data));
            dispatch(setShowSettingGroupTrue());
          }
        }
        if (action == "createMsg") {
          console.log(file);
          const resp = await createMsgFunc(
            user._id,
            selectedGroup._id,
            formData.msgText,
            url,
            file.type.split("/")[0],
            formData.onReplyTo
          );
          if (resp.status == 200) {
            formData.setMsgText("");
            dispatch(setSelectedGroup(resp.data));
          }
        }
      }
    };
    completedUpload();
  }, [url]);
  return (
    <Wrap progress={progress}>
      <div></div>
    </Wrap>
  );
};

export default ProgressBar;
const Wrap = styled.div`
  width: 80%;
  margin: 0.6rem auto;
  height: 0.2rem;
  background-color: #eee;
  > div {
    width: ${(props) => props.progress}%;
    background-color: var(--primary);
    height: 100%;
  }
`;
