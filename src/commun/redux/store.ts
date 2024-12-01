import {configureStore} from '@reduxjs/toolkit'
import booksSlice from "../../features/books/redux/booksSlice.ts";
import api from "./api.ts";

export const store = configureStore({
    reducer: {
        books: booksSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStorage = typeof store