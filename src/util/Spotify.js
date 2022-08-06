const CLIENT_ID = '18f4b311ad9e44ab9966f05c340c64b9';
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
	search(term) {
		console.log('here')
		const accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then(response => {
			response.json()
		}).then(jsonResponse => {
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
		});
	},
	savePlaylist(name, trackUris) {
		if (!name || !trackUris.length) {
			return;
		}
		const accessToken = Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${accessToken}`};
		let userId;

		return fetch('https://api.spotify.com/v1/me', { 
			headers: headers
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			userId = jsonResponse.id;
			return fetch(`https://api.spotify.com//v1/users/${userId}/playlists`, {
				headers: headers,
				method: 'POST',
				body: JSON.stringify({ name: name })
			}).then(response => {
				return response.json()
			}).then(jsonResponse => {
				const playlistID = jsonResponse.id;
				return fetch(`https://api.spotify.com//v1/users/${userId}/playlists/${playlistID}/tracks`, {
					header: headers,
					method: 'POST',
					body: JSON.stringify({ uris: trackUris})
				})
			})
		})

	}
};

export default Spotify;