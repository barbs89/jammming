import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props) {
		super(props)
		this.renderAction = this.renderAction.bind(this);
	}

	renderAction() {
		if (this.props.isRemoval) {
			return <button className="Track-action" onClick=''>-</button>
		} else {
			return <button className="Track-action" onClick=''>+</button>
		}
	}

	render() {
		const { name, artist, album } = this.props.track;
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{name}</h3>
					<p>{artist} | {album}</p>
				</div>
				{ this.renderAction() }
			</div>
		)
	}
}

export default Track