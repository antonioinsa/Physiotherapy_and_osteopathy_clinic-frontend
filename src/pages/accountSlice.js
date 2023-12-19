import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        password: {
            password: "",
        },
    },

    reducers: {
        password: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        //   logout: (state, action) => {
        //     return {
        //       ...state,
        //       ...action.payload
        //     }
    }

});

export const { password } = accountSlice.actions;

export const accountData = (state) => state.user;

export default accountSlice.reducer;