import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import timeControllerReducer from "../features/time-controller/timeControllerSlice";
import playControllersReducer from "../features/play-controllers/playControllersSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    time: timeControllerReducer,
    playStatus: playControllersReducer,
    // duration: DurationReducer,
    // currentTime: CurrentTimeReducer,
  },
});

/*

  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
 */

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
