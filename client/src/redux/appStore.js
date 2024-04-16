import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userReducer2 from "./userSlice2";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const combinedReducer = combineReducers({
    user: userReducer.reducer,
    user2: userReducer2.reducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,combinedReducer);

export const store = configureStore({
    // reducer :{
    //     user: userReducer,
    //     user2: userReducer2
    // }
    reducer : persistedReducer,
    // middleware : [thunk]
});

export const persistor = persistStore(store);