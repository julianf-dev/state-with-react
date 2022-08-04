import { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'paradigma';

/* Component */
/* Declarative Code */
export function UseReducer({ name }) {
	/* Por convencion se usa el dispatch */
	const [state, dispatch] = useReducer(reducer, initialState);

	/* Action creators */
	const onConfirm = () => dispatch({ type: actionTypes.confirm });

	const onError = () => dispatch({ type: actionTypes.error });

	const onCheck = () => dispatch({ type: actionTypes.check });

	const onDelete = () => dispatch({ type: actionTypes.delete });

	const onReset = () => dispatch({ type: actionTypes.reset });

	const onWrite = ({ target: { value } }) => {
		dispatch({ type: actionTypes.write, payload: value });
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
	}, [state.loading]);

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
					onChange={onWrite}
					value={state.word}
				/>
				<button onClick={onCheck}>Check word</button>
			</div>
		);
	} else if (!state.deleted && state.confirmed) {
		return (
			<>
				<h2>{renderTitle(state.confirmed, state.deleted, name)}</h2>

				<p>¿Seguro quieres eliminar el UseState</p>
				<div>
					<button onClick={onDelete}>Si, eliminar</button>
					<button onClick={onReset}>No, volver</button>
				</div>
			</>
		);
	} else {
		return (
			<>
				<h2>{renderTitle(state.confirmed, state.deleted, name)}</h2>

				<p>Eliminado con éxito</p>
				<button onClick={onReset}>Resetear, volver atras</button>
			</>
		);
	}
}

const initialState = {
	word: '',
	loading: false,
	error: false,
	deleted: false,
	confirmed: false,
};

const actionTypes = {
	confirm: 'CONFIRM',
	error: 'ERROR',
	delete: 'DELETE',
	reset: 'RESET',
	check: 'CHECK',
	write: 'WRITE',
};

const reducerObject = (state, payload) => ({
	[actionTypes.error]: { ...state, error: true, loading: false },
	[actionTypes.check]: {
		...state,
		loading: true,
	},
	[actionTypes.confirm]: {
		...state,
		error: false,
		confirmed: true,
		loading: false,
	},
	[actionTypes.delete]: {
		...state,
		deleted: true,
	},
	[actionTypes.reset]: {
		...state,
		confirmed: false,
		deleted: false,
		word: '',
	},
	[actionTypes.write]: {
		...state,
		word: payload,
	},
});

const reducer = (state, action) => {
	return reducerObject(state, action.payload)?.[action.type] || state;
};
