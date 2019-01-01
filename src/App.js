import React, { Component } from 'react';
import './App.css';

const NOT_CONCATENABLE = ["+", "-", "x", "/", "."];

const ADD = -1;
const SUBTRACT = -2;
const MULTIPLY = -3;
const DIVIDE = -4;
const EQUALS = -5;
const CLEAR = -6;
const DECIMAL = -7;

const isANumber = (button) => { 
  if (button > -1) {
    return true;
  } else {
    return false;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      formula: ''
    };

    this.calculate = this.calculate.bind(this);
    this.canConcatOperator = this.canConcatOperator.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getInitialFormula = this.getInitialFormula.bind(this);
  }

  calculate() {
    let display = "";
    let formula = this.state.formula;
    if (!this.canConcatOperator()) {
      formula = formula.slice(0, -1);
    }
    let result = 0;
    // operation logic
    

    formula += "=" + result;
    display = result;
    // array has this structure -> [newDisplay, newFormula]
    return [display, formula];
  }

  canConcatOperator() {
    let lastChar = this.state.display[this.state.display.length - 1];
    let canConcatenate = NOT_CONCATENABLE.filter(symbol => lastChar === symbol).length === 0;
    return canConcatenate;
  }

  handleClick(button) {
    let newDisplay = (this.state.display === "0" && isANumber(button)) ? "" : this.state.display;
    let newFormula = this.getInitialFormula(button);
    switch(button) {
      case(ADD):
        if (this.canConcatOperator()) {
          newDisplay = "+";
          newFormula += "+";
        }
        break;
      case(SUBTRACT):
        if (this.canConcatOperator()) {
          newDisplay = "-";
          newFormula += "-";
        }
        break;
      case(MULTIPLY):
        if (this.canConcatOperator()) {
          newDisplay = "x";
          newFormula += "x";
        }
        break;
      case(DIVIDE):
        if (this.canConcatOperator()) {
          newDisplay = "/";
          newFormula += "/";
        }
        break;
      case(EQUALS):
        let result = this.calculate();
        newDisplay = result[0];
        newFormula = result[1];
        break;
      case(CLEAR):
        newDisplay = "0";
        newFormula = "";
        break;
      default:
        this.canConcatOperator() ? newDisplay += button : newDisplay = button;
        newFormula += button;
    }
    this.setState({ display: newDisplay, formula: newFormula });
  }

  getInitialFormula(button) {
    if (this.state.formula === "") {
      if (isANumber(button)) {
        return "";
      } else {
        return "0";
      }
    } else {
      return this.state.formula;;
    }
  }

  render() {
    return (
      <div id="app">
        <div id="equals" onClick={ () => this.handleClick(EQUALS) }>=</div>
        <div id="zero" onClick={ () => this.handleClick(0) } className={"number"}>0</div>
        <div id="one" onClick={ () => this.handleClick(1) } className={"number"}>1</div>
        <div id="two" onClick={ () => this.handleClick(2) } className={"number"}>2</div>
        <div id="three" onClick={ () => this.handleClick(3) } className={"number"}>3</div>
        <div id="four" onClick={ () => this.handleClick(4) } className={"number"}>4</div>
        <div id="five" onClick={ () => this.handleClick(5) } className={"number"}>5</div>
        <div id="six" onClick={ () => this.handleClick(6) } className={"number"}>6</div>
        <div id="seven" onClick={ () => this.handleClick(7) } className={"number"}>7</div>
        <div id="eight" onClick={ () => this.handleClick(8) } className={"number"}>8</div>
        <div id="nine" onClick={ () => this.handleClick(9) } className={"number"}>9</div>
        <div id="add" onClick={ () => this.handleClick(ADD) } className={"operation"}>+</div>
        <div id="subtract" onClick={ () => this.handleClick(SUBTRACT) } className={"operation"}>-</div>
        <div id="multiply" onClick={ () => this.handleClick(MULTIPLY) } className={"operation"}>X</div>
        <div id="divide" onClick={ () => this.handleClick(DIVIDE) } className={"operation"}>/</div>
        <div id="decimal" onClick={ () => this.handleClick(DECIMAL) } className={"number"}>.</div>
        <div id="clear" onClick={ () => this.handleClick(CLEAR) }>AC</div>
        <div id="formula">{ this.state.formula }</div>
        <div id="display">{ this.state.display }</div>
      </div>
    );
  }
}

export default App;
