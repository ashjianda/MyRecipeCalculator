import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Icon from './components/icon';
import Pantry from './pages/pantry';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Calculator from './pages/convert';
import OneClickSearch from './components/oneClick';
import Result from './pages/result';
import UserAction from './pages/userAction';
import SearchbarMain from './components/searchbar-main';
import SearchbarHeader from './components/searchbar-header';

function App() {
  const [authorized, setAuthorized] = useState(localStorage.getItem('authorized') === 'true');

  const handleLogout = () => {
    setAuthorized(false);
    localStorage.setItem('authorized', 'false');
  };

  return (
    <Router>
      <div>
        <div className="big-header">
          <Link className="big-header-home" to="/"><h1>MyRecipeCalculator</h1></Link>
          <SearchbarHeader />
          <div className="user-controls">
            {!authorized && (
              <div className="logged-out">
                <Link className="logged-out-option" to="/userAction" state={{ option: 'login' }}>Log In</Link>
                <span className="divider">|</span>
                <Link className="logged-out-option" to="/userAction" state={{ option: 'signup' }}>Sign Up</Link>
              </div>
            )}
            {authorized && (
              <div className="logged-in">
                <div class="profile-dropdown">
                  <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Profile
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item-profile" href="/cart">Shopping List</a></li>
                    <li><a class="dropdown-item-profile" href="/pantry">My Pantry</a></li>
                    <li><a class="dropdown-item-profile" href="/recipes">My Recipes</a></li>
                    <li><a class="dropdown-item-profile" href="/profile">Settings</a></li>
                    <li><a class="dropdown-item-profile" href="/" onClick={() => handleLogout()}>Log Out</a></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="header header-text">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link header-btn" to="/convert">Ingredient Converter</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link header-btn" to="/cart">Shopping List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link header-btn" to="/pantry">My Pantry</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link header-btn" to="/profile">My Recipes</Link>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <div className="carousel-container">
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="carousel-img" src={`${process.env.PUBLIC_URL}/corn.png`} alt="corn"></img>
                    </div>
                    <div className="carousel-item">
                      <img className="carousel-img" src={`${process.env.PUBLIC_URL}/potato.png`} alt="potato"></img>
                    </div>
                    <div className="carousel-item">
                      <img className="carousel-img" src={`${process.env.PUBLIC_URL}/chicken.png`} alt="chicken"></img>
                    </div>
                  </div>
                </div>
                <div className="carousel-overlay">
                  <div className="carousel-text">
                    <h2>MyRecipeCalculator</h2>
                    <p>Create shopping lists, add ingredients to your pantry, and find recipes!</p>
                  </div>
                </div>
              </div>

              <SearchbarMain />

              <div className="search-suggestions">
                <h1 style={{ fontWeight: 'bolder' }}>One-Click Search</h1>
                <p>Find fast recipes in a variety of categories</p>
                <OneClickSearch />
              </div>

              <div className="icon-bar-section">
                <div className="icon-container">
                  <div className="row icon-row">
                    <Icon src={`${process.env.PUBLIC_URL}/calculator.png`} alt="calculator" text="Ingredient Converter" to="/convert" />
                    <div className="icon-text">
                      <p>The Ingredient Converter is a calculator allowing you to convert between popular units, perfect for cooking and baking. Easily scale your recipes for different portions and see your conversions on the notepad.</p>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }} className="row icon-row">
                    <Icon src={`${process.env.PUBLIC_URL}/cart.png`} alt="shopping cart" text="Shopping List" to="/cart" />
                    <div className="icon-text">
                      <p>Add items you don't have to your shopping list. Must be signed in to your account to use.</p>
                    </div>
                  </div>
                  <div className="row icon-row">
                    <Icon src={`${process.env.PUBLIC_URL}/shelf.png`} alt="shelf" text="My Pantry" to="/pantry" />
                    <div className="icon-text">
                      <p>Add items you have to your pantry. Search for recipes with ingredients in your pantry. Must be signed in to your account to use.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer">
                <footer>
                  <p>Data retrieved from <a href="https://spoonacular.com/food-api" target='_blank' rel="noreferrer noopener">spoonacular.com</a></p>
                </footer>
              </div>
            </>
          } />
          <Route path="/convert" element={<Calculator />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/result" element={<Result authorized={authorized} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userAction" element={<UserAction setAuthorized={setAuthorized} authorized={authorized} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
