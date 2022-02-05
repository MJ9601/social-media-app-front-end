import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import styled from "styled-components";
import { useStorage } from "../customeHooks/useStorage";
import { LOGIN, selectUser } from "../features/userSlice";
import { updateProfileFunc } from "../requestAxios";

const ProgressBar = ({
  file,
  isUserProfile,
  setActive,
  setFile,
  updateFormRef,
}) => {
  const { url, progress } = useStorage(file);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const completedUpload = async () => {
      if (progress == 100) {
        setActive(false);
        setFile(null);
        if (isUserProfile) {
          const resp = await updateProfileFunc(user._id, updateFormRef, url);
          dispatch(LOGIN(resp.data));
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
