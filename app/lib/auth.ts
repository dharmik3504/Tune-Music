import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
let oauth2Client: OAuth2Client;

export function createOAuthClient(
  clientId: string,
  clientSecret: string,
  redirectUri: string
) {
  oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export function getOAuthClient() {
  if (!oauth2Client) {
    throw new Error(
      "OAuth2Client not initialized. Call createOAuthClient first."
    );
  }
  return oauth2Client;
}
