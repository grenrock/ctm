import { jwtVerify, importJWK } from 'jose';

async function fetchKeys(userPoolId: string) {
  const res = await fetch(
    `https://cognito-idp.us-west-2.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
  );
  return res.json();
}

export type DecodedAccessToken = {
  username: string;
};

export async function decodeAccessToken(
  token: string,
): Promise<DecodedAccessToken> {
  /*
    Decode a Cognito access token.
  
    Return a JSON representation of the decoded token.
     */
  const jwk = await fetchKeys(process.env.CTM_USER_POOL_ID || '');

  const rsaPublicKey = await importJWK(jwk.keys[1], jwk.keys[1].alg);
  try {
    const { payload } = await jwtVerify(token || '', rsaPublicKey);
    if (payload.username && typeof payload.username === 'string') {
      return { username: payload.username };
    }
    return { username: '' };
  } catch (err) {
    return { username: '' };
  }
}
