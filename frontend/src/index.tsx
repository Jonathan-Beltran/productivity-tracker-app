import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement= document.getElementById('root');
if (rootElement == null) {
    throw new Error('root element not found');

}
const root = ReactDom.createRoot(rootElement);
root.render(<App />);