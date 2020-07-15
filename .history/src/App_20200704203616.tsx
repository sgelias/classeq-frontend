import React from 'react';
import './App.css';
import Navbar from './screens/App/shared/components/Navbar/components/Navbar';


export default function App() {
  return (
    <div className="App">
      <Navbar toogleSidebar={ true }/>
    </div>
  );
};
