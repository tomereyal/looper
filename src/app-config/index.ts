//@ts-ignore
import bellsAudio from "./bellsAudio.mp3";
//@ts-ignore
import drumsAudio from "./drumsAudio.mp3";
//@ts-ignore
import stabsAudio from "./stabsAudio.mp3";
//@ts-ignore
import dramaticPianoAudio from "./dramaticPianoAudio.mp3";
//@ts-ignore
import musicBoxAudio from "./musicBoxAudio.mp3";

//@ts-ignore
import darkPianoAudio from "./darkPianoAudio.mp3";
//@ts-ignore
import filteredOrchestraAudio from "./filteredOrchestraAudio.mp3";
//@ts-ignore
import simpleChordsAudio from "./simpleChordsAudio.mp3";
//@ts-ignore
import flutesAudio from "./flutesAudio.mp3";

//BPM 140 27 sec  KEY: Am

interface ITrack {
  file: any;
  name: string;
  color: string;
}

export const CONFIG = {
  tracks: [
    { file: drumsAudio, name: "Drums", color: "#955251" },
    { file: stabsAudio, name: "Stabs", color: "#B565A7" },
    { file: dramaticPianoAudio, name: "Dramatic Piano", color: "#009B77" },
    { file: musicBoxAudio, name: "Musicbox", color: "#DD4124" },
    { file: darkPianoAudio, name: "Dark Piano", color: "#D65076" },
    { file: filteredOrchestraAudio, name: "Orchestra", color: "#45B8AC" },
    { file: simpleChordsAudio, name: "Simple Chords", color: "#5B5EA6" },
    { file: flutesAudio, name: "Flutes", color: "#9B2335" },
  ] as ITrack[],
  screens: {
    sm: "640px",
    // => @media (min-width: 640px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "1024px",
    // => @media (min-width: 1024px) { ... }

    xl: "1280px",
    // => @media (min-width: 1280px) { ... }

    "2xl": "1536px",
    // => @media (min-width: 1536px) { ... }
  },
  layout: {
    TIME_CONTROLLER_WIDTH: 75, // PERCENTAGE
    TIME_CONTROLLER_WIDTH_MOBILE: 65, // PERCENTAGE
  },
};
