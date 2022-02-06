import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import TimeController from "./features/time-controller/TimeController";
import TimeControllers from "./features/play-controllers/PlayControllers";

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

  return (
    <div className="app-container">
      <TimeController percentage={percentage} onChange={onChange}></TimeController>
      <TimeControllers
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      ></TimeControllers>
    </div>
  );
}

export default App;
