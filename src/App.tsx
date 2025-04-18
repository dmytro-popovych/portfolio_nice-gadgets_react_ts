import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container">
      <div className="App">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="App__container">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};
