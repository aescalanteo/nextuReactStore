import React from 'react';
import '../css/store.css';
import BarraSuperior from './BarraSuperior';
import Catalogo from './Catalogo';

class Store extends React.Component{
  constructor(props){
      super(props);
      document.body.classList.remove("bg-login");
      document.body.classList.add("bg-main");
      this.state = {
        count: 0
      };
  }

  addCount = (number) => {    
    this.setState(state => ({ count: state.count+number }));
    console.log(this.state.count)
  };

  render(){
    return (
      <div className="container">
        <div className="row main">
          <BarraSuperior addCount={this.addCount} count={this.state.count}></BarraSuperior>
          <div className="row">
              <div className="col m12">
                  <Catalogo addCount={this.addCount} cartCount={this.state.count}></Catalogo>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Store;
