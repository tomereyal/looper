import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import timeControllerReducer from "../features/time-controller/timeControllerSlice";
import playControllersReducer from "../features/play-controllers/playControllersSlice";
export const store = configureStore({
  reducer: {
    time: timeControllerReducer,
    playStatus: playControllersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
