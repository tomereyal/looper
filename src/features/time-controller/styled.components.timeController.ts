import { CONFIG } from "./../../app-config/index";
import styled from "styled-components";
import tw from "twin.macro";

const PROGRESS_BAR_HEIGHT = "4px";
const THUMB_WIDTH = "2px";
const THUMB_HEIGHT = "20px";

export const SliderContainer = styled.div`
  position: relative;
  z-index: 7;
  width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  //margin-left is important for audio track to align with the slider.
  margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  @media only screen and (min-width: ${CONFIG.screens.md}) {
    width: ${CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
    margin-left: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
  }

  &::before {
    content: "";
    background-color: white;
    width: 99%;
    height: calc((${PROGRESS_BAR_HEIGHT}) - 1px);
    display: block;
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;

export const ProgressBarCover = styled.div<{ progressBarWidth: number }>`
  background-color: rgb(218, 55, 145);
  width: 0%;
  width: ${({ progressBarWidth }) => progressBarWidth + "px"};
  height: ${PROGRESS_BAR_HEIGHT};
  display: block;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  user-select: none;
  pointer-events: none;
`;

export const Range = styled.input`
  -webkit-appearance: none;
  background-color: rgba(240, 9, 9, 0.397);
  height: 10px;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  margin: 0 auto;

  &::-webkit-slider-thumb {
    width: ${THUMB_WIDTH};
    height: ${THUMB_HEIGHT};

    background: #350f2d;
    border: 1px solid #000000;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
  }
`;

export const Thumb = styled.div<{ position: number; marginLeft: number }>`
  width: ${THUMB_WIDTH};
  height: 1200px;

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
  z-index: 2;
  background: rgb(255, 255, 255, 0.3);
  position: absolute;
  left: ${({ position }) => position + "%"};
  margin-left: ${({ marginLeft }) => marginLeft + "px"};
  /* border-radius: 50%; */

  top: 50%;

  /* transform: translate(0%, -50%); */
  pointer-events: none; /* Remove pointer events on thumb so user can click on the actual thumb beaneath it!  */
  user-select: none; /*  Prevent Accidentally highlighting the number while sliding the cursor  */

  &::before {
    content: "";
    background-color: white;
    width: 99%;
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
    /* top: 50%; */
    /* left: 50%;  */
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;
