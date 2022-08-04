const initialState = {
	word: '',
	loading: false,
	error: false,
	deleted: false,
	confirmed: false,
};

/* Primera forma */
export const useReducer = (state, action) => {
	if (action.type === 'ERROR') {
		return {
			...state,
			error: true,
			loading: false,
		};
	} else if (action.tpye === 'CHECK') {
		return {
			...state,
			loading: true,
		};
	}
	// Return por default
	else {
		return {
			...state,
		};
	}
};

/* 2. Esta es la forma más popular */
export const useReducerSwitch = (state, action) => {
	switch (action.type) {
		case 'ERROR':
			return {
				...state,
				error: true,
				loading: false,
			};
		case 'CHECK':
			return {
				...state,
				loading: true,
			};
		default:
			return {
				...state,
			};
	}
};

/* 3. Forma */
/* Dividimos nuestro reducer en dos */
export const reducerObject = state => ({
	ERROR: { ...state, error: true, loading: false },
	CHECK: {
		...state,
		loading: true,
	},
});

export const reducer = (state, action) => {
	return reducerObject(state)?.[action.type] || state;
};

reducer(initialState);
