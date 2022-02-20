## Setting up the Spotify Web API
To get access to the Spotify Web API we need to create an example APP in https://developer.spotify.com/dashboard/

Once you created an APP, click on APP's *Edit Settings* button and add a *Redirect URI* `http://localhost:3000`, then create a file named `.env` in the project top level with the following content:
```
REACT_APP_SPOTIFY_CLIENT_ID=<YOUR_APP_CLIENT_ID>
REACT_APP_AUTHORIZE_URL=https://accounts.spotify.com/authorize
REACT_APP_REDIRECT_URI=http://localhost:3000
```

Paste the Client ID from the Spotify APP we just created.
