import { AttachFile } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectCreateGroup,
  setShowSettingGroupTrue,
  ToggleCreateGroup,
} from "../features/displaySlice";
import { setSelectedGroup } from "../features/groupSlice";
import { LOGIN, selectUser } from "../features/userSlice";
import { createGroupFunc } from "../requestAxios";
import { Button, ButtonDel } from "./Buttons";
import ProgressBar from "./ProgressBar";

const CreateGroupPopUp = () => {
  const [isChannel, setIsChannel] = useState(false);
  const createGroup = useSelector(selectCreateGroup);
  const [groupName, setGroupName] = useState("");
  const [active, setActive] = useState(false);
  const [file, setFile] = useState(null);
  const acceptTypes = ["image/png", "image/jpg", "image/jpeg"];
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const createFunc = async () => {
    if (groupName != "") {
      if (file && acceptTypes.includes(file.type)) setActive(true);
      else {
        const resp = await createGroupFunc(
          user._id,
          [groupName, isChannel, false],
          ""
        );
        if (resp.status == 200) {
          dispatch(setSelectedGroup(resp.data));
          dispatch(setShowSettingGroupTrue());
        }
        dispatch(ToggleCreateGroup());
      }
    }
  };

  return (
    <>
      {createGroup && (
        <Wrap>
          <Container>
            <div>
              <h1>
                Create <span>{!isChannel ? "Group" : "Channel"}</span>
              </h1>
              <RadioDiv
                onClick={() => setIsChannel(!isChannel)}
                isChannel={isChannel}
              >
                <div></div>
              </RadioDiv>
            </div>
            <FormWrap>
              <InputWrap>
                <div>
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <label htmlFor="groupPic">
                  <AttachFile
                    sx={{
                      fontSize: "2rem",
                      color: "#eee",
                      cursor: "pointer",
                      mx: ".5rem",
                    }}
                  />
                </label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="groupPic"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </InputWrap>
              {active && (
                <ProgressBar
                  file={file}
                  setFile={setFile}
                  action="createGroup"
                  setActive={setActive}
                  formData={[groupName, isChannel, false]}
                />
              )}
              <ButtonWrap>
                <ButtonDel text="Cancel" status='cancelCreateGroup' />
                <Button_ onClick={createFunc}>Create</Button_>
              </ButtonWrap>
            </FormWrap>
          </Container>
        </Wrap>
      )}
    </>
  );
};

export default CreateGroupPopUp;

const Wrap = styled.div`
  position: absolute;
  top: 25vh;
  width: 100%;
`;
const Container = styled.div`
  width: 30rem;
  margin: 0 auto;
  background-color: #111;
  padding: 1rem 1rem;
  border-radius: 1rem;
  color: #eee;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h1 {
      font-weight: 500;
      padding-left: 1rem;
      > span {
        color: #3ccb25;
      }
    }
  }
`;

const RadioDiv = styled.div`
  width: 2.7rem;
  height: 1.1rem;
  background-color: #999;
  border-radius: 1rem;
  cursor: pointer;
  position: relative;
  > div {
    transition: all 0.3s ease-in-out;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: #3ccb25;
    position: absolute;
    top: -25%;
    left: ${(props) => (!props.isChannel ? "0%" : "45%")};
  }
`;
const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding: 2rem 1rem 0 1rem;
`;
const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
`;
const InputWrap = styled(ButtonWrap)`
  align-items: flex-end;
  gap: 1.5rem;
  > div {
    display: flex;
    flex-direction: column;
    > label {
      font-size: 1.5rem;
      margin-left: 1.3rem;
      padding-bottom: 0.3rem;
    }
    > input {
      background-color: #eee;
      color: #111;
      width: 100%;
      border: none;
      padding: 0.4rem 1.4rem;
      font-size: 1.5rem;
      border-radius: 3rem;

      &:focus,
      &:hover {
        outline: none;
      }
    }
  }
`;
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
