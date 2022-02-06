import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Slider from "./features/slider/Slider";

function App() {
  const [percentage, setPercentage] = useState(0);

  const onChange = (e: any) => {
    setPercentage(e.target.value);
  };

  return (
    <div className="app-container">
      <Slider percentage={percentage} onChange={onChange}></Slider>
    </div>
  );
}

export default App;
