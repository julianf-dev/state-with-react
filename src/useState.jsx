import { useEffect, useState } from 'react';

export function UseState({ name }) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log('Ready effect');

		if(loading){
			setTimeout(() => {
				console.log("Haciendo validación");
				setLoading(false)
				console.log("Terminando validación");
			},2000)
		}
		
		console.log('Finish effect');
	},[loading])

	const handleState = () => {
		setError(prevState=>!prevState)
		setLoading(true)
	}
	return (
		<div>
			<h2>Eliminar {name}</h2>
			<p>Por favor, escriba el código de seguridad.</p>

			{error && <p>El código es es incorrecto</p>}
			{loading && <p>Cargando</p>}

			<input type='text' placeholder='código de seguridad' />
			<button
				onClick={handleState}
			>
				Comprobar
			</button>
		</div>
	);
}
