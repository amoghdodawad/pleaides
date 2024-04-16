import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        name : null,
        email : null,
        kleId: null,
        token: null,
        isRegistered: null,
        isAccomodated: null,
        registeredEvents: null
    },
    reducers : {
        setUser : (state, action) => {
            const { name, email, kleId, token, isRegistered, isAccomodated, registeredEvents } = action.payload;
            state.name = name;
            state.email = email;
            if(isRegistered) state.kleId = kleId;
            state.token = token;
            state.isRegistered = isRegistered;
            state.isAccomodated = isAccomodated;
            state.registeredEvents = {...registeredEvents};
        },
        setName : (state, action) => {
            state.name = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setEmail : (state, action) => {
            state.email = action.payload;
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
export const { setEmail, setName, removeEmail, removeName, setUser, setToken } = userSlice.actions;