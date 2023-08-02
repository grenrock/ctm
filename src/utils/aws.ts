import { CognitoIdentityServiceProvider, SES } from 'aws-sdk';

const options = {
  region: process.env.CTM_AWS_REGION,
  accessKeyId: process.env.CTM_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.CTM_AWS_SECRET_ACCESS_KEY,
};

export function getCognitoService() {
  return new CognitoIdentityServiceProvider(options);
}

export function getSesService() {
  return new SES(options);
}
