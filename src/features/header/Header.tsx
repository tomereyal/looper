import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectDuration } from "../time-controller/timeControllerSlice";
import {
  BPMBox,
  Container,
  DurationBox,
  Logo,
} from "./styled.components.header";

export default function Header() {
  const duration = useAppSelector(selectDuration);
  return (
    <Container>
      <Logo>
        <img src={"/logo512.png"}></img>
      </Logo>
      <BPMBox>
        BPM <span>140</span>
      </BPMBox>
      <DurationBox>
        Length {duration.toFixed(0) === "0" ? "--" : duration.toFixed(0) + "s"}
      </DurationBox>
    </Container>
  );
}
