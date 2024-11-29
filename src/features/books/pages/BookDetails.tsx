import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Modal, Spin} from "antd";
import {ArrowLeftOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {PATHS} from "../../../commun/routes.tsx";

interface Book {
    id: string;
    title: string;
    author: string;
    isFavorite: boolean;
    publishDate: string;
    description: string;
}

const BookDetails = () => {
    const {id} = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate an API request to fetch book details
        setTimeout(() => {
            const fetchedBook: Book = {
                id: `${id}`,
                title: `Book ${id}`,
                author: `Author ${id}`,
                isFavorite: false,
                publishDate: `2021-01-0`,
                description: `Description for Book ${id}`
            };
            setBook(fetchedBook);
            setLoading(false);
        }, 1000); // Simulate a 1-second delay
    }, [id]);

    const toggleFavorite = () => {
        if (book) {
            // Immediately update the UI
            setBook({...book, isFavorite: !book.isFavorite});

            // Simulate an API request to toggle favorite status
            setTimeout(() => {
                console.log(`Favorite status for book ${book.id} updated to ${!book.isFavorite}`);
            }, 1000); // Simulate a 1-second delay
        }
    };

    const deleteBook = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this book?',
            onOk: () => {
                setLoading(true);
                // Simulate an API request to delete the book
                setTimeout(() => {
                    console.log(`Book ${id} deleted`);
                    setLoading(false);
                    navigate(PATHS.books);
                }, 1000); // Simulate a 1-second delay
            }
        });
    };

    if (loading) {
        return <Spin size="large" className="flex justify-center items-center h-screen"/>;
    }

    if (!book) {
        return <div className="text-center mt-20">Book not found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Button
                type="primary"
                icon={<ArrowLeftOutlined/>}
                onClick={() => navigate(-1)}
                className="mb-4"
            >
                Back
            </Button>
            <Card className="shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        {book.title}
                        <Button
                            type="text"
                            icon={book.isFavorite ? <StarFilled className="text-yellow-500"/> : <StarOutlined/>}
                            onClick={toggleFavorite}
                        />
                    </h1>
                    <div>
                        <Button type="primary" onClick={() => navigate(PATHS.editBooks.replace(':id', book.id))}>
                            Edit
                        </Button>
                        <Button type="default" danger onClick={deleteBook} className="ml-2">
                            Delete
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <span className="font-semibold">Author: </span>
                        <span>{book.author}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Publish Date: </span>
                        <span>{book.publishDate}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Description: </span>
                        <span>{book.description}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BookDetails;