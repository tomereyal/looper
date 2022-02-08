import React from "react";
import "./App.css";
import TimeController from "./features/time-controller/TimeController";
import PlayControllers from "./features/play-controllers/PlayControllers";
import { CONFIG } from "./app-config";
import AudioTrack from "./features/audio-track/AudioTrack";
import styled from "styled-components";
import tw from "twin.macro";
import Header from "./features/header/Header";
const AppContainer = styled.div`
  width: 360px;
  min-height: max-content;
  background-color: #272727;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.479);
  ${tw`
    m-5
  `}
  @media only screen and (min-width:  ${CONFIG.screens.md}) {
    width: 700px;
  }
`;

const PaddingContainer = styled.div`
  ${tw`
  p-3
  md:p-7
  relative
  h-full
  w-full
  overflow-y-hidden
  `}
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <PaddingContainer>
        <TimeController />
        {CONFIG.tracks.map((track, index) => (
          <AudioTrack
            key={track.name}
            track={track}
            isMasterTrack={index === 0 ? true : false}
          />
        ))}
      </PaddingContainer>
      <PlayControllers />
    </AppContainer>
  );
}

export default App;
