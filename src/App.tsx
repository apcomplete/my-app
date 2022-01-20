import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import GenericsExample from './GenericsExample';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>TypeScript Examples</h1>
        <Routes>
          <Route path="/generics" element={<GenericsExample />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
