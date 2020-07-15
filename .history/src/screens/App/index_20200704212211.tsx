import React from 'react';

import Navbar from './shared/components/Navbar/components';
import Main from './components/Main'


export default function App() {
  return (
    <div className="App">
      <Navbar toogleSidebar={ true }/>
      <Main />
    </div>
  );
};
