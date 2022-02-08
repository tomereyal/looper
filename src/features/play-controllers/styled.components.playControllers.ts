import styled from "styled-components";
import tw from "twin.macro";
import { CONFIG } from "../../app-config";

export const Container = styled.div`
  padding: 15px 0;
  display: flex;
  position: sticky;
  bottom: 0;
  z-index: 8;
  background-color: rgba(0, 0, 0, 0.6);
  ${tw`
rounded-b-sm
  `};
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  /* width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  //margin-left is important for audio track to align with the slider.
  margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  @media only screen and (min-width: ${CONFIG.screens.md}) {
    width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
    margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
  } */
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

export const NeomorphicButton: any = styled.div`
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 1rem;
  background: #efeeee;
  border-radius: 50%;
  transition: all 0.3s ease-in;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2),
    -5px -2px 5px rgba(255, 255, 255, 0.6);

  .fas {
    display: grid;
    place-items: center;
    font-size: 1rem;
    color: gray;
  }
  &:active {
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
      inset -5px -2px 5px rgba(0, 0, 0, 0.4);
  }
  &:active .fas {
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const PlayButton = styled(NeomorphicButton)`
  color: green;
  .fas {
    display: grid;
    place-items: center;
    font-size: 1rem;
    color: green;
  }
`;
export const PauseButton = styled(NeomorphicButton)`
  color: #555;
`;
export const StopButton = styled(NeomorphicButton)`
  color: rgb(218, 55, 145);
  .fas {
    color: rgb(218, 55, 145);
  }
`;

export const LoopButton = styled(NeomorphicButton)<{ isLooped: boolean }>`
  transition: all linear 150ms;
  color: ${({ isLooped }) => (isLooped ? "#aa6c39 " : "#555")};
  .fas {
    display: grid;
    place-items: center;
    font-size: 1rem;
    color: ${({ isLooped }) => (isLooped ? "#aa6c39 " : "#555")};
  }
`;
