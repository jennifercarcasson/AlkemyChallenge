import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import React, { useEffect, useState } from "react";

const API_KEY = "299e713eb7ac4bd69b22d690acfeb5c4";
export const AppContext = React.createContext();

function App() {
  let isAuth = false;
  const [menu, setMenu] = useState([]);
  const [dishesQuantity, setDishesQuantity] = useState({
    vegan: 0,
    noVegan: 0,
    maxVegan: 2,
    maxNoVegan: 2,
  });
  //mirar localstorage
  const getAuth = () => {
    return localStorage.getItem("token") ? true : false;
  };

  return (
    <AppContext.Provider
      value={{
        API_KEY,
        isAuth,
        menu,
        setMenu,
        dishesQuantity,
        setDishesQuantity,
      }}
    >
      <div className="App">
        <Router>
          <Header />
          <Routes>
            {getAuth() && <Route path="/" element={<Home />} />}
            {getAuth() && <Route path="/search" element={<Search />} />}
            {!getAuth() && (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
