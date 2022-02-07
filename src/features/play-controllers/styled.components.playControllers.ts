import styled from "styled-components";
import tw from "twin.macro";
import { CONFIG } from "../../app-config";

export const Container = styled.div`
  padding: 15px 0;
  display: flex;
  position: sticky;
  bottom: 0;
  z-index: 5;
  ${tw`
bg-black
bg-opacity-60
rounded-b-sm
  `};
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  //margin-left is important for audio track to align with the slider.
  margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  @media only screen and (min-width: ${CONFIG.screens.md}) {
    width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
    margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
  }
`;
export const Timer = styled.div`
  font-size: 10px;
  font-weight: 200;
  color: rgb(196, 196, 196);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  flex-grow: 1;
`;

export const PlayButton = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 0 20px 30px;
  border-color: transparent transparent transparent #3da21c;
  cursor: pointer;
  transition: all linear 150ms;
  filter: brightness(85%);
  filter: brightness(90%);
  border-shadow: 1px 1px 1px white;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);

    filter: brightness(100%);
  }
`;
export const PauseButton = styled.div`
  height: 40px;
  width: 30px;
  border-left: 10px solid white;
  border-right: 10px solid white;
  cursor: pointer;
  transition: all linear 150ms;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);

    filter: brightness(100%);
  }
`;
export const StopButton = styled.a`
  height: 32px;
  width: 32px;
  margin: 0px 16px 0px auto;
  transition: all linear 200ms;
  background-color: rgb(218, 55, 145);
  filter: brightness(85%);
  box-shadow: inset 0px 0px 1px 2px #555;
  cursor: pointer;

  &:hover {
    filter: brightness(94%);
    box-shadow: 0px 0px 2px 2px #3da21c;
  }
  &:active {
    filter: brightness(94%);
    box-shadow: inset 0px 0px 1px 2px #3da21c;
  }
`;

export const LoopButton = styled.a<{ isLooped: boolean }>`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin-right: 10px;
  color: ${({ isLooped }) => (isLooped ? "white" : "#555")};
  cursor: pointer;
  transition: all linear 150ms;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    filter: brightness(100%);
  }
`;
