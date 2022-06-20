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
				}
			]
		}		
	}

	render() {
		return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					<SearchBar />
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} />
						<Playlist />
					</div>
				</div>
			</div>
		);
	}
  
}

export default App;
