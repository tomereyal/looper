import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPercentage } from "../time-controller/timeControllerSlice";
import { loop, selectIsLooped, selectIsPlaying } from "./playControllersSlice";
import { play, pause, stop } from "./playControllersSlice";
export const Container = styled.div`
  padding: 15px 0;
  display: flex;

  justify-content: space-between;
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

interface IPlayControllers {
  play: any;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
}

export default function PlayControllers({
  duration,
  currentTime,
}: IPlayControllers) {
  const isPlaying = useAppSelector(selectIsPlaying);
  const isLooped = useAppSelector(selectIsLooped);
  const dispatch = useAppDispatch();

  function secondsToHms(seconds: number) {
    if (!seconds) return "00m 00s";

    let duration = seconds;
    const hours = duration / 3600;
    duration = duration % 3600;

    const min = duration / 60;
    duration = duration % 60;

    const sec = duration;
    let secString, minString;
    if (sec < 10) {
      secString = `0${sec}`;
    }
    if (min < 10) {
      minString = `0${min}`;
    }
    if (hours > 0) {
      return `${hours}h ${minString}m ${secString}s`;
    } else if (min == 0) {
      return `00m ${secString}s`;
    } else {
      return `${minString}m ${secString}s`;
    }
  }
  const handlePlay = () => {
    dispatch(play());
  };
  const handlePause = () => {
    dispatch(pause());
  };
  const handleStop = () => {
    dispatch(stop());
  };
  const handleLoop = (e: any) => {
    dispatch(loop());
  };

  return (
    <Container>
      {/* <Timer>{secondsToHms(currentTime)}</Timer> */}
      <ButtonContainer>
        {isPlaying ? (
          <PauseButton onClick={handlePause}></PauseButton>
        ) : (
          <PlayButton onClick={handlePlay}></PlayButton>
        )}
        <StopButton onClick={handleStop}></StopButton>
        <LoopButton onClick={handleLoop} isLooped={isLooped}>
          &#8634;
        </LoopButton>
      </ButtonContainer>

      {/* <Timer>{secondsToHms(duration)}</Timer> */}
    </Container>
  );
}
