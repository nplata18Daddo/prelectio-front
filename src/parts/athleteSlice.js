import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CODES } from "../consts/codes";
import { GetDeportistas } from "../services/deportistaServices";

export const athleteSlice = createSlice({
  name: "athlete",
  initialState: {
    athleteList: [],
    athleteStatus: "fetch",
    error: null,
  },
  reducers: {
    resetAthleteStatus(state, action) {
      state.athleteStatus = "fetch";
      state.athleteList = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAthlete.pending, (state, action) => {
        state.athleteStatus = "loading";
      })
      .addCase(fetchAthlete.fulfilled, (state, action) => {
        state.athleteStatus = "succeeded";
        state.athleteList = action.payload;
      })
      .addCase(fetchAthlete.rejected, (state, action) => {
        state.athleteStatus = "failed";
      });
  },
});

export const getAthlete = (state) => state.athlete.athleteList;

export const getAthleteStatus = (state) => state.athlete.athleteStatus;

export const { resetAthleteStatus } = athleteSlice.actions;

export const fetchAthlete = createAsyncThunk("getAthletes", async () => {
  const requestAthlete = await GetDeportistas();

  if (requestAthlete.status === CODES.COD_RESPONSE_HTTP_OK) {
    if (
      requestAthlete.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST
    ) {
      return requestAthlete.data.responseMessage;
    }
  }
});

export default athleteSlice.reducer;
