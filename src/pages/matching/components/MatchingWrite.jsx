import React, { useState } from 'react';
import styled from 'styled-components';
import SportTag from '../../../components/SportTag';

const FrameWrapperRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  gap: var(--gap-base);
  margin: auto;
`;

const Div = styled.div`
  font-size: var(--font-size-s);
  font-weight: bold;
  color: var(--color-blue-main);
  text-align: center;
  height: 45px;
  line-height: 45px;
`;

const Title = styled.input`
  height: 45px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const SportTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  max-width: 100%;
  gap: var(--gap-3xs);
`;

const B3 = styled.b`
  width: 48px;
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: center;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;

const FrameGroup = styled.nav`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: var(--gap-xl);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;

const Schedulebox = styled.input`
  height: 45px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 30%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const NumberInput = styled.input`
  height: 45px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 30%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
`;

const FrameParent1 = styled.div`
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 60%;
  gap: var(--gap-9xs);
`;

const Divbox = styled.div`
  padding: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  background-color: var(--color-blue-vivid);
  width: 70px;
`;

const Textbox = styled.textarea`
  height: 150px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: var(--font-size-m);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  resize: none;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  min-width: 150px;
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-navy);
    box-sizing: border-box;
  }
`;

const DivRoot = styled.div`
  width: 100%;
  box-sizing: border-box;
  gap: var(--gap-base);
  @media screen and (max-width: 675px) {
    gap: var(--gap-mini);
    box-sizing: border-box;
  }
`;

const Div2 = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;

const FrameDiv1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Radio = styled.input`
  &:checked + label {
    color: var(--color-blue-main);
    font-weight: 900;
  }
`;

const RadioLabel = styled.label`
  height: 45px;
  line-height: 45px;
  font-weight: bold;
  color: var(--color-gray);
  cursor: pointer;
  &:hover {
    color: var(--color-blue-main);
  }
`;

const Dropdown = styled.select`
  height: 45px;
  flex: 1;
  border-radius: 5px;
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 60%;
  padding: 0px 20px 0px 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const Necessity = styled.input`
  height: 45px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 30px;
  max-width: 100%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;
const MatchingWrite = () => {
  const [isNecessityRequired, setIsNecessityRequired] = useState(false);

  const handleNecessityChange = (event) => {
    setIsNecessityRequired(event.target.value === '필요');
  };

  return (
    <FrameWrapperRoot>
      <FrameParent1>
        <FrameGroup>
          <FrameDiv>
            <Divbox>제목</Divbox>
            <Title type="text" />
          </FrameDiv>
          <FrameDiv>
            <Divbox>위치</Divbox>
            <SportTagWrapper>
              <SportTag prop="광안리" />
              <SportTag prop="다대포" />
              <SportTag prop="송도" />
              <SportTag prop="송정" />
              <SportTag prop="일광" />
              <SportTag prop="임랑" />
              <SportTag prop="해운대" />
            </SportTagWrapper>
          </FrameDiv>
          <FrameDiv1>
            <FrameDiv>
              <Divbox>종목</Divbox>
              <Dropdown>
                <option value="easy">쉬움</option>
                <option value="nomal">보통</option>
                <option value="difficult">어려움</option>
              </Dropdown>
            </FrameDiv>
            <FrameDiv>
              <Divbox>난이도</Divbox>
              <Radio
                type="radio"
                value="상"
                name="level"
                id="level1"
                style={{ opacity: '0' }}
              />
              <RadioLabel htmlFor="level1">상</RadioLabel>
              <Radio
                type="radio"
                value="중"
                name="level"
                id="level2"
                style={{ opacity: '0' }}
              />
              <RadioLabel htmlFor="level2">중</RadioLabel>
              <Radio
                type="radio"
                value="하"
                name="level"
                id="level3"
                style={{ opacity: '0' }}
              />
              <RadioLabel htmlFor="level3">하</RadioLabel>
            </FrameDiv>
          </FrameDiv1>
          <FrameDiv>
            <Divbox>일정</Divbox>
            <Schedulebox type="date" />
            <Schedulebox type="time" />
          </FrameDiv>
          <FrameDiv>
            <Divbox>인원</Divbox>
            <NumberInput type="number" min={1} max={10} />
            <Div>최대 10명까지 가능합니다.</Div>
          </FrameDiv>
          <FrameDiv>
            <Divbox>준비물</Divbox>
            <Radio
              type="radio"
              value="필요"
              name="necessity"
              id="yes"
              onChange={handleNecessityChange}
            />
            <RadioLabel htmlFor="yes">필요</RadioLabel>
            <Radio
              type="radio"
              value="불필요"
              name="necessity"
              id="no"
              onChange={handleNecessityChange}
            />
            <RadioLabel htmlFor="no">불필요</RadioLabel>
            {isNecessityRequired && <Necessity type="text" placeholder="준비물 입력" />}
          </FrameDiv>
        </FrameGroup>
      </FrameParent1>
      <DivRoot>
        <Textbox />
      </DivRoot>
      <Button>
        <Div2>올리기</Div2>
      </Button>
    </FrameWrapperRoot>
  );
};

export default MatchingWrite;
