import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Footer from './Footer.js';
import AppRoutes from './routes.js';
import "./styles/index.css";
import { BrowserRouter} from 'react-router-dom';

function Greeting() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Greeting />
  </BrowserRouter>
);
