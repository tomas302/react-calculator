import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <a id="equals">=</a>
        <a id="zero" className={"number"}>0</a>
        <a id="one" className={"number"}>1</a>
        <a id="two" className={"number"}>2</a>
        <a id="three" className={"number"}>3</a>
        <a id="four" className={"number"}>4</a>
        <a id="five" className={"number"}>5</a>
        <a id="six" className={"number"}>6</a>
        <a id="seven" className={"number"}>7</a>
        <a id="eight" className={"number"}>8</a>
        <a id="nine" className={"number"}>9</a>
        <a id="add" className={"operation"}>+</a>
        <a id="subtract" className={"operation"}>-</a>
        <a id="multiply" className={"operation"}>X</a>
        <a id="divide" className={"operation"}>/</a>
        <a id="decimal" className={"number"}>.</a>
        <a id="clear">AC</a>
        <a id="display">DISPLAY</a>
      </div>
    );
  }
}

export default App;
