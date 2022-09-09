import React, { Component } from 'react';
import { getItem } from '../services/api';

class Carrinho extends Component {
  state = {
    lista: [],
    listaFiltrada: [],
  };

  componentDidMount() {
    this.setState({
      lista: getItem('produtos') || [],
    }, this.arrayFilter);
  }

  arrayFilter = () => {
    const { lista } = this.state;
    const arrayFiltrado = [];
    lista.forEach((e) => {
      if (!arrayFiltrado.some((e2) => e2.id === e.id)) {
        return arrayFiltrado.push(e);
      }
    });
    this.setState({
      listaFiltrada: arrayFiltrado,
    });
    console.log(arrayFiltrado);
  };

  render() {
    const { lista, listaFiltrada } = this.state;
    return (
      <div>
        {
          lista.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          )
            : (
              listaFiltrada.map((e) => (
                <div
                  key={ e.id }
                >
                  <h4 data-testid="shopping-cart-product-name">{e.title}</h4>
                  <p>{e.price}</p>
                  <p data-testid="shopping-cart-product-quantity">
                    {
                      lista.filter((e2) => e2.id === e.id).length
                    }
                  </p>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

export default Carrinho;
