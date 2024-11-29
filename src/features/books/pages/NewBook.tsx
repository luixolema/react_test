import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, DatePicker, Form, Input, message} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from "moment";

const NewBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        setLoading(true);
        // Simulate an API request to create a new book
        setTimeout(() => {
            console.log("New book details:", values);
            message.success("Book created successfully!");
            setLoading(false);
            form.resetFields();
        }, 5000); // Simulate a 1-second delay
    };

    const [form] = Form.useForm();

    return (
        <div className="max-w-2xl mx-auto p-4 relative">
            <Button
                type="primary"
                icon={<ArrowLeftOutlined/>}
                onClick={() => navigate(-1)}
                className="mb-4"
            >
                Back
            </Button>
            <h1 className="text-2xl font-bold mb-4">New Book</h1>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    publishDate: moment()
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
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewBook;