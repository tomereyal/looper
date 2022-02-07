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
      <InnerContainer>
        {isPlaying && !isDone ? (
          <PauseButton onClick={handlePause}></PauseButton>
        ) : (
          <PlayButton onClick={handlePlay}></PlayButton>
        )}
        <StopButton onClick={handleStop}></StopButton>
        <LoopButton onClick={handleLoop} isLooped={isLooped}>
          &#8634;
        </LoopButton>
      </InnerContainer>
    </Container>
  );
}
