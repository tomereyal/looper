import React, { useState, useEffect, useRef } from "react";
// import "./Slider.module.css";
// import "./Thumb.module.css";
import styled from "styled-components";

const PROGRESS_BAR_HEIGHT = "4px";
const THUMB_WIDTH = "20px";
const THUMB_HEIGHT = "20px";

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
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
  height: ${THUMB_HEIGHT};

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
  z-index: 3;
  background: rgb(255, 255, 255);
  position: absolute;
  left: ${({ position }) => position + "%"};
  margin-left: ${({ marginLeft }) => marginLeft + "px"};
  border-radius: 50%;
  top: 50%;
  transform: translate(0%, -50%);
  pointer-events: none; /* Remove pointer events on thumb so user can click on the actual thumb beaneath it!  */
  user-select: none; /*  Prevent Accidentally highlighting the number while sliding the cursor  */
`;

interface ISlider {
  percentage?: number;
  onChange?: any;
}

export default function Slider({ percentage = 0, onChange }: ISlider) {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const rangeRef = useRef() as React.RefObject<HTMLInputElement>;
  const thumbRef = useRef() as React.RefObject<HTMLInputElement>;
  useEffect(() => {
    const rangeWidth = rangeRef.current?.getBoundingClientRect().width || 0;
    const thumbWidth = thumbRef.current?.getBoundingClientRect().width || 0;
    const centerCursor = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerCursor);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  return (
    <SliderContainer>
      <ProgressBarCover progressBarWidth={progressBarWidth}></ProgressBarCover>
      <Thumb ref={thumbRef} position={position} marginLeft={marginLeft}></Thumb>
      <Range
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        onChange={onChange}
      />
    </SliderContainer>
  );
}
