import React from "react";
import styled from "styled-components";

export const Button = ({ text, action }) => {
  return <Button_>{text}</Button_>;
};
export const ButtonDel = ({ text, action }) => {
  return <ButtonDel_>{text}</ButtonDel_>;
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
