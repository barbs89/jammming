import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchResults: [
				{
					id: 1,
					name: 'Running Up That Hill',
					artist: 'Placebo',
					album: 'Covers'
				}, 
				{
					id: 2,
					name: 'Summer of 69',
					artist: 'Bryan Adams',
					album: '18 til I die'
				},
				{
					id: 3,
					name: 'I Belong to You',
					artist: 'Jacob Lee',
					album: 'Wedding'
				}, 
				{
					id: 4,
					name: 'All of Me',
					artist: 'John Legend',
					album: 'Romantic Album'
				}
			],
			playListName: 'defaultName',
			playListTracks: [
				{
					id: 1,
					name: 'Running Up That Hill',
					artist: 'Placebo',
					album: 'Covers'
				}, 
				{
					id: 2,
					name: 'Summer of 69',
					artist: 'Bryan Adams',
					album: '18 til I die'
				}
			]
		}
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		
	}

	addTrack(track) {
		let tracks = this.state.playListTracks;
		if (tracks.find(savedTrack => savedTrack.id === track.id)) {
			return;
		}
		this.setState({ playListTracks: [...tracks, track] });
	}

	removeTrack(track) {
		let tracks = this.state.playListTracks;
		tracks = tracks.filter(savedTrack => savedTrack.id !== track.id);
		this.setState({ playListTracks: tracks });
	}

	updatePlaylistName(name) {
		this.setState({ playListName: name });
	}

	savePlaylist() {
		const trackURIs = this.state.playListTracks(track => track.uri);
	}

	render() {
		return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					<SearchBar />
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
						<Playlist playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
					</div>
				</div>
			</div>
		);
	}
  
}

export default App;
