import React, { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LayoutView from './components/layout/layout';

const App: FC = () => {
  useEffect(() => {
    document.title = 'Beneficiaries App';
  })

  return (
    <BrowserRouter>
      <LayoutView />
    </BrowserRouter>
  );
};

export default App;