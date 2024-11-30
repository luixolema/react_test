// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
//
// // FIXME dosent work with vite
// let BASE_URL = (import.meta.env.BASE_URL || 'http://localhost:3000/api/v1.1/') + 'books/';
// BASE_URL = 'http://localhost:3000/api/v1.1/users/';
//
//
// export class ModifyFavoriteDto {
//     @IsArray()
//     @ArrayNotEmpty()
//     @IsString({ each: true })
//     bookIds: string[];
// }
//
// const booksApi = createApi({
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//     }),
//     tagTypes: ['users'],
//     endpoints: build => ({
//         getBooks: build.mutation<void, string[]>({
//             query: (dto) => ({
//                 url: 'find',
//                 method: 'POST',
//                 body: dto,
//             }),
//         }),
//         getBookDetails: build.query<BookWithFavorite, string>({
//             query: (id) => ({
//                 url: '/' + id
//             }),
//         }),
//     }),
// })
//
// export const {useGetBooksQuery, useGetBookDetailsQuery} = booksApi;
//
// export default booksApi;