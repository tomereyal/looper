import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  pause,
  play,
  selectIsLooped,
  selectIsPlaying,
  selectIsStopped,
  stop,
} from "../play-controllers/playControllersSlice";
import {
  AudioContainer,
  AudioName,
  Container,
  ControlPanelContainer,
  MuteToggleButton,
  VolumeContainer,
} from "./styled.components.audio";
import {
  selectPercentage,
  selectSelectedTime,
  setDuration,
  setPercentage,
} from "../time-controller/timeControllerSlice";
import { debounce } from "lodash";
import VolumeControl from "./VolumeControl";
const formWaveSurferOptions = (ref: any, color: string) => ({
  container: ref,
  waveColor: "#555",
  progressColor: color,
  cursorColor: "transparent",
  interact: false,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 50,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

interface IAudioTrack {
  track: { file: any; color: string; name: string };
  isMasterTrack: boolean; // The track that will calculate the currentTime,duration.. so forth
}

export default function AudioTrack({ track, isMasterTrack }: IAudioTrack) {
  const { file, color, name } = track;
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const isPlaying = useAppSelector(selectIsPlaying);
  const isStopped = useAppSelector(selectIsStopped);
  const isLooped = useAppSelector(selectIsLooped);
  const selectedTime = useAppSelector(selectSelectedTime);
  const dispatch = useAppDispatch();
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);
  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current, color);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(file);
    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });
    if (isMasterTrack) {
      //add a debouncer to make audio less laggy
      wavesurfer.current.on(
        "audioprocess",
        // debounce(

        function () {
          if (wavesurfer.current) {
            let currentTime = wavesurfer.current.getCurrentTime();
            let duration = wavesurfer.current.getDuration();
            const percent = ((currentTime / duration) * 100).toFixed(2);
            dispatch(setPercentage(+percent));
            dispatch(setDuration(duration));
          }
        }

        // , 100)
      );
    }

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current?.destroy();
  }, [file]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setCurrentTime(selectedTime);
      // wavesurfer.current.play();
    }
  }, [selectedTime]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) wavesurfer.current.play();
      else {
        if (isStopped) {
          wavesurfer.current.stop();
          dispatch(setPercentage(0));
        } else wavesurfer.current.pause();
      }
    }
  }, [isPlaying, isStopped]);

  useEffect(() => {
    wavesurfer.current?.on("finish", function () {
      wavesurfer.current?.stop();
      if (isLooped) wavesurfer.current?.play();
      else {
        dispatch(pause());
      }
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
      setMute(true);
    }
  };

  const onVolumeChange = (e: any) => {
    const { target } = e;
    const newVolume = +target.value / 100;
    console.log("newVolume", newVolume);
    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current?.setVolume(newVolume || 1);
    }
  };

  return (
    <Container>
      <ControlPanelContainer>
        <AudioName>{name}</AudioName>
        <VolumeContainer>
          <VolumeControl
            percentage={volume}
            onChange={onVolumeChange}
            mute={mute}
          ></VolumeControl>

          <MuteToggleButton onClick={toggleMute} className={mute ? "mute" : ""}>
            <span></span>
          </MuteToggleButton>
        </VolumeContainer>
      </ControlPanelContainer>

      <AudioContainer>
        <div id="waveform" ref={waveformRef} />
      </AudioContainer>
    </Container>
  );
}
