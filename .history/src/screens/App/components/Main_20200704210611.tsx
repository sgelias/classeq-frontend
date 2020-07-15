import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from '../shared/components/Navbar/components';
import './styles.js';


const Main = () => (
    <BrowserRouter>
        <div>
            <header className="header">
                <Route component={ Navbar } />
            </header>
            <div className="body py-5">
                Navigation route
            </div>
            <footer className="footer">
                Footer
            </footer>
        </div>
    </BrowserRouter>
)

export default Main;
