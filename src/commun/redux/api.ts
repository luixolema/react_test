import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {PageResponse} from "../types.ts";
import {getToken} from "../authToken.ts";

let BASE_URL = import.meta.env.VITE_API_URL;

export interface Book {
    _id: string;
    title: string;
    author: string;
    description?: string;
    publishDate?: string;
}

export interface BookWithFavorite extends Book {
    favorite: boolean;
}

export interface FindBooksRequest {
    query: string;
    page: number;
    pageSize: number;
    favorites: boolean;
}

export interface EditBookDto {
    _id: string;
    title: string;
    author: string;
    description: string;
    publishDate: Date;
}

export interface CreateBookDto {
    title: string;
    author: string;
    description: string;
    publishDate: Date;
}

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['books', 'bookDetails'],
    endpoints: build => ({
        getBooks: build.query<PageResponse<BookWithFavorite>, FindBooksRequest>({
            query: (body) => ({
                url: 'books/find',
                method: 'POST',
                body: body,
            }),
            providesTags: ['books'],
        }),
        removeBook: build.mutation<void, string>({
            query: (id) => ({
                url: 'books/' + id,
                method: 'Delete',
            }),
            invalidatesTags: ['books'],
        }),
        editBook: build.mutation<Book, EditBookDto>({
            query: (body) => ({
                url: 'books',
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['books', 'bookDetails'],
        }),
        createBook: build.mutation<Book, CreateBookDto>({
            query: (body) => ({
                url: 'books',
                method: 'POST',
                body
            }),
            invalidatesTags: ['books'],
        }),
        removeFavorites: build.mutation<void, { bookIds: string[] }>({
            query: (body) => ({
                url: `user/favorites`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['books', 'bookDetails'],
        }),
        addFavorites: build.mutation<void, { bookIds: string[] }>({
            query: (body) => ({
                url: `user/favorites`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['books', 'bookDetails'],
        }),
        getBookDetails: build.query<BookWithFavorite, string>({
            query: (id) => ({
                url: 'user/books/' + id
            }),
            providesTags: ['bookDetails'],
        }),
    }),
})

export const {
    useGetBooksQuery,
    useGetBookDetailsQuery,
    useAddFavoritesMutation,
    useRemoveFavoritesMutation,
    useRemoveBookMutation,
    useCreateBookMutation,
    useEditBookMutation
} = api;

export default api;