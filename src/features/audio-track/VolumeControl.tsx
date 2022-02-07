import React, { useState, useEffect, useRef } from "react";
// import "./Slider.module.css";
// import "./Thumb.module.css";
import styled from "styled-components";

const PROGRESS_BAR_HEIGHT = "4px";
const THUMB_WIDTH = "10px";
const THUMB_HEIGHT = "10px";

export const SliderContainer = styled.div`
  position: relative;
  width: 80%;
  //margin-left is important for audio track to align with the slider.
  margin-left: 20%;
  &::before {
    content: "";
    background-color: #555;
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

export const ProgressBarCover = styled.div<{
  progressBarWidth: number;
  isMuted: boolean;
}>`
  background-color: ${({ isMuted }) => (isMuted ? "#555" : "white")};
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

export const Thumb = styled.div<{
  position: number;
  marginLeft: number;
  isMuted: boolean;
}>`
  width: ${THUMB_WIDTH};
  height: ${THUMB_HEIGHT};

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
  z-index: 3;
  background: ${({ isMuted }) => (isMuted ? "#555" : "rgb(255, 255, 255)")};
  position: absolute;
  left: ${({ position, isMuted }) => (isMuted ? 0 : position + "%")};
  margin-left: ${({ marginLeft, isMuted }) =>
    isMuted ? 0 : marginLeft + "px"};
  border-radius: 50%;
  top: 50%;
  transform: translate(0%, -50%);
  pointer-events: none; /* Remove pointer events on thumb so user can click on the actual thumb beaneath it!  */
  user-select: none; /*  Prevent Accidentally highlighting the number while sliding the cursor  */
`;

interface ISlider {
  percentage: number;
  onChange?: any;
  mute?: boolean;
}

export default function VolumeControl({
  percentage,
  onChange,
  mute = false,
}: ISlider) {
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const rangeRef = useRef() as React.RefObject<HTMLInputElement>;
  const thumbRef = useRef() as React.RefObject<HTMLInputElement>;
  useEffect(() => {
    const rangeWidth = rangeRef.current?.getBoundingClientRect().width || 0;
    const thumbWidth = thumbRef.current?.getBoundingClientRect().width || 0;
    const centerCursor = thumbWidth * percentage * -1;
    const centerProgressBar =
      thumbWidth + rangeWidth * percentage - thumbWidth * percentage;
    setMarginLeft(centerCursor);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  return (
    <SliderContainer>
      <ProgressBarCover
        isMuted={mute}
        progressBarWidth={progressBarWidth}
      ></ProgressBarCover>
      <Thumb
        isMuted={mute}
        ref={thumbRef}
        position={percentage * 100}
        marginLeft={marginLeft}
      ></Thumb>
      <Range
        type="range"
        // value={percentage}
        disabled={mute ? true : false}
        defaultValue={percentage}
        ref={rangeRef}
        step="0.025"
        id="volume"
        name="volume"
        // waveSurfer recognize value of `0` same as `1`
        //  so we need to set some zero-ish value for silence
        min="0.01"
        onChange={onChange}
      />
    </SliderContainer>
  );
}
