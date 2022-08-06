const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/";

let accessToken;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}
		//check for access token match
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);

			// Clears the access token and URL parameters
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			// redirect users to the following URL
			const accessUrl = 	`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
			window.location = accessUrl;
		}
	},
	async search(term) {
		const accessToken = Spotify.getAccessToken();
		const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		const jsonResponse = await response.json();
		if (!jsonResponse.tracks) {
			return [];
		}
		return jsonResponse.tracks.items.map(track => ({
			id: track.id,
			name: track.name,
			artist: track.artists[0].name,
			album: track.album.name,
			URI: track.uri
		}));
	}
};

export default Spotify;