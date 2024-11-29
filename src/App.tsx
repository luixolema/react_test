import './App.css'
import {MainLayout} from "./components/Layout.tsx";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "react-oidc-context";
import {Spin} from "antd";

function App() {
    const auth = useAuth();

    if (!auth.isLoading && !auth.isAuthenticated) {
        auth.signinRedirect();
        return;
    }

    if (auth.isLoading) {
        return <div className="flex justify-center items-center h-screen w-screen">
            <Spin size="large"/>
        </div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <>
                <BrowserRouter>
                    <MainLayout></MainLayout>
                </BrowserRouter>
            </>
        )
    }
}


export default App
