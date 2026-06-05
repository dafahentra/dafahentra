// Packages
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Local Imports
import spotifyTopPlayedHandler from '../../src/handlers/spotify/top-played';
import { createRequestFromEvent, MockResponse } from '../../src/helpers/netlify-adapter';
import { ERROR_MESSAGE_500 } from '../../src/config';

/**
 * Returns an SVG image displaying top five played tracks across three time ranges.
 */
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const req = createRequestFromEvent(event);
  const res = new MockResponse();

  try {
    await spotifyTopPlayedHandler(req, res);
    return res.toNetlifyResponse();
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: ERROR_MESSAGE_500,
    };
  }
};
