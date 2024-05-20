import { useCostumerStore } from '@/entities/Costumer/store/costumerStore';

export interface TokenResponse {
  refresh_token?: string;
  access_token?: string;
}

async function fetcher(...args: Parameters<typeof fetch>): Promise<Response | Error> {
  const response = await fetch(...args);
  const clone = response.clone();
  const data: TokenResponse = await clone.json();

  if (data.access_token) useCostumerStore().userAccessToken = data.access_token;
  if (data.refresh_token) useCostumerStore().userRefreshToken = data.refresh_token;

  return response;
}

export default fetcher;
