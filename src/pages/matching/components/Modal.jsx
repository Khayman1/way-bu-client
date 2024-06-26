import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MatchingWrite from './MatchingWrite';
import { ModalWrapper, ModalContent, CloseButton } from "./MatchingLayout";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../atom";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--gap-base);
`
const Button = styled.button`
  cursor: pointer;
  border: none;
  min-width: 170px;
  padding: var(--padding-base) var(--padding-9xs);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-navy);
    box-sizing: border-box;
  }

  @media screen and (max-width: 376px) {
    min-width: 150px;
    padding: var(--padding-3xs);
  }
`;

const Div = styled.div`
  position: relative;
  font-size: var(--font-size-ml);
  line-height: 20px;
  font-family: inherit;
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;

  @media screen and (max-width: 376px) {
    font-size: var(--font-size-m);
  }
`;

const StyledLink = styled(Link)`
  color: white;
  cursor: pointer;
`


const Modal = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if (!loggedInUser) {
      window.location.href = "/login";
      return;
    }
    setIsOpen(true);
  }
  const closeModal = () => setIsOpen(false);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <ButtonWrapper>
        <Button><StyledLink to = {"/mypage/matching"}><Div>내 매칭 보러가기</Div></StyledLink></Button>
        <Button onClick={(openModal)}><Div>매칭 만들기</Div></Button>
      </ButtonWrapper>
      
      {isOpen && (
        <ModalWrapper onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <MatchingWrite closeModal={closeModal}/>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
