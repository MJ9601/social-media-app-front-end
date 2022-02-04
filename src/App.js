import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  useEffect(() => {}, [user]);
  return (
    <Wrap>
      <Header />
      <Container>{!user ? <Login /> : <Home />}</Container>
    </Wrap>
  );
}

export default App;
const Wrap = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  display: grid;
  place-items: center;
`;
