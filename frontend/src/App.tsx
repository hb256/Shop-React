import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Counter from "./components/Counter";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { useReducer, useState } from "react";

import { Toaster } from "react-hot-toast";

import { cartReducer } from "./reducers/cartReducer";

function App() {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="grid grid-cols-3 place-items-center">
        <a href="#">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <h2>Counter - React + Vite + Axios</h2>
        <a href="#">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="flex flex-row h-48">
        <ProductList cartDispatch={cartDispatch} />
        <div className="divider vertical" />
        <Cart state={cartState} dispatch={cartDispatch} />
      </div>
    </>
  );
}

export default App;
