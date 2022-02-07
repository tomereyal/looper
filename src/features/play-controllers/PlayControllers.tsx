import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loop,
  selectIsDone,
  selectIsLooped,
  selectIsPaused,
  selectIsPlaying,
} from "./playControllersSlice";
import { play, pause, stop } from "./playControllersSlice";
import {
  ButtonContainer,
  Container,
  InnerContainer,
  LoopButton,
  PauseButton,
  PlayButton,
  StopButton,
} from "./styled.components.playControllers";
import ReactTooltip from "react-tooltip";

export default function PlayControllers() {
  const isPlaying = useAppSelector(selectIsPlaying);
  const isLooped = useAppSelector(selectIsLooped);
  const isDone = useAppSelector(selectIsDone);
  const dispatch = useAppDispatch();

  const handlePlay = () => {
    dispatch(play());
  };
  const handlePause = () => {
    dispatch(pause());
  };
  const handleStop = () => {
    dispatch(stop());
  };
  const handleLoop = () => {
    dispatch(loop());
  };

  return (
    <Container>
      <ReactTooltip />
      <InnerContainer>
        {isPlaying && !isDone ? (
          <PauseButton data-tip="Pause" onClick={handlePause}></PauseButton>
        ) : (
          <PlayButton data-tip="Play" onClick={handlePlay}></PlayButton>
        )}
        <StopButton data-tip="Stop" onClick={handleStop}></StopButton>
        <LoopButton
          data-tip={isLooped ? "Turn Loop On" : "Turn Off Loop"}
          onClick={handleLoop}
          isLooped={isLooped}
        >
          &#8634;
        </LoopButton>
      </InnerContainer>
    </Container>
  );
}
