import { Component } from 'react';

export class Loading extends Component {

    /* Cuando no sea true desmontelo */
    componentWillUnmount() {
		console.log('ComponentWillUnont');
	}

	render() {
		return (
			<p>Loading</p>
		);
	}
}
