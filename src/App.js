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
import React, { useState } from "react";

const API_KEY = "299e713eb7ac4bd69b22d690acfeb5c4";
export const AppContext = React.createContext();

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const [menu, setMenu] = useState([]);
  const [dishesQuantity, setDishesQuantity] = useState({
    vegan: 0,
    noVegan: 0,
    maxVegan: 2,
    maxNoVegan: 2,
  });
  console.log(menu);
  //mirar localstorage
  return (
    <AppContext.Provider
      value={{
        API_KEY,
        isAuth,
        setIsAuth,
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
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            {
              //isAuth && <Route path="/" element={<Home />} />
            }
            {
              //isAuth && <Route path="/search" element={<Search />} />
            }
            {
              //!isAuth && <Route path="*" element={<Navigate to="/login" />} />
            }
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
