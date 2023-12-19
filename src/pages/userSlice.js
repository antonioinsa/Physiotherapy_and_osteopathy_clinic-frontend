import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    credentials: {
      token: "",
      role: "",
      // password: "",
    },
  },

  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    logout: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    role: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    // password: (state, action) => {
    //   return {
    //     ...state,
    //     ...action.payload
    //   }
    // },
  }

});

export const { login, logout, role } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;