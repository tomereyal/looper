import styled from "styled-components";
import tw from "twin.macro";
import { CONFIG } from "../../app-config";

export const Container = styled.div`
  padding: 15px 0;
  display: flex;
  position: sticky;
  bottom: 0;
  justify-content: space-between;
  width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  //margin-left is important for audio track to align with the slider.
  margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  @media only screen and (min-width: ${CONFIG.screens.md}) {
    width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
    margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
  }

  ${tw`
  w-1/2
  `}
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
  border-color: transparent transparent transparent #ffffff;
  cursor: pointer;
`;
export const PauseButton = styled.div`
  height: 40px;
  width: 30px;
  border-left: 10px solid rgb(255, 255, 255);
  border-right: 10px solid rgb(255, 255, 255);
  cursor: pointer;
`;
export const StopButton = styled.div`
  height: 40px;
  width: 40px;
  margin: 0px 6px 0px auto;

  background-color: white;
  cursor: pointer;
`;

export const LoopButton = styled.div<{ isLooped: boolean }>`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${({ isLooped }) => (isLooped ? "white" : "#555")};
  cursor: pointer;
`;
