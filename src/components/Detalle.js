import React from 'react';
import Catalogo from './Catalogo.js';
import '../css/detalle.css';

class Detalle extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        nombre: this.props.nombre,
        show: true,
        precio: this.props.precio,
        stock: this.props.stock,
        imagen: this.props.imagen
      }
  }

  showCatalog() {
    this.setState({
      show: false
    });
  }

  render(){
    let nombre=this.state.nombre;
    let precio=this.state.precio;
    let stock=this.state.stock;
    let imagen=this.state.imagen;
    let content;

    if (this.state.show) {
      content=<div class="card white">
        <div class="card-content">
          <span class="card-title gray-text text-lighten-2">{nombre}</span>
          <hr/>
          <div class="row main">
            <div class="col m5">
              <img class="img-detalle" src={`../assets/${imagen}`} />
            </div>
            <div class="col m7">
              <dl>
                <dt>Precio:</dt>
                <dd>${precio}</dd>
                <dt>Unidades Disponibles:</dt>
                <dd>{stock}</dd>
              </dl>
              <button onClick={this.showCatalog.bind(this)} class="btn grey lighten-5 black-text text-darken-2 back-detalle" type="button">Atrás</button>
            </div>
          </div>
        </div>
      </div>;
    }
    else {
      content=<div><Catalogo/></div>;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Detalle;
