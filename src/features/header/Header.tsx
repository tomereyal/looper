import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectDuration } from "../time-controller/timeControllerSlice";
import { BPMBox, Container, DurationBox } from "./styled.components.header";

export default function Header() {
  const duration = useAppSelector(selectDuration);
  return (
    <Container>
      <BPMBox>
        BPM <span>140</span>
      </BPMBox>
      <DurationBox>Length {duration.toFixed(0)}s</DurationBox>
    </Container>
  );
}
