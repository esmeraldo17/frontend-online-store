import React, { Component } from 'react';

class Carrinho extends Component {
  state = {
    lista: [],
  };

  render() {
    const { lista } = this.state;
    return (
      <div>
        {
          lista.length === 0 && (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          )
        }
      </div>
    );
  }
}

export default Carrinho;
