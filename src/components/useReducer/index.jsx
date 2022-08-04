import { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'paradigma';

/* Component */
/* Declarative Code */
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
					onChange={e => dispatch({ type: 'WRITE', payload: e.target.value })}
					value={state.word}
				/>
				<button
					onClick={() => dispatch( { type: 'CHECK' })}
				>
					Check word
				</button>
			</div>
		);
	} else if (!state.deleted && state.confirmed) {
		return (
			<>
				<h2>{renderTitle(state.confirmed, state.deleted, name)}</h2>

				<p>¿Seguro quieres eliminar el UseState</p>
				<div>
					<button onClick={() => dispatch({ type: 'DELETE' })}>
						Si, eliminar
					</button>
					<button onClick={() => dispatch({ type: 'RESET' })}>
						No, volver
					</button>
				</div>
			</>
		);
	} else {
		return (
			<>
				<h2>{renderTitle(state.confirmed, state.deleted, name)}</h2>

				<p>Eliminado con éxito</p>
				<button onClick={() => dispatch({ type: 'RESET' })}>
					Resetear, volver atras
				</button>
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

const reducerObject = (state, payload) => ({
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
	DELETE: {
		...state,
		deleted: true,
	},
	RESET: {
		...state,
		confirmed: false,
		deleted: false,
		word: '',
	},
	WRITE: {
		...state,
		word: payload,
	},
});

const reducer = (state, action) => {
	return reducerObject(state, action.payload)?.[action.type] || state;
};
