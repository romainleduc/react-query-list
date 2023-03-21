import React from 'react';
import './App.css';
import ProductList from './ProductList';
import { QueryProvider } from 'rct-query-list';

const dataProvider = {
  getItems: (data) => data || [],
  getPaginationMeta: (data) => ({
    limit: data.limit,
    skip: data.skip || 0,
    total: data.total || 0,
  }),
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QueryProvider dataProvider={dataProvider}>
          <ProductList />
        </QueryProvider>
      </header>
    </div>
  );
}

export default App;
