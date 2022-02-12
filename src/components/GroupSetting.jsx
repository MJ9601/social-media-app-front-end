import { ArrowForward, AttachFile, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  useLoadAllUsers,
  useLoadCurrentGroup,
} from "../customeHooks/customeHooks";
import {
  selectShowGroupSettingResponsive,
  setShowGroupSettingResponsiveFalse,
  setShowSettingGroupFalse,
  setShowSettingGroupTrue,
} from "../features/displaySlice";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { selectAllUsers, selectUser } from "../features/userSlice";
import { leavingGroupFunc, updateGroupSettingFunc } from "../requestAxios";
import { Button, ButtonDel } from "./Buttons";
import GroupCard from "./GroupCard";
import ProgressBar from "./ProgressBar";
import UserCard from "./UserCard";

const GroupSetting = () => {
  const dispatch = useDispatch();
  useLoadCurrentGroup();
  useLoadAllUsers();
  const allUsers = useSelector(selectAllUsers);
  const selectedGroup = useSelector(selectCurrentGroup);
  const [groupName, setGroupName] = useState("");
  const [active, setActive] = useState(false);
  const [file, setFile] = useState(null);
  const acceptTypes = ["image/png", "image/jpg", "image/jpeg"];
  const user = useSelector(selectUser);
  const isAdmin = selectedGroup?.admin == user?._id ? true : false;
  const [results, setResults] = useState([]);
  const [searchWords, setSearchWords] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const showResponsive = useSelector(selectShowGroupSettingResponsive);

  const handleSearch = (e) => {
    setSearchWords(e.target.value);
    // console.log(e.target.value);
    if (e.target.value.length > 2) {
      setSearchActive(true);
      e.target.value[0] == "@"
        ? setResults(
            allUsers.filter((user) => user?.customeId?.includes(e.target.value))
          )
        : setResults(
            allUsers.filter((user) => user?.fullName.includes(e.target.value))
          );
    } else if (e.target.value.length < 2) {
      setResults([]);
      setSearchActive(false);
    }
  };

  const leavingGroup = async () => {
    const resp = await leavingGroupFunc(user._id, selectedGroup._id);
    resp.status == 200 && dispatch(setSelectedGroup(null));
  };

  const updateFunc = async () => {
    if (groupName != "") {
      if (file && acceptTypes.includes(file.type)) setActive(true);
      else {
        const resp = await updateGroupSettingFunc(
          selectedGroup._id,
          user._id,
          groupName,
          ""
        );
        if (resp.status == 200) {
          dispatch(setSelectedGroup(resp.data));
          dispatch(setShowSettingGroupTrue());
        }
      }
    }
  };
  return (
    <Wrapper isShow={showResponsive}>
      <Wrap>
        <div>
          <Avatar src={selectedGroup?.imgUrl}>{selectedGroup?.name[0]}</Avatar>
          <div>
            <h1>
              {!selectedGroup?.isPrivate ? selectedGroup?.name : "Private Chat"}
            </h1>
            <p>{selectedGroup?.members.length}</p>
          </div>
        </div>
        <ArrowForward
          sx={{ color: "#eee", fontSize: "2rem", cursor: "pointer" }}
          onClick={() => {
            dispatch(setShowSettingGroupFalse());
            dispatch(setShowGroupSettingResponsiveFalse());
          }}
        />
      </Wrap>
      <Container>
        <H4 onClick={leavingGroup}>Leave</H4>
        <h1>Members</h1>
        <DisplayWrap>
          {selectedGroup?.members.map((member) => (
            <UserCard key={member._id} status="groupMember" userInfo={member} />
          ))}
        </DisplayWrap>
      </Container>
      {isAdmin && (
        <>
          <Container>
            <h1>Add Member</h1>
            <SearchWrap>
              <input
                type="text"
                placeholder="Search ..."
                value={searchWords}
                onChange={handleSearch}
              />
              <Search sx={{ color: "#eee" }} />
            </SearchWrap>
          </Container>
          {searchActive && (
            <DisplayWrap>
              {results.map(
                (member) =>
                  member?._id != user?._id && (
                    <UserCard
                      key={member._id}
                      status="groupSearch"
                      userInfo={member}
                    />
                  )
              )}
            </DisplayWrap>
          )}
          <Container>
            <h1>Setting</h1>
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
                  action="updateGroup"
                  setActive={setActive}
                  formData={groupName}
                />
              )}

              <Button_ onClick={updateFunc}>Update</Button_>
            </FormWrap>
            <ButtonWrap>
              <ButtonDel text="Delete" status="delGroup" />
            </ButtonWrap>
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default GroupSetting;
const Wrapper = styled.div`
  height: calc(100vh - 4.5rem);
  width: 20%;
  overflow-y: auto;
  max-width: 50rem;
  min-width: 25rem;
  padding: 0 1.5rem;
  position: relative;
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 0.1rem;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #eee, transparent);
  }
  @media (max-width: 601px) {
    padding-top: 0.5rem;
    position: fixed;
    width: 100%;
    max-width: 100%;
    background-color: rgba(30, 30, 30, 1);
    z-index: 100;
    top: 0;
    transition: all 0.3s ease-in-out;
    left: ${(props) => (props.isShow ? 0 : "-100%")};
  }
`;
const Wrap = styled.div`
  z-index: 100;
  position: sticky;
  background-color: rgb(25, 25, 25);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    > label {
      cursor: pointer;
    }
    display: flex;
    gap: 1.5rem;
    > div {
      color: #eee;
      > h1 {
        font-weight: 500;
      }
      > p {
        font-size: 1.1rem;
      }
    }
  }
`;
const SearchWrap = styled.div`
  margin: 1.4rem 0.3rem;
  border: 0.1rem solid #111;
  border-radius: 3rem;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > input {
    background-color: transparent;
    color: #fff;
    width: 85%;
    border: none;
    padding: 0.4rem;
    margin-left: 0.3rem;
    &:focus {
      outline: none;
    }
  }
`;
const DisplayWrap = styled.div`
  width: 100%;
  height: 21rem;
  overflow-y: auto;
`;
const Container = styled.div`
  > h1 {
    color: #eee;
    margin-top: 2.5rem;
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding: 2rem 1rem 0 1rem;
  margin-top: 2rem;
`;
const InputWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 1.5rem;
  > div {
    display: flex;
    flex-direction: column;
    > label {
      font-size: 1.5rem;
      margin-left: 1.3rem;
      padding-bottom: 0.3rem;
      color: #eee;
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

const ButtonWrap = styled.div`
  margin-top: 2rem;
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
const H4 = styled.h3`
  text-align: end;
  width: fit-content;
  margin-left: auto;
  padding: 0.3rem 1rem;
  margin-top: 1.4rem;
  font-size: 1.3rem;
  color: #eee;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: red;
  }
`;
