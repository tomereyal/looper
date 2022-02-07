import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAppSelector } from "../../app/hooks";

import {
  selectIsLooped,
  selectIsPlaying,
  selectIsStopped,
} from "../play-controllers/playControllersSlice";
import {
  AudioContainer,
  ButtonsContainer,
  Container,
  VolumeContainer,
} from "../../styled-components";

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#eeeeee0",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  interact: true,
  barWidth: 1,
  barRadius: 1,
  responsive: true,
  height: 50,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

interface IAudioTrack {
  file: any;
}

export default function TimeControl({ file }: IAudioTrack) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const isPlaying = useAppSelector(selectIsPlaying);
  const isStopped = useAppSelector(selectIsStopped);
  const isLooped = useAppSelector(selectIsLooped);
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);
  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(file);
    wavesurfer.current.on("ready", function () {
      wavesurfer.current?.setMute(true);
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current?.destroy();
  }, [file]);

  useEffect(() => {
    console.log("audio.. isPlaying :", isPlaying);
    if (wavesurfer.current) {
      if (isPlaying) wavesurfer.current.play();
      else {
        if (isStopped) wavesurfer.current.stop();
        else wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    wavesurfer.current?.on("finish", function () {
      wavesurfer.current?.stop();
      if (isLooped) wavesurfer.current?.play();
    });
  }, [isLooped]);

  const toggleMute = () => {
    if (mute === true) {
      wavesurfer.current?.setMute(false);
      // wavesurfer.current?.setcursorColor("OrangeRed");
      console.log("mute", mute);
      setMute(false);
    } else {
      wavesurfer.current?.setMute(true);
      // wavesurfer.current?.setcursorColor("#555");
      setMute(true);
    }
  };

  const onVolumeChange = (e: any) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current?.setVolume(newVolume || 1);
    }
  };

  return (
    <Container>
      <ButtonsContainer>
        <div>
          <button onClick={toggleMute}>{mute ? "unmute" : "mute"}</button>
        </div>
        {/* <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button> */}
        <VolumeContainer>
          <input
            type="range"
            id="volume"
            name="volume"
            // waveSurfer recognize value of `0` same as `1`
            //  so we need to set some zero-ish value for silence
            min="0.01"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
        </VolumeContainer>
      </ButtonsContainer>
      <AudioContainer>
        <div id="waveform" ref={waveformRef} />
      </AudioContainer>
    </Container>
  );
}
