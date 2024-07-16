import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    _id: number;
    username: string;
    profilePicture: string;
    email: string;
  } | null;
  loading: boolean;
  error: null
}



// Load the initial state from local storage, if available
const initialState: AuthState =  {
    user: null,
    loading: false,
    error: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
        state.loading = true;
        state.error = null;
      },
    setUser: (state, action: PayloadAction<{_id: number; username: string; profilePicture: string; email: string }>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },

    signoutSuccess: (state) => {
        state.user = null;
        state.error = null;
      state.loading = false;

      },
  },
});

export const { setUser,signoutSuccess } = authSlice.actions;

export default authSlice.reducer;
