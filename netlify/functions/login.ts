// Packages
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Local Imports
import loginHandler from '../../src/handlers/development/login';
import { createRequestFromEvent, MockResponse } from '../../src/helpers/netlify-adapter';

/**
 * Returns Spotify authorization link. Development use only — get your refresh token here.
 * Visit: http://localhost:8888/api/login
 */
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const req = createRequestFromEvent(event);
  const res = new MockResponse();

  await loginHandler(req, res);
  return res.toNetlifyResponse();
};
