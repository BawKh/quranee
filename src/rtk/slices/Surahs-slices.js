import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSurah = createAsyncThunk(
  "surahSlicer/fetchSurah",
  async () => {
    const res = await fetch("https://quranapi.pages.dev/api/surah.json");
    const data = await res.json();
    return data;
  }
);

export const surahSlicer = createSlice({
  name: "surahSlicer",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSurah.fulfilled, (state, action) => action.payload);
  },
});

export default surahSlicer.reducer;
