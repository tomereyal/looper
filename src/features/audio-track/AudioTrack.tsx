import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  done,
  play,
  selectIsDone,
  selectIsLooped,
  selectIsPaused,
  selectIsPlaying,
  selectIsStopped,
} from "../play-controllers/playControllersSlice";
import {
  AudioContainer,
  AudioName,
  Container,
  ControlPanelContainer,
  GlowingBulletin,
  MuteToggleButton,
  VolumeContainer,
} from "./styled.components.audio";
import {
  selectSelectedTime,
  setDuration,
  setPercentage,
} from "../time-controller/timeControllerSlice";
import { debounce } from "lodash";
import VolumeControl from "./VolumeControl";
import ReactTooltip from "react-tooltip";
const formWaveSurferOptions = (ref: any, color: string) => ({
  container: ref,
  waveColor: "#555",
  progressColor: color,
  cursorColor: "transparent",
  interact: false,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 80,
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
  const isPaused = useAppSelector(selectIsPaused);
  const isDone = useAppSelector(selectIsDone);
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
      wavesurfer.current.on("audioprocess", function () {
        if (wavesurfer.current) {
          let currentTime = wavesurfer.current.getCurrentTime();
          let duration = wavesurfer.current.getDuration();
          const percent = ((currentTime / duration) * 100).toFixed(2);
          dispatch(setPercentage(+percent));
          dispatch(setDuration(duration));
        }
      });
    }

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current?.destroy();
  }, [file]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setCurrentTime(selectedTime);
    }
  }, [selectedTime]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      }
      if (isPaused) {
        wavesurfer.current.pause();
      }
      if (isStopped) {
        wavesurfer.current.stop();
        if (isMasterTrack) dispatch(setPercentage(0));
      }
    }
  }, [isPlaying, isStopped, isDone]);

  useEffect(() => {
    wavesurfer.current?.on("finish", function () {
      if (isLooped) {
        wavesurfer.current?.play(0);
        if (isMasterTrack) dispatch(play);
      } else {
        wavesurfer.current?.stop();
        if (isMasterTrack) dispatch(done());
      }
    });
  }, [isLooped]);

  const toggleMute = () => {
    if (mute === true) {
      wavesurfer.current?.setMute(false);
      setMute(false);
    } else {
      wavesurfer.current?.setMute(true);
      setMute(true);
    }
  };

  const onVolumeChange = (e: any) => {
    const { target } = e;
    const newVolume = +target.value / 100;
    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current?.setVolume(newVolume || 1);
    }
  };

  return (
    <Container>
      <ControlPanelContainer>
        <AudioName>
          <GlowingBulletin color={mute ? "#555" : color} />
          {name}
        </AudioName>
        <VolumeContainer>
          <VolumeControl
            percentage={volume}
            onChange={onVolumeChange}
            mute={mute}
          ></VolumeControl>

          <MuteToggleButton
            data-tip={mute ? "Unmute Track" : "Mute Track"}
            onClick={toggleMute}
            className={mute ? "mute" : ""}
          >
            <span></span>
          </MuteToggleButton>
        </VolumeContainer>
      </ControlPanelContainer>

      <AudioContainer>
        <div id="waveform" ref={waveformRef} />
      </AudioContainer>
      <ReactTooltip />
    </Container>
  );
}
