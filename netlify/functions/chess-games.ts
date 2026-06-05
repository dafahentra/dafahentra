// Packages
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Local Imports
import chessGamesHandler from '../../src/handlers/chess/games';
import { createRequestFromEvent, MockResponse } from '../../src/helpers/netlify-adapter';
import { ERROR_MESSAGE_500 } from '../../src/config';

/**
 * Returns an SVG image displaying three current Chess.com games.
 */
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const req = createRequestFromEvent(event);
  const res = new MockResponse();

  try {
    await chessGamesHandler(req, res);
    return res.toNetlifyResponse();
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: ERROR_MESSAGE_500,
    };
  }
};
