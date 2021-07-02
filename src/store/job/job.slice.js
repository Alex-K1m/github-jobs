import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  failed,
  initial,
  loading,
  succeeded,
} from '@/utils/constants/statuses';

const initialState = {
  status: initial,
  error: null,
  job: null,
};

export const fetchJob = createAsyncThunk('job/fetch', async (id) => {
  const response = await fetch(`https://jobs.github.com/positions/${id}.json`);
  if (response.status === 404)
    throw new Error(`The job with id ${id} is not found`);
  return response.json();
});

const jobSlice = createSlice({
  name: 'job',
  initialState,
  extraReducers: {
    [fetchJob.pending]: (state) => {
      state.status = loading;
    },
    [fetchJob.fulfilled]: (state, action) => {
      state.job = action.payload;
      state.status = succeeded;
    },
    [fetchJob.rejected]: (state, action) => {
      state.error = action.error;
      state.status = failed;
    },
  },
});

export default jobSlice.reducer;