import {useNavigate, useParams} from "react-router-dom";
import {Button, DatePicker, Form, Input, message, Modal, Spin} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from "moment";
import {PATHS} from "../../../commun/routes.tsx";
import {EditBookDto, useEditBookMutation, useGetBookDetailsQuery, useRemoveBookMutation} from "../redux/booksApi.ts";


const EditBook = () => {
    const {id} = useParams<{ id: string }>();
    const {data, isFetching} = useGetBookDetailsQuery(id!);
    const navigate = useNavigate();
    const [edit, {isLoading}] = useEditBookMutation();
    const [remove] = useRemoveBookMutation();

    const onFinish = (values: EditBookDto) => {
        edit(values).then((response) => {
            if (response.error) {
                message.error("Book updated failed, please try again");
            } else {
                message.success("Book updated successfully!");
            }
        });
    };

    const deleteBook = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this book?',
            onOk: () => {
                remove(id!).then((response) => {
                    if (response.error) {
                        message.error("Book deleted failed, please try again");
                    } else {
                        message.success("Book deleted successfully!");
                        navigate(PATHS.books);
                    }
                });
            }
        });
    };

    if (!isFetching && !data) {
        return <div className="text-center mt-20">Book not found</div>;
    }

    if (isFetching) {
        return <div className="flex justify-center items-center h-full">
            <Spin size="large"/>
        </div>;
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
                    title: data!.title,
                    author: data!.author,
                    publishDate: moment(data!.publishDate),
                    description: data!.description
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="_id"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>
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
                    <Button type="primary" htmlType="submit" loading={isLoading}>
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