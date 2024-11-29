import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../commun/routes.tsx";
import {Spin} from "antd";

const RedirectLoginPage = ({delay = 3000}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(PATHS.books);
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    return <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <div className="flex flex-col items-center">
                <Spin size="large"/>
                {/*TODO: get The user Name (if its available) and show it here as salutation*/}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Welcome! You're being redirected.
                </h2>
                <p className="text-sm text-gray-600">
                    You'll be on the homepage in just a few seconds...
                </p>
            </div>
        </div>
    </div>;
};

export default RedirectLoginPage;