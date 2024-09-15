export const awsConfig = {
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID, // AWS Cognito User Pool ID
  clientId: process.env.REACT_APP_COGNITO_CLIENT_ID, // AWS Cognito App Client ID
  region: 'ap-northeast-2', // AWS 리전 설정
};
