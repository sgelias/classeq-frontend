import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from '../shared/components/Navbar/components/Navbar'


const Main = (props: any) => (
    <BrowserRouter>
        <div>
            <header className="header">
                <Route component={ Navbar } />
            </header>
        </div>
    </BrowserRouter>
)