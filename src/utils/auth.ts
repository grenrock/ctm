import { serialize } from 'cookie';

type AuthRawData = {
  uid: string;
  sid: string;
  refresh: string;
};

type AuthCookieObject = {
  value: string;
  options: {
    maxAge: number;
  };
};

export type AuthObject = {
  sid: AuthCookieObject;
  uid: AuthCookieObject;
  refresh: AuthCookieObject;
};

export async function createAuthObject(data: AuthRawData) {
  const authObject: AuthObject = {
    uid: {
      value: data.uid || '',
      options: {
        maxAge: 2592000,
      },
    },
    sid: {
      value: data.sid || '',
      options: {
        maxAge: 3600,
      },
    },

    refresh: {
      value: data.refresh || '',
      options: {
        maxAge: 2592000,
      },
    },
  };
  return authObject;
}

export function createCookieArray(
  authObject: AuthObject,
  host: string | undefined,
) {
  let domain: string;
  if (!host) {
    domain = 'communityteammanagement.com';
  } else if (host.includes('dev-communityteammanagement.com')) {
    domain = 'dev-communityteammanagement.com';
  } else if (host.includes('localhost')) {
    domain = 'localhost';
  } else {
    domain = 'communityteammanagement.com';
  }
  const cookieArray = [];
  const options = {
    domain: domain,
  };
  for (const key of Object.keys(authObject) as (keyof AuthObject)[]) {
    cookieArray.push(
      serialize(key, authObject[key].value, {
        ...options,
        ...authObject[key].options,
      }),
    );
  }
  return cookieArray;
}
