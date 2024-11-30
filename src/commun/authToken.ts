import {UserManager, WebStorageStateStore} from 'oidc-client-ts';
import {cognitoAuthConfig} from "./cognitoConfig.ts";

const userManager = new UserManager({
    authority: cognitoAuthConfig.authority,
    client_id: cognitoAuthConfig.client_id,
    redirect_uri: cognitoAuthConfig.redirect_uri,
    response_type: cognitoAuthConfig.response_type,
    scope: cognitoAuthConfig.scope,
    post_logout_redirect_uri: cognitoAuthConfig.post_logout_redirect_uri,
    userStore: new WebStorageStateStore({store: window.sessionStorage})
});

export const getToken = async () => {
    const user = await userManager.getUser();
    return user?.id_token;
};