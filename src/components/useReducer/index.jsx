import { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'paradigma';

const initialState = {
	word: '',
	loading: false,
	error: false,
	deleted: false,
	confirmed: false,
};

const reducerObject = state => ({
	ERROR: { ...state, error: true, loading: false },
	CHECK: {
		...state,
		loading: true,
	},
	CONFIRM: {
		...state,
		error: false,
		confirmed: true,
		loading: false,
	},
});

const reducer = (state, action) => {
	return reducerObject(state)?.[action.type] || state;
};

/* Component */
export function UseReducer({ name }) {
	/* Por convencion se usa el dispatch */
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('Ready effect');

		if (state.loading) {
			setTimeout(() => {
				console.log('Haciendo validación');
				state.word === SECURITY_CODE
					? dispatch({ type: 'CONFIRM' })
					: dispatch({ type: 'ERROR' });
			}, 2000);
		}

		console.log('Finish effect');
	}, [state.loading]); 

	const handleConfirm = () => {
		dispatch({ type: 'CONFIRM' })
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
