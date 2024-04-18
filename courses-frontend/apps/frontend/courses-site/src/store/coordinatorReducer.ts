import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../services/coordinator-api.service';
import { Coordinator } from '../interfaces/Coordinator';

export interface CoordinatorState {
  coordinators: Coordinator[];
  isLoading: boolean;
}

const initialState: CoordinatorState = {
  coordinators: [],
  isLoading: false
};

export const createCoordinator = createAsyncThunk(
  'coordinators/createCooordinator',
  async (coordinatorDto: Coordinator) => {
    const response = await ApiService.createCoordinator(coordinatorDto);
    return response?.data;
  }
);

export const deleteCoordinator = createAsyncThunk(
  'coordinators/deleteCoordinator',
  async (coordinatorDto: Coordinator) => {
    const response = await ApiService.deleteCoordinator(coordinatorDto);
    return response?.data;
  }
);

const coordinatorsSlice = createSlice({
  name: 'coordinators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoordinator.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCoordinator.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCoordinator.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCoordinator.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCoordinator.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCoordinator.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  }
});

export default coordinatorsSlice.reducer;
