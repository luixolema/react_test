import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, message, Modal, Spin} from "antd";
import {ArrowLeftOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {PATHS} from "../../../commun/routes.tsx";
import {DatePipe} from "../../../commun/components/DatePipe.tsx";
import {
    useAddFavoritesMutation,
    useGetBookDetailsQuery,
    useRemoveBookMutation,
    useRemoveFavoritesMutation
} from "../../../commun/redux/api.ts";
import {ErrorAlert} from "../../../commun/components/ErrorAlert.tsx";

const BookDetails = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isFetching, error} = useGetBookDetailsQuery(id!);
    const [addFavorites] = useAddFavoritesMutation();
    const [removeFavorites] = useRemoveFavoritesMutation();
    const [remove] = useRemoveBookMutation();

    const toggleFavorite = () => {
        if (data?.favorite) {
            removeFavorites({bookIds: [data._id]});
        } else {
            addFavorites({bookIds: [data!._id]});
        }
    };

    const deleteBook = (id: string) => {
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

    if (error) {
        return <ErrorAlert message="An error occurred while fetching the book details."></ErrorAlert>
    }

    if (isFetching) {
        return <Spin size="large" className="flex justify-center items-center h-screen"/>;
    }

    if (!isFetching && !data) {
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
            {data && <Card className="shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        {data.title}
                        <Button
                            type="text"
                            icon={data.favorite ? <StarFilled className="text-yellow-500"/> : <StarOutlined/>}
                            onClick={toggleFavorite}
                        />
                    </h1>
                    <div>
                        <Button type="primary" onClick={() => navigate(PATHS.editBooks.replace(':id', data._id))}>
                            Edit
                        </Button>
                        <Button type="default" danger onClick={() => deleteBook(data._id)} className="ml-2">
                            Delete
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <span className="font-semibold">Author: </span>
                        <span>{data.author}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Publish Date: </span>
                        <span><DatePipe date={data.publishDate}/></span>
                    </div>
                    <div>
                        <span className="font-semibold">Description: </span>
                        <span>{data.description}</span>
                    </div>
                </div>
            </Card>}
        </div>
    );
};

export default BookDetails;