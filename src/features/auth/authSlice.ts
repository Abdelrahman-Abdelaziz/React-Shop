import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/api";

interface AuthState {
  token: string | null;
  user: User | null;
}

function loadUser(): User | null {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  else return JSON.parse(storedUser) as User;
}

const initialState: AuthState = {
  token: localStorage.getItem("accessToken"),
  user: loadUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCreds: (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
    },
    logOut: (state) => {
        state.token = null;
        state.user = null;
    },
  },
});

export const { setCreds, logOut } = authSlice.actions;
export default authSlice.reducer;