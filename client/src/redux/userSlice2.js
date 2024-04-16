import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user2',
    initialState : {
        name : null,
        email : null,
    },
    reducers : {
        setName : (state, action) => {
            state.name = action.payload.name;
        },
        setEmail : (state, action) => {
            state.email = action.payload.email;
        },
        removeName : (state, action) => {
            state.name = null;
        },
        removeEmail : (state, action) => {
            state.email = null;
        }
    }
})

export default userSlice;
export const { setEmail, setName, removeEmail, removeName } = userSlice.actions;