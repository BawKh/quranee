import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define the base URL for audio files
const AUDIO_BASE_URL = "https://quranaudio.pages.dev/";

export const fetchOneSurah = createAsyncThunk(
  "surahOneSlicer/fetchOneSurah",
  async ({ surahID, Reciter }) => {
    // Fetch Surah data
    const res = await fetch(`https://quranapi.pages.dev/api/${surahID}.json`);
    const data = await res.json();

    // Generate audio URLs for each Ayah
    const audioUrls = data.arabic1.map(
      (_, index) => `${AUDIO_BASE_URL}${Reciter}/${surahID}_${index + 1}.mp3`
    );

    // Return both surahID and data along with audioUrls
    return { surahID, data: { ...data, audioUrls } }; // Include audio URLs in the returned data
  }
);

export const surahOneSlicer = createSlice({
  name: "surahOneSlicer",
  initialState: {}, // Store each surah's data by ID
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOneSurah.fulfilled, (state, action) => {
      state[action.payload.surahID] = action.payload.data; // Store surah data by surahID
    });
    builder.addCase(fetchOneSurah.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export default surahOneSlicer.reducer;
