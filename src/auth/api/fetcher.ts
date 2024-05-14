import { useLocalStorage } from '@/shared/lib/composables/useLocalStorage';

export interface TokenResponse {
  refresh_token?: string;
  access_token?: string;
}

async function fetcher(...args: Parameters<typeof fetch>): Promise<Response> {
  const response = await fetch(...args);
  const clone = response.clone();
  const data: TokenResponse = await clone.json();

  if (data.refresh_token) useLocalStorage().set('refresh_token', data.refresh_token);
  if (data.access_token) useLocalStorage().set('access_token', data.access_token);

  console.log(data);

  return response;
}

export default fetcher;
