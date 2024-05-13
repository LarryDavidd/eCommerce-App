const env = import.meta.env;

const projectKey = env.VITE_PROJECT_KEY;
const clientSecret = env.VITE_CLIENT_SECRET;
const clientId = env.VITE_CLIENT_ID;
const authUrl = env.VITE_AUTH_URL;
const apiUrl = env.VITE_API_URL;
const scopes = env.VITE_SCOPES;

export const config = {
  projectKey,
  clientId,
  clientSecret,
  apiUrl,
  authUrl,
  scopes
};
