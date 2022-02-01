import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrap>
      <h1>
        Chat<span>A</span>pp
      </h1>
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
  > h1 {
    color: #eee;
    font-weight: 500;
    text-transform: Capitalize;
    letter-spacing: 0.1rem;
    > span {
      color: green;
    }
  }
`;
