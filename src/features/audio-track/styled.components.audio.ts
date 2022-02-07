import { CONFIG } from "./../../app-config/index";
import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  display: flex;
`;
export const AudioContainer = styled.div`
  flex: 1;
  width: 100%;
`;
export const ControlPanelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  text-align: center;
  width: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH_MOBILE + "%"};
  @media only screen and (min-width: 600px) {
    width: ${100 - CONFIG.layout.TIME_CONTROLLER_WIDTH + "%"};
  }
`;

export const AudioName = styled.div`
  ${tw`
flex
justify-center
items-center
text-tiny
 md:text-base
 text-gray-300
 `}
`;

export const GlowingBulletin = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ color }) => color};
  box-shadow: inset 0 0 2px 3px ${({ color }) => color},
    /* inner white */ 0 0 5px 3px ${({ color }) => color};
  ${tw`
  mr-2
  md:mr-4`}
`;

export const VolumeContainer = styled.div`
  ${tw`
  flex
  justify-center
  items-center
  `}
  input {
    width: 30px;
  }
`;

export const MuteToggleButton = styled.a`
  height: 30px;
  width: 30px;
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  span {
    display: block;
    width: 8px;
    height: 8px;
    background: #fff;
    margin: 11px 0 0 2px;

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent #fff transparent transparent;
      border-width: 10px 14px 10px 15px;
      left: -13px;
      top: 5px;
    }

    &:before {
      transform: rotate(45deg);
      border-radius: 0 50px 0 0;
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-style: double;
      border-color: #fff;
      border-width: 7px 7px 0 0;
      left: 18px;
      top: 9px;
      transition: all 0.2s ease-out;
    }
  }

  &:hover {
    span:before {
      transform: scale(0.8) translate(-3px, 0) rotate(42deg);
    }
  }

  &.mute {
    span:before {
      transform: scale(0.5) translate(-15px, 0) rotate(36deg);
      opacity: 0;
    }
  }

  ${tw`
  mx-1
  `}
  transform: scale(0.7);
`;
