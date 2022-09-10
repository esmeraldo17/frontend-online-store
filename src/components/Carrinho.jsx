import React, { Component } from 'react';
import { getItem, setItem } from '../services/api';

class Carrinho extends Component {
  state = {
    lista: [],
  };

  componentDidMount() {
    this.setState({
      lista: getItem('produtos') || [],
    }, this.arrayFilter);
  }

  removeProduct = (obj) => {
    const { lista } = this.state;
    const arrayFilter = lista.filter((e) => e.id !== obj.id);
    this.setState({
      lista: arrayFilter,
    });
    setItem('produtos', arrayFilter);
  };

  decreaseUnity = (obj) => {
    const { lista } = this.state;
    let findElement = lista.find((e) => e.id === obj.id);
    if (findElement.quantidade > 1) {
      console.log('alou');
      const arrFilter = lista.filter((e) => e.id !== obj.id);
      console.log(arrFilter);
      const quantiAnterior = findElement.quantidade;
      console.log(quantiAnterior);
      this.setState({ lista: [...arrFilter,
        findElement = { ...obj, quantidade: quantiAnterior - 1 }] });
      setItem('produtos', [...arrFilter,
        findElement = { ...obj, quantidade: quantiAnterior - 1 }]);
    }
  };

  acrescentUnit = (obj) => {
    const { lista } = this.state;
    let findElement = lista.find((e) => e.id === obj.id);
    const arrFilter = lista.filter((e) => e.id !== obj.id);
    const quantiAnterior = findElement.quantidade;
    this.setState({ lista: [...arrFilter,
      findElement = { ...obj, quantidade: quantiAnterior + 1 }] });
    setItem('produtos', [...arrFilter,
      findElement = { ...obj, quantidade: quantiAnterior + 1 }]);
  };

  render() {
    const { lista } = this.state;
    return (
      <div>
        {
          lista.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          )
            : (
              lista.map((e, index) => (
                <div
                  key={ `${e.id} ${index}` }
                >
                  <h4 data-testid="shopping-cart-product-name">{e.title}</h4>
                  <p>{e.price}</p>
                  <p data-testid="shopping-cart-product-quantity">
                    {
                      e.quantidade
                    }
                  </p>
                  <button
                    onClick={ () => this.removeProduct(e) }
                    data-testid="remove-product"
                    type="button"
                  >
                    Excluir
                  </button>

                  <button
                    onClick={ () => this.decreaseUnity(e) }
                    data-testid="product-decrease-quantity"
                    type="button"
                  >
                    -
                  </button>

                  <button
                    onClick={ () => this.acrescentUnit(e) }
                    data-testid="product-increase-quantity"
                    type="button"
                  >
                    +
                  </button>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

export default Carrinho;
