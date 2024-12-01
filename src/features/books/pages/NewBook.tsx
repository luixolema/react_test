import {useNavigate} from "react-router-dom";
import {Button, DatePicker, Form, Input, message} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {CreateBookDto, useCreateBookMutation} from "../../../commun/redux/api.ts";

const NewBook = () => {
    const navigate = useNavigate();
    const [create, {isLoading}] = useCreateBookMutation();

    const onFinish = (values: CreateBookDto) => {
        create(values).then(() => {
            message.success("Book created successfully!");
            form.resetFields();
        });
    };

    const [form] = Form.useForm<CreateBookDto>();

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
                </Form.Item>
            </Form>
        </div>
    );
}

export default NewBook;