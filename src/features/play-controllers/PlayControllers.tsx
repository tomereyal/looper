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
  NeomorphicButton,
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
          <PauseButton data-tip="Pause" onClick={handlePause}>
            <i className="fas fa-pause"></i>
          </PauseButton>
        ) : (
          <PlayButton data-tip="Play" onClick={handlePlay}>
            <i className="fas fa-play"></i>
          </PlayButton>
        )}
        <StopButton data-tip="Stop" onClick={handleStop}>
          <i className="fas fa-stop"></i>
        </StopButton>
        <LoopButton
          data-tip={isLooped ? "Disable Looping" : "Enable Looping"}
          onClick={handleLoop}
          isLooped={isLooped}
        >
          <i className="fas fa-undo"></i>
        </LoopButton>
      </InnerContainer>
    </Container>
  );
}
