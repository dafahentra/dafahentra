import express from 'express';
import serverless from 'serverless-http';

// Import handlers
import spotifyNowPlayingHandler from '../../src/handlers/spotify/now-playing';
import spotifyTopPlayedHandler from '../../src/handlers/spotify/top-played';
import githubSkillsHandler from '../../src/handlers/general/skills';
import developmentAuthHandler from '../../src/handlers/development/auth';
import developmentLoginHandler from '../../src/handlers/development/login';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.get('/api/now-playing', spotifyNowPlayingHandler);
app.get('/api/top-played', spotifyTopPlayedHandler);
app.get('/api/skills', githubSkillsHandler);
app.get('/api/auth', developmentAuthHandler);
app.get('/api/login', developmentLoginHandler);

export const handler = serverless(app);
