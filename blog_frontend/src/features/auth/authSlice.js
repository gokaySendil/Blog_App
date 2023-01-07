import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";


// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// auth initial state
const auth_init = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: auth_init,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
  },
});
// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      await authService.registerUser(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
      
    }
  }
);

// Login User
const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {});

const Logout = createAsyncThunk("auth/logout", async () => {});
export default authSlice.reducer;
