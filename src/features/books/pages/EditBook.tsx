import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, DatePicker, Form, Input, message, Modal} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from "moment";
import {PATHS} from "../../../commun/routes.tsx";

interface Book {
    id: string;
    title: string;
    author: string;
    publishDate: string;
    description: string;
}

const EditBook = () => {
    const {id} = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate an API request to fetch book details
        setTimeout(() => {
            const fetchedBook: Book = {
                id: 'sadfasdf',
                title: `Book ${id}`,
                author: `Author ${id}`,
                publishDate: `2024-11-27`,
                description: `Description for Book ${id}`
            };
            setBook(fetchedBook);
            setLoading(false);
        }, 1000); // Simulate a 1-second delay
    }, [id]);

    const onFinish = (values: any) => {
        setLoading(true);
        // Simulate an API request to update book details
        setTimeout(() => {
            console.log("Updated book details:", values);
            message.success("Book updated successfully!");
            setLoading(false);
        }, 1000); // Simulate a 1-second delay
    };

    const deleteBook = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this book?',
            onOk: () => {
                setLoading(true);
                // Simulate an API request to delete the book
                setTimeout(() => {
                    console.log(`Book ${id} deleted`);
                    message.success("Book deleted successfully!");
                    setLoading(false);
                    navigate(PATHS.books);
                }, 1000); // Simulate a 1-second delay
            }
        });
    };

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
            <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
            <Form
                layout="vertical"
                initialValues={{
                    title: book.title,
                    author: book.author,
                    publishDate: moment(book.publishDate),
                    description: book.description
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{required: true, message: "Please input the book title!"}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Author"
                    name="author"
                    rules={[{required: true, message: "Please input the author!"}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Publish Date"
                    name="publishDate"
                    rules={[{required: true, message: "Please select the publish date!"}]}
                >
                    <DatePicker className="w-full"/>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                    <Button type="default" danger onClick={deleteBook} className="ml-2">
                        Delete
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditBook;