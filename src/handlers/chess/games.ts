// Packages
import { renderToString } from 'react-dom/server';

// Local Imports
import {
  getPieces,
  convertGameObject,
  createEmptyGameObject,
} from '../../helpers/chess';
import { convertToImageResponse } from '../../helpers/image';
import { CurrentGames } from '../../components/chess/CurrentGames';
import api from '../../api';

// Types
import { IConvertedGameObject } from '../../types/chess';

/**
 * Returns an image displaying three current chess games from Chess.com.
 *
 * @param {any} req Request for image.
 * @param {any} res Response to request.
 */
export default async function (
  req: any,
  res: any,
) {
  const pieceImages: object = await getPieces();

  // Using an awesome library called chess-web-api to get our data ;)
  const {
    games = [],
  } = await api.chess.getCurrentGames();

  // Limiting the width of the games.
  games.length = Math.min(
    games.length,
    3,
  );

  // There's a lot of data we don't need! Converting the FEN to an array
  const convertedGames: IConvertedGameObject[] = await Promise.all([
    ...games.map(convertGameObject),
  ]);

  // Adding empty spots if there aren't 3!
  for (let i = convertedGames.length; i < 3; i++) {
    convertedGames.push(createEmptyGameObject());
  }

  // Hey! I'm returning an image!
  convertToImageResponse(res);

  // Generating the component and rendering it
  const text: string = renderToString(
    CurrentGames({
      games: convertedGames,
      pieceImages,
    }),
  );

  return res.send(text);
}
