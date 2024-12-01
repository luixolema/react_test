import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "react-oidc-context";
import {cognitoAuthConfig} from "./commun/cognitoConfig.ts";
import {Provider} from "react-redux";
import {store} from "./commun/redux/store.ts";
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AuthProvider {...cognitoAuthConfig}>
                <App/>
            </AuthProvider>
        </Provider>
    </StrictMode>
)