import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import Produto from './components/Produto';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Carrinho } />
          <Route exact path="/product/:id" component={ Produto } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
