import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categorias from './Categorias';
import { getItem, getProductsFromCategoryAndQuery, setItem } from '../services/api';

class Home extends Component {
  state = {
    lista: [],
    busca: '',
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  inputClick = async (e) => {
    const regXp = /\d+/gi;
    const test = regXp.test(e);
    let retornoApi = '';
    if (test) {
      retornoApi = await getProductsFromCategoryAndQuery(e);
    } else {
      retornoApi = await getProductsFromCategoryAndQuery('', e);
    }
    this.setState({
      lista: retornoApi.results,
    });
  };

  handleCategorie = async (id) => {
    const response = await getProductsFromCategoryAndQuery(id);
    this.setState({
      lista: response.results,
    });
  };

  handleProduct = async (id) => {
    const { history } = this.props;
    history.push(`/product/${id}`);
  };

  /*  addStorage = (obj) => {
    const sendItem = getItem('produtos') || [];
    const elemento = sendItem.map((e) => e.id === obj.id);
    const elemento = sendItem.map((e) => e.id === obj.id);
    console.log(elemento);
    if (elemento) {
      setItem('produtos', [...sendItem, { ...obj, quantidade: elemento.quantidade + 1 }]);
      setItem('produtos', [...sendItem, { ...obj, quantidade: elemento.quantidade + 1 }]);
    } else {
      setItem('produtos', [...sendItem, { ...obj, quantidade: 1 }]);
    }
  };
 */

  addStorage = (obj) => {
    const sendItem = getItem('produtos') || [];
    const elemento = sendItem.filter((e) => e.id === obj.id);
    let findElement = elemento.find((e) => e.id === obj.id);
    if (findElement) {
      const arrFilter = sendItem.filter((e) => e.id !== obj.id);
      const quantiAnterior = findElement.quantidade;
      setItem('produtos', [...arrFilter,
        findElement = { ...obj, quantidade: quantiAnterior + 1 }]);
    } else {
      setItem('produtos', [...sendItem, { ...obj, quantidade: 1 }]);
    }
  };

  render() {
    const { lista, busca } = this.state;
    return (
      <div>
        <input
          type="text"
          value={ busca }
          data-testid="query-input"
          onChange={ ({ target: { value } }) => this.setState({
            busca: value,
          }) }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => this.inputClick(busca) }
        >
          Buscar
        </button>
        {
          lista.length === 0 && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
        {
          lista.length === 0
            ? <p>Nenhum produto foi encontrado</p>
            : (
              lista.map((e) => (
                <div
                  key={ e.id }
                  data-testid="product"
                >
                  <p>{e.title}</p>
                  <p>{e.price}</p>
                  <img src={ e.thumbnail } alt={ e.title } />
                  <button
                    type="button"
                    data-testid="product-detail-link"
                    onClick={ () => this.handleProduct(e.id) }
                  >
                    Detalhes
                  </button>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.addStorage(e) }
                  >
                    Adicionar carrinho
                  </button>
                </div>
              ))
            )
        }
        <Categorias handleCategorie={ this.handleCategorie } />
        <input
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
        />
        {/* <Link to="/cart">Carrinho</Link> */}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
