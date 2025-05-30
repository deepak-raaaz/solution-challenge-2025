import { isAuthenticate } from '../middleware/auth';
import express from 'express';
import { createPlaylist, getPlaylistById, publishPlaylist } from '../controllers/playlists.controller';

const playlistsRouter = express.Router();

playlistsRouter.post('/create-playlist', isAuthenticate, createPlaylist);

// playlistsRouter.get('/playlists', isAuthenticate, getPlaylist);
playlistsRouter.get('/playlists/:playlistId', isAuthenticate, getPlaylistById);


playlistsRouter.put('/publish-playlist/:playlistId', isAuthenticate, publishPlaylist);




export default playlistsRouter;