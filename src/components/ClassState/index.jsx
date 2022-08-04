import { Component } from 'react';
import { Loading } from '../Loading';

const SECURITY_CODE = 'paradigma';
export class UseClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			error: false,
			loading: false,
		};
	}

	/* En las clases tenemos metodos del ciclo de vida */
	/* Componenteantiguo (componenteWillMount) */

	/* 	UNSAFE_componentWillMount() {
		console.log('ComponentWillMont');
	} */

	/* 
  // Primera carga
  componentDidMount() {
		console.log('ComponentDidMount');
	} */

	componentDidUpdate() {
		console.log('Component Update');
		if (this.state.loading) {
			setTimeout(() => {
				console.log('Haciendo validación');
				if (this.state.value !== SECURITY_CODE) {
					this.setState({ error: true });
				} else {
					this.setState({ error: false });
				}
				this.setState({ loading: false });
				console.log('Terminando validación');
			}, 2000);
		}
	}

	render() {
		const { error, loading, value } = this.state;
		return (
			<div>
				<h2>Eliminar {this.props.name}</h2>
				<p>Por favor, escriba el código de seguridad.</p>
				{error && !loading && <p>Error: el código esta incorrecto</p>}
				{loading && <Loading />}
				<input
					type='text'
					placeholder='código de seguridad'
					onChange={e => {
						this.setState({ value: e.target.value });
					}}
					value={value}
				/>
				<button onClick={() => this.setState({ loading: true })}>
					Comprobar
				</button>
			</div>
		);
	}
}
