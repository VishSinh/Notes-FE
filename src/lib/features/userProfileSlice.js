import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        setUserProfile(state, action) {
            console.log('Action' , action.payload);
            console.log('State', state);
            return action.payload;
        },
        resetUserProfile(state) {
            return initialState;
        }
    },
});

export const { setUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;