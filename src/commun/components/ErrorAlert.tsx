import {Alert} from "antd";

export const ErrorAlert = ({message}: { message: string }) => {
    return (
        <div className="text-center mt-20 flex justify-center">
            <Alert className="max-w-4xl" message="Error"
                   description={message}
                   type="error" showIcon/>
        </div>
    )
};