import { AttachFile } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonDel } from "./Buttons";

const CreateGroupPopUp = () => {
  const [isChannel, setIsChannel] = useState(false);
  return (
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
              <input type="text" />
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
            <input type="file" style={{ display: "none" }} id="groupPic" />
          </InputWrap>
          <ButtonWrap>
            <ButtonDel text="Cancel" />
            <Button text="Create" />
          </ButtonWrap>
        </FormWrap>
      </Container>
    </Wrap>
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
