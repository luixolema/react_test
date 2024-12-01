export const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_7cZzhT6km",
    client_id: "600m7hk2lq863u060haaq23m5f",
    redirect_uri: "http://localhost:3000/loginRedirect",
    response_type: "code",
    cognitoDomain: 'https://us-east-17czzht6km.auth.us-east-1.amazoncognito.com',
    scope: "phone openid email",
    post_logout_redirect_uri: "http://localhost:3000",
    revokeTokenTypes: ["refresh_token"],
    automaticSilentRenew: false
};