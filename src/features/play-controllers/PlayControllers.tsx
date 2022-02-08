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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faStop,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faPause} />
          </PauseButton>
        ) : (
          <PlayButton data-tip="Play" onClick={handlePlay}>
            <FontAwesomeIcon icon={faPlay} />
          </PlayButton>
        )}
        <StopButton data-tip="Stop" onClick={handleStop}>
          <FontAwesomeIcon icon={faStop} />
        </StopButton>
        <LoopButton
          data-tip={isLooped ? "Disable Looping" : "Enable Looping"}
          onClick={handleLoop}
          isLooped={isLooped}
        >
          <FontAwesomeIcon icon={faUndo} />
        </LoopButton>
      </InnerContainer>
    </Container>
  );
}
