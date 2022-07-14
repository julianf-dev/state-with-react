import  { Component } from 'react'

export class UseClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error:false,
    };
  }


  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escriba el código de seguridad.</p>
        {this.state.error && (
          <p>Error: el código esta incorrecto</p>
        )}
        <input type='text' placeholder='código de seguridad'/>
        <button onClick={() => this.setState({ error: !this.state.error })}>Comprobar</button>
      </div>
    )
  }
}