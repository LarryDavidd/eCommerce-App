import { config } from '@shared/api/config/config';

const { authUrl, clientId, clientSecret } = config;

const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

function getHeaders(encodedCredentials: string) {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${encodedCredentials}`
  };
}

const headers = getHeaders(encodedCredentials);

export async function revokingToken(access_token: string) {
  const query = `token=${access_token}&token_type_hint=access_token`;
  const url = `${authUrl}/oauth/token/revoke?${query}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify({})
    });
    const resOK = res.status >= 200 && res.status < 300;
    if (resOK) {
      return true;
    }

    throw new Error('revokingToken Not OK');
  } catch (error) {
    return error as Error;
  }
}
