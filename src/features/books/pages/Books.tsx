import {useEffect, useState} from "react";
import {Button, Card, Input, Layout, List, Pagination, Space, Spin} from "antd";
import {PlusOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import {PATHS} from "../../../commun/routes.tsx";

const {Content} = Layout;
const {Search} = Input;

interface Book {
    id: string;
    title: string;
    author: string;
    isFavorite: boolean;
    publishDate: string;
}

const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8); // Number of books per page
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const favoritesParam = queryParams.get('favorites');
        setShowFavorites(favoritesParam === 'true');
    }, [location.search]);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            // Simulate an API request
            setTimeout(() => {
                const fetchedBooks: Book[] = [
                    {id: '1', title: 'Book One', author: 'Author One', isFavorite: false, publishDate: '2021-01-01'},
                    {id: '2', title: 'Book Two', author: 'Author Two', isFavorite: true, publishDate: '2022-02-02'},
                    // Add more book data here
                ];
                const filteredBooks = showFavorites ? fetchedBooks.filter(book => book.isFavorite) : fetchedBooks;
                setBooks(filteredBooks);
                setLoading(false);
            }, 1000);
        };

        fetchBooks();
    }, [showFavorites]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const toggleFavorite = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setBooks(books.map(book =>
            book.id === id ? {...book, isFavorite: !book.isFavorite} : book
        ));
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <Content className="p-4">
            <Space className="mb-4" direction="vertical" style={{width: '100%'}}>
                <Search
                    placeholder="Search by author or name"
                    onSearch={handleSearch}
                    enterButton
                />
                <Space>
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
                    {!showFavorites && (
                        <Button
                            type="default"
                            icon={showFavorites ? <StarFilled/> : <StarOutlined/>}
                            onClick={() => setShowFavorites(!showFavorites)}
                        >
                            {showFavorites ? 'Show All' : 'Show Favorites'}
                        </Button>
                    )}
                </Space>
            </Space>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Spin size="large"/>
                </div>
            ) : (
                <>
                    <List
                        grid={{gutter: 16, xs: 1, sm: 2, md: 4}}
                        dataSource={paginatedBooks}
                        renderItem={book => (
                            <List.Item>
                                <Card
                                    title={<span className="truncate">{book.title}</span>}
                                    extra={
                                        <Button
                                            type="text"
                                            icon={book.isFavorite ? <StarFilled className="text-yellow-500"/> :
                                                <StarOutlined/>}
                                            onClick={(event) => toggleFavorite(book.id, event)}
                                        />
                                    }
                                    onClick={() => navigate(PATHS.bookDetails.replace(':id', book.id))}
                                    style={{cursor: 'pointer'}}
                                >
                                    <p className="truncate">{book.author}</p>
                                    <p className="truncate">Publish Date: {book.publishDate}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredBooks.length}
                        onChange={(page, pageSize) => {
                            setCurrentPage(page);
                            setPageSize(pageSize);
                        }}
                        className="mt-4"
                    />
                </>
            )}
        </Content>
    );
};

export default Books;