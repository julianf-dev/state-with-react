import React, { useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

export function UseState({ name }) {
	/* const [word, setWord] = useState('')
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	*/
	const [state, setState] = React.useState({
		word: '',
		loading: false,
		error: false,
		deleted: false,
		confirmed: false,
	});

	const onConfirm = () => {
		setState(prevState => ({
			...prevState,
			error: false,
			confirmed: true,
			loading: false,
		}));
	};

	const onError = () => {
		setState(prevState => ({
			...prevState,
			error: true,
			loading: false,
		}));
	};

	useEffect(() => {
		console.log('Ready effect');

		if (state.loading) {
			setTimeout(() => {
				console.log('Haciendo validación');
				state.word === SECURITY_CODE ? onConfirm() : onError();
			}, 2000);
		}

		console.log('Finish effect');
	}, [state.loading]); /* El componentWillMount seria la priemra carga */

	const handleConfirm = () => {
		// if(error) setError(false)
		// setLoading(true) // Con estados indepdientes
		setState({ ...state, loading: true });
	};

	const handleChange = e => {
		// setError(false)
		setState({
			...state,
			word: e.target.value,
		});
	};

	const handleDelete = () => {
		setState({
			...state,
			deleted: true,
		});
	};

	const handleComeBack = () => {
		setState({
			...state,
			word: '',
			deleted: false,
			confirmed: false,
		});
	};

	const renderTitle = (confirmed, deleted, name) => {
		if (!confirmed && !deleted) {
			return `Eliminar ${name}`;
		} else if (confirmed && !deleted) {
			return 'Confirm please';
		}
		return `${name} has been deleted`;
	};

	/* Tenemos diferentes maneras de relaizar un return con los if de JS y no solo de JSX */
	if (!state.deleted && !state.confirmed) {
		return (
			<div>
				<h2>{renderTitle(state.confirmed, state.deleted, name)}</h2>
				<p>Por favor, escriba el código de seguridad.</p>

				{state.error && !state.loading && <p>El código es es incorrecto</p>}
				{state.loading && <p>Cargando</p>}

				<input
					type='text'
					placeholder='código de seguridad'
					onChange={handleChange}
					value={state.word}
				/>
				<button onClick={handleConfirm}>Comprobar</button>
			</div>
		);
	} else if (state.confirmed && !state.deleted) {
		return (
			<>
				<h2>{renderTitle(state.confirmed, state.deleted, name)}</h2>

				<p>¿Seguro quieres eliminar el UseState</p>
				<div>
					<button onClick={handleDelete}>Si, eliminar</button>
					<button onClick={handleComeBack}>No, volver</button>
				</div>
			</>
		);
	} else {
		return (
			<>
				<h2>{renderTitle(state.confirmed, state.deleted, name)}</h2>

				<p>Eliminado con éxito</p>
				<button onClick={handleComeBack}>Resetear, volver atras</button>
			</>
		);
	}
}
