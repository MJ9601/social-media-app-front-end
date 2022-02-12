import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setShowSearchMsgFalse } from "../features/displaySlice";
import { selectUser } from "../features/userSlice";

const MsgSearchCard = ({ isSearch, message }) => {
  const user = useSelector(selectUser);
  const isUser = message?.creater?._id == user._id ? true : false;
  const date = new Date(message?.updatedAt);
  const dispatch = useDispatch();

  return (
    <Wrap
      isUser={isUser}
      isSearch={isSearch}
      href={`#${message?._id}`}
      onClick={() => dispatch(setShowSearchMsgFalse())}
    >
      <ContentWrap isUser={isUser} isSearch={isSearch}>
        {message?.fileUrl && (
          <FileWrapper>
            {message?.fileType == "image" && <Img src={message?.fileUrl} />}
            {message?.fileType == "video" && (
              <Video src={message?.fileUrl} controls />
            )}
            {message?.fileType == "audio" && (
              <Audio src={message?.fileUrl} controls />
            )}
          </FileWrapper>
        )}
        <H2>{message?.creater.fullName}</H2>
        <h1>{message?.text}</h1>

        <p>
          {date.toLocaleTimeString()} {date.toLocaleDateString()}
        </p>
      </ContentWrap>
    </Wrap>
  );
};

export default MsgSearchCard;

const Wrap = styled.a`
  margin: 2.5rem 0;
  margin-left: ${(props) =>
    !props.isSearch ? (props.isUser ? "auto" : "1rem") : "1rem"};
  width: fit-content;
  height: fit-content;
  max-width: 80rem;
  display: flex;
  text-decoration: none;
  color: #000;
  cursor: ${(props) => props.isSearch && "pointer"};
`;

const ContentWrap = styled.div`
  position: relative;
  padding: 0.5rem 0rem;
  border-radius: 1rem;
  background-color: ${(props) => (props.isUser ? "var(--primary)" : "#eee")};
  width: 100%;
  position: relative;
  > h1 {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    padding-left: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    padding-right: 3.5rem;
  }
  > p {
    width: 100;
    text-align: end;
    font-size: 1.2rem;
    padding: 0 1rem;
  }
`;
const H2 = styled.h2`
  position: absolute;
  top: -2rem;
  left: 0.4rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-weight: 400;
  font-size: 1.2rem;
  padding-left: 0.3rem;
`;
const FileWrapper = styled.div`
  margin-top: 1rem;
  margin-right: 2rem;
`;

const Img = styled.img`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-left: 1rem;
  margin-right: 1.2rem;
`;
const Video = styled.video`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-left: 1rem;
  margin-right: 1.2rem;
`;
const Audio = styled.audio`
  width: 28rem;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-left: 1rem;
  margin-right: 1.2rem;
  color: var(--primary);
`;
