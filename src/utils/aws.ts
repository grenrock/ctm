import { CognitoIdentityServiceProvider } from 'aws-sdk';

const options = {
  region: process.env.FOXDALE_AWS_REGION,
  accessKeyId: process.env.FOXDALE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.FOXDALE_AWS_SECRET_ACCESS_KEY,
};

export function getCognitoService() {
  return new CognitoIdentityServiceProvider(options);
}
