import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {PageResponse} from "../../../commun/types.ts";

// FIXME dosent work with vite
let BASE_URL = (import.meta.env.BASE_URL || 'http://localhost:3000/api/v1.1/') + 'books/';
BASE_URL = 'http://localhost:3000/api/v1.1/';


export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    publishDate: string;
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

const booksApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
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
} = booksApi;

export default booksApi;