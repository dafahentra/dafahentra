// Packages
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Local Imports
import spotifyNowPlayingHandler from '../../src/handlers/spotify/now-playing';
import { createRequestFromEvent, MockResponse } from '../../src/helpers/netlify-adapter';
import { ERROR_MESSAGE_500 } from '../../src/config';

/**
 * Returns an SVG image displaying current Spotify playback state with music bars.
 */
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const req = createRequestFromEvent(event);
  const res = new MockResponse();

  try {
    await spotifyNowPlayingHandler(req, res);
    return res.toNetlifyResponse();
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: ERROR_MESSAGE_500,
    };
  }
};
