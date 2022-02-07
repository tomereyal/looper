import React, { useState, useEffect, useRef } from "react";
// import "./Slider.module.css";
// import "./Thumb.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  pause,
  play,
  selectIsPlaying,
} from "../play-controllers/playControllersSlice";
import {
  ProgressBarCover,
  Range,
  SliderContainer,
  Thumb,
} from "./styled.components.timeController";
import {
  selectDuration,
  selectPercentage,
  setPercentage,
  setSelectedTime,
} from "./timeControllerSlice";

export default function TimeController() {
  const percentage = useAppSelector(selectPercentage);
  const duration = useAppSelector(selectDuration);
  const isPlaying = useAppSelector(selectIsPlaying);
  const dispatch = useAppDispatch();

  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [isGonnaPlayAfter, setIsGonnaPlayAfter] = useState(false);
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
        onMouseDown={() => {
          dispatch(pause());
          setIsGonnaPlayAfter(isPlaying);
        }}
        onMouseUp={(e: any) => {
          const timeSelected = (duration / 100) * e.target.value;
          dispatch(setSelectedTime(timeSelected));
          if (isGonnaPlayAfter === true) {
            dispatch(play());
          }
          setIsGonnaPlayAfter(false);
        }}
        value={position}
        ref={rangeRef}
        step="0.01"
        onChange={(e: any) => {
          dispatch(setPercentage(e.target.value));
        }}
      />
    </SliderContainer>
  );
}
