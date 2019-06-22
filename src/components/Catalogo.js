import React from 'react';
import axios from 'axios';
import Detalle from './Detalle.js';
import '../css/catalogo.css';

class Catalogo extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        items: [],
        show: true,
        count: 0,
        detalle: {}
      }
      this.loadItems();
  }

  loadItems(){
    axios.get('https://nextu-62bed.firebaseio.com/productos/.json')
      .then(response => {
        for (let index = 0; index < response.data.length; index++) {
          response.data[index].number = 1;
        }
        this.setState({items: response.data});
    });
  }

  listItems() {
    let items = this.state.items;
    return (
      <ul className="catalogo">
        {
          items.map((item) => {
            return (
              <li className="item">
                <img className="item-img" src={`../assets/${item.imagen}`} alt="" />
                <label className="item-title">{item.nombre}</label>
                <dl>
                  <dt>Precio:</dt>
                  <dd>${item.precio}</dd>
                </dl>
                <dl>
                  <dt>Unidades disponibles:</dt>
                  <dd>{item.stock}</dd>
                </dl>
                <div className="item-buttons">
                  <button onClick={this.showDetails.bind(this, item.nombre, item.imagen, item.precio, item.stock)} className="btn blue darken-2 no-padding" type="button" name="mas">Ver más</button>
                  <button className="btn yellow darken-2 no-padding" onClick={this.alCarrito.bind(this,item.number,item.nombre)} type="button" name="agregar">Añadir</button>
                  <input className="item-buttons-number" onChange={this.updateNumber.bind(this, item.nombre)} type="number" name="numero" value={item.number} />
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  }

  updateNumber(nombre, e){
    e.preventDefault();
    let newItems = this.state.items;
    for (var i in newItems) {
      if (newItems[i].nombre === nombre) {
          newItems[i].number=e.target.value;
          this.setState({items: newItems});
          break;
      }
    }    
  }

  showDetails(nombre, imagen, precio, stock, e) {
    this.setState({
      show: false,
      detalle: {
        nombre: nombre,
        imagen: imagen,
        precio: precio, 
        stock: stock
      }
    });
  }

  alCarrito(cantidad, nombre){
    let items = this.state.items;
    let stock;
    let index;
    let carroJson = [];
    for (var i in items) {
       if (items[i].nombre === nombre) {
           stock = Number(items[i].stock);
           index = Number(i);
       }
    }

    if (stock>0 && cantidad<=stock){
      let obj = carroJson.filter(c => c.nombre.toLowerCase().includes(nombre.toLowerCase()))
      if (Object.keys(obj).length > 0){
        let nuevaCantidad = Number(cantidad) + Number(obj[0].cantidad);
        for (var i in carroJson) {
           if (carroJson[i].nombre === nombre) {
               carroJson[i].cantidad = nuevaCantidad;
           }
        }
      }
      else{
        let json = {nombre: nombre, cantidad: Number(cantidad)};
        carroJson.push(json);
      }
      items[index].stock = stock - cantidad;
      this.props.addCount(cantidad);
    }
  }

  render(){
    let content;

    if (this.state.show) {
      content=<div className="card white">
        <div className="card-content">
          <span className="card-title gray-text text-lighten-2">Catálogo de productos</span>
          <div className="buscar-box">
            <label className="buscar-box-label">¿Qué estás buscando?</label>
            <input id="buscar" type="text" name="buscar" placeholder="Buscar producto" />
          </div>
          <hr />

          { this.listItems() }

        </div>
      </div>;
    }
    else {
      content=<div><Detalle nombre={this.state.detalle.nombre} stock={this.state.detalle.stock} imagen={this.state.detalle.imagen} precio={this.state.detalle.precio}/></div>;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Catalogo;
