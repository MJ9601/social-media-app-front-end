import { Avatar } from "@mui/material";
import { ArrowForward, AttachFile } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, ButtonDel } from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, selectUser } from "../features/userSlice";
import { updateProfileFunc } from "../requestAxios";
import ProgressBar from "./ProgressBar";

const Setting = ({ setShowSetting }) => {
  const user = useSelector(selectUser);
  const updateFormRef = useRef();
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [file, setFile] = useState(null);
  const [active, setActive] = useState(false);
  const acceptTypes = ["image/png", "image/jpg", "image/jpeg"];
  const dispatch = useDispatch();

  const updateUserProfile = async (e) => {
    e.preventDefault();
    if (!pass) setErr("Password is required!");
    else {
      if (file && acceptTypes.includes(file.type)) {
        setActive(true);
      } else {
        setActive(false);
      }

      if (!file) {
        const resp = await updateProfileFunc(user._id, updateFormRef, "");
        resp.status == 200 && dispatch(LOGIN(resp.data));
      }
    }
  };
  return (
    <>
      <Wrap>
        <div>
          <Avatar src={user?.imgUrl}>{user.fullName[0]}</Avatar>

          <div>
            <h1>{user?.fullName}</h1>
            <p>{user?.customeId}</p>
          </div>
        </div>
        <ArrowForward
          sx={{ color: "#eee", fontSize: "2rem", cursor: "pointer" }}
          onClick={() => setShowSetting(false)}
        />
      </Wrap>
      <Form ref={updateFormRef}>
        <div>
          <div>
            <label htmlFor="">Full name</label>
            <input type="text" name="fullName" />
          </div>
          <div>
            <label htmlFor="avatar_img">
              <AttachFile
                sx={{
                  fontSize: "2rem",
                  color: "#eee",
                  cursor: "pointer",
                  mx: ".5rem",
                  mt: ".8rem",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              type="file"
              id="avatar_img"
              style={{ display: "none" }}
              name="imgFile"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
        {active && (
          <ProgressBar
            file={file}
            setFile={setFile}
            action="updateUser"
            setActive={setActive}
            formData={updateFormRef}
          />
        )}
        <label htmlFor="">Id</label>
        <input type="text" placeholder="@ ..." name="customeId" />
        <label htmlFor="">New password</label>
        <input type="password" name="NewPassword" />
        <label htmlFor=""> Password</label>
        <input
          type="password"
          name="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {err && <h3>{err}</h3>}
        <ButtonSub onClick={updateUserProfile}>Update Profile</ButtonSub>
      </Form>
      <ButtonDel text="Delete Account" status="delUser" />
    </>
  );
};

export default Setting;
const Wrap = styled.div`
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
        font-weight: 600;
        font-size: 1.4rem;
      }
      > p {
        font-size: 1.1rem;
      }
    }
  }
`;
const Form = styled.form`
  width: 100%;
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 25rem);
  color: #eee;
  > h3{
    font-size; 1.4rem;
    color: red;
    font-weight: 500;
    margin-bottom: 1.3rem;
  }
  > label {
    font-size: 1.4rem;
    padding-left: 1.5rem;
    margin-bottom: 0.2rem;
  }
  > input {
    margin-bottom: 1.3rem;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 3rem;
    color: #111;
    transition: all 0.4s ease-in-out;
    &:focus {
      outline: none;
      background-color: green;
      color: #eee;
    }
  }
  > div {
    display: flex;
    align-items: center;
    div {
      > label {
        font-size: 1.4rem;
        padding-left: 1.5rem;
        margin-bottom: 0.2rem;
      }
      > input {
        margin-bottom: 1.3rem;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        border: none;
        border-radius: 3rem;
        color: #111;
        transition: all 0.4s ease-in-out;
        &:focus {
          outline: none;
          background-color: green;
          color: #eee;
        }
      }
    }
  }
`;
const ButtonSub = styled.button`
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
