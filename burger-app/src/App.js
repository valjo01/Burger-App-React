import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers (states)/BurgerBuilder/BurgerBuilder';
import BurgerIngredient from './components/Burger/BurgerIngredient/BurgerIngredient';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <BurgerIngredient />
        </Layout>
      </div>
    );
  }
}

export default App;
