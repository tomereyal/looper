import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PlayState {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isLooped: boolean;
  isDone: boolean;
}

const initialState: PlayState = {
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isLooped: true,
  isDone: false,
};

export const playControllersSlice = createSlice({
  name: "playStatus",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    play: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
      state.isStopped = false;
      state.isDone = false;
    },
    pause: (state) => {
      state.isPaused = true;
      state.isPlaying = false;
      state.isStopped = false;
      state.isDone = false;
    },
    stop: (state) => {
      state.isStopped = true;
      state.isPlaying = false;
      state.isDone = false;
      state.isPaused = false;
    },
    loop: (state) => {
      state.isLooped = state.isLooped ? false : true;
    },
    done: (state) => {
      state.isDone = true;
      state.isStopped = false;
      state.isPlaying = false;
      state.isPaused = false;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { play, pause, stop, loop, done } = playControllersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsPlaying = (state: RootState) => state.playStatus.isPlaying;
export const selectIsStopped = (state: RootState) => state.playStatus.isStopped;
export const selectIsLooped = (state: RootState) => state.playStatus.isLooped;
export const selectIsDone = (state: RootState) => state.playStatus.isDone;
export const selectIsPaused = (state: RootState) => state.playStatus.isPaused;
export default playControllersSlice.reducer;
