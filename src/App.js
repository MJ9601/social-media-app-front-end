import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <Wrap>
      <Header />
      <Container>
        {/* <Login /> */}
        <Home />
      </Container>
    </Wrap>
  );
}

export default App;
const Wrap = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100vh;
`;
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  display: grid;
  place-items: center;
`;
