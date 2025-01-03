import React from "react";
import "./App.css";
// import DisplayDagger from "./Components/DisplayDagger";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemShop from "./Components/ItemShop.tsx";

function App() {
  return (
    <div className="container p-4">
      <ItemShop />
    </div>
  );
}

export default App;
