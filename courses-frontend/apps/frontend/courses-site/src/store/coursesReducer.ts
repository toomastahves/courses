import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../services/courses-api.service';

const initialState = {
  courses: null,
  courseDetails: null,
  isLoading: false
} as any;

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await ApiService.getCourseList();
    return response?.data?.data;
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id: string) => {
    const response = await ApiService.getCourseDetails(id);
    return response?.data;
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseDto: any) => {
    const response = await ApiService.createCourse(courseDto);
    return response?.data;
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (courseDto: any) => {
    const response = await ApiService.updateCourse(courseDto);
    return response?.data;
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id: string) => {
    const response = await ApiService.deleteCourse(id);
    return response?.data;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        if (!state.courses) state.courses = [action.payload];
        else state.courses.push(action.payload);
        state.isLoading = false;
      })
      .addCase(fetchCourseById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.courseDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCourses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload.id;
        const courses = state.courses;
        state.courses = courses.filter((item: any) => item.id !== id);
      })
      .addCase(updateCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCourse = action.payload;
        const id = updatedCourse.id;
        state.sensors = state.sensors.map((item: any) =>
          item.id === id ? updatedCourse : item
        );
        state.courseDetails = updatedCourse;
      });
  }
});

export default coursesSlice.reducer;
