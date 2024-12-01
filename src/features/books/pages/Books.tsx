import React, {useState} from "react";
import {Button, Card, Input, List, Pagination, Spin} from "antd";
import {PlusOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import {PATHS} from "../../../commun/routes.tsx";
import {useAddFavoritesMutation, useGetBooksQuery, useRemoveFavoritesMutation} from "../../../commun/redux/api.ts";
import {DatePipe} from "../../../commun/components/DatePipe.tsx";
import {ErrorAlert} from "../../../commun/components/ErrorAlert.tsx";

const {Search} = Input;


const Books = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const [showFavorites, setShowFavorites] = useState(location.pathname === PATHS.favorites);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    const [removeFavorite] = useRemoveFavoritesMutation();
    const [addFavorite] = useAddFavoritesMutation();

    const {data, isFetching, error} = useGetBooksQuery({
        query: searchTerm,
        page: currentPage,
        pageSize,
        favorites: showFavorites,
    });

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const toggleFavorite = (_id: string, isFavorite: boolean, event: React.MouseEvent) => {
        event.stopPropagation();
        if (isFavorite) {
            removeFavorite({bookIds: [_id]});
        } else {
            addFavorite({bookIds: [_id]});
        }
    };

    if (error) {
        return <ErrorAlert message="An error occurred while fetching the books."></ErrorAlert>
    }

    return (
        <div className="p-4 flex h-full flex-col">
            <div className="pb-4 w-full">
                <div className="max-w-xs flex flex-col gap-4">
                    <Search
                        placeholder="Search by author or name"
                        onSearch={handleSearch}
                        enterButton
                    />
                    <div className="flex flex-grow gap-1">
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={() => navigate(PATHS.newBook)}
                            className="hidden sm:inline-flex"
                        >
                            Add New Book
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={() => navigate(PATHS.newBook)}
                            className="sm:hidden"
                        />
                        <Button
                            type="default"
                            icon={showFavorites ? <StarFilled/> : <StarOutlined/>}
                            onClick={() => setShowFavorites(!showFavorites)}
                        >
                            {showFavorites ? 'Show All' : 'Show Favorites'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="h-full overflow-x-hidden">
                {isFetching &&
                    <div className="flex justify-center items-center h-full">
                        <Spin size="large"/>
                    </div>
                }
                {!isFetching && data && <List
                    grid={{gutter: 16, xs: 1}}
                    dataSource={data.items}
                    renderItem={book => (
                        <List.Item key={book!._id}>
                            <Card
                                className="w-80"
                                title={<span className="truncate">{book.title}</span>}
                                extra={
                                    <Button
                                        type="text"
                                        icon={book.favorite ? <StarFilled className="text-yellow-500"/> :
                                            <StarOutlined/>}
                                        onClick={(event) => toggleFavorite(book._id, book.favorite, event)}
                                    />
                                }
                                onClick={() => navigate(PATHS.bookDetails.replace(':id', book._id))}
                                style={{cursor: 'pointer'}}
                            >
                                <p className="truncate">{book.author}</p>
                                <p className="truncate">Publish Date: <DatePipe date={book.publishDate}/></p>
                            </Card>
                        </List.Item>
                    )}
                />}
            </div>
            <div className="flex-grow"></div>
            <div className="pt-4">
                {data && data?.total > 5 && <Pagination
                    current={data?.page || 0}
                    pageSize={data?.pageSize || 0}
                    total={data?.total || 0}
                    showSizeChanger={true}
                    pageSizeOptions={[5, 10, 20, 50]}
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    }}
                    className="float-end"
                />}
            </div>
        </div>
    )
}

export default Books;