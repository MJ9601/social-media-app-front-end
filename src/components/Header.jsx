import { Logout } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedGroup } from "../features/groupSlice";
import { LOGOUT, selectUser } from "../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Wrap>
      <h1>
        Chat<span>A</span>pp
      </h1>
      {user && (
        <Logout
          sx={{
            color: "#eee",
            cursor: "pointer",
            fontSize: "2rem",
            transition: "all .3s ease",
            ":hover": { color: "red" },
          }}
          onClick={() => {
            dispatch(LOGOUT());
            dispatch(setSelectedGroup(null));
          }}
        />
      )}
    </Wrap>
  );
};

export default Header;
const Wrap = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  padding: 0.5rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h1 {
    color: #eee;
    font-weight: 500;
    text-transform: Capitalize;
    letter-spacing: 0.1rem;
    margin-bottom: 0.4rem;
    > span {
      color: green;
    }
  }
`;
