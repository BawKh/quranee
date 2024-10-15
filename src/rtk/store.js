import { configureStore } from "@reduxjs/toolkit";
import surahSlicer from "./slices/Surahs-slices";
import surahOneSlicer from "./slices/OneSurah-slice";

export const store = configureStore({
  reducer: {
    surah: surahSlicer,
    oneSurah: surahOneSlicer,
  },
});
