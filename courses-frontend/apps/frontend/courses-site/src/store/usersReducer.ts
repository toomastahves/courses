import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../services/users-api.service';
import { User } from '../interfaces/User';

export interface UserState {
  users: User[] | null;
  isLoading: boolean;
}

const initialState: UserState = {
  users: null,
  isLoading: false
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await ApiService.getUserList();
  return response?.data?.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      });
  }
});

export default usersSlice.reducer;
