import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loop, selectIsLooped, selectIsPlaying } from "./playControllersSlice";
import { play, pause, stop } from "./playControllersSlice";
import {
  ButtonContainer,
  Container,
  LoopButton,
  PauseButton,
  PlayButton,
  StopButton,
} from "./styled.components.playControllers";

export default function PlayControllers() {
  const isPlaying = useAppSelector(selectIsPlaying);
  const isLooped = useAppSelector(selectIsLooped);
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
    </Container>
  );
}
