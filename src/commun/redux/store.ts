import {configureStore} from '@reduxjs/toolkit'
import booksSlice from "../../features/books/redux/booksSlice.ts";
import booksApi from "../../features/books/redux/booksApi.ts";

export const store = configureStore({
    reducer: {
        books: booksSlice,
        [booksApi.reducerPath]: booksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(booksApi.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStorage = typeof store