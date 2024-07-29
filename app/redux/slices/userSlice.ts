import { createSlice, Dispatch } from "@reduxjs/toolkit";

interface User {
  user: any
}

interface UserState {
  data: User;
}

const initialState: UserState = {
  data: {
    user: null
  },
}

const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer for updating cardDetails after a successful resource fetch
    setUser(state, action) {
      const user = action.payload;
      state.data = user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
