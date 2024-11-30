import React, {LazyExoticComponent} from "react";
import {Navigate, Route, Routes} from "react-router-dom";


let Books = React.lazy(() => import("../features/books/pages/Books.tsx"));
let RedirectLoginPage = React.lazy(() => import("../pages/RedirectLoginPage"));
let BookDetails = React.lazy(() => import("../features/books/pages/BookDetails.tsx"));
let Profile = React.lazy(() => import("../pages/Profile"));
let EditBook = React.lazy(() => import("../features/books/pages/EditBook.tsx"));
let NewBook = React.lazy(() => import("../features/books/pages/NewBook.tsx"));

export const PATHS = {
    books: '/books',
    favorites: '/books/favorites',
    bookDetails: '/books/:id',
    editBooks: '/books/edit/:id',
    loginRedirect: '/loginRedirect',
    profile: '/profile',
    newBook: '/newBook'
};

const routes: { [key in keyof typeof PATHS]: LazyExoticComponent<any> } = {
    favorites: Books,
    books: Books,
    loginRedirect: RedirectLoginPage,
    bookDetails: BookDetails,
    profile: Profile,
    editBooks: EditBook,
    newBook: NewBook
};


const DynamicRoutes = (
    <Routes>
        {Object.entries(routes).map(([key, ComponentToLoad], index) => {
            const path = PATHS[key as keyof typeof PATHS];
            return (
                <Route
                    key={path}
                    path={path}
                    element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <ComponentToLoad key={index}/>
                        </React.Suspense>
                    }
                />
            );
        })}
        <Route path="/" element={<Navigate to={PATHS.books} replace/>}/>
        <Route path="*" element={<Navigate to={PATHS.books} replace/>}/>
    </Routes>
);

export default DynamicRoutes;