// Packages
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Local Imports
import authHandler from '../../src/handlers/development/auth';
import { createRequestFromEvent, MockResponse } from '../../src/helpers/netlify-adapter';

/**
 * Spotify OAuth callback — exchanges auth code for refresh token. Development use only.
 * This is the redirect_uri registered on Spotify Developer Dashboard.
 */
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const req = createRequestFromEvent(event);
  const res = new MockResponse();

  await authHandler(req, res);
  return res.toNetlifyResponse();
};
