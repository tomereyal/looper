import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import TimeController from "./features/time-controller/TimeController";
import PlayControllers from "./features/play-controllers/PlayControllers";
import { CONFIG } from "./app-config";
import AudioTrack from "./features/audio-track/AudioTrack";
import styled from "styled-components";
import tw from "twin.macro";

function App() {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const onChange = (e: any) => {
    setPercentage(e.target.value);
  };
  const play = () => {
    // const audio = audioRef.current;
    // audio.volume = 0.1;

    if (!isPlaying) {
      setIsPlaying(true);
      // audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      // audio.pause();
    }
  };

  const AppContainer = styled.div`
    width: 300px;
    min-height: max-content;
    background-color: #272727;

    padding: 15px 15px;
    border-radius: 10px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.479);
    /* overflow-y: auto; */
    ${tw`
    m-5
  `}

    @media only screen and (min-width:  ${CONFIG.screens.md}) {
      width: 700px;
      padding: 30px 50px;
    }
  `;

  return (
    <AppContainer>
      <TimeController
        percentage={percentage}
        onChange={onChange}
      ></TimeController>

      {CONFIG.tracks.map((track, index) => (
        <AudioTrack track={track} isMasterTrack={index === 0 ? true : false} />
      ))}
      <PlayControllers></PlayControllers>
    </AppContainer>
  );
}

export default App;
