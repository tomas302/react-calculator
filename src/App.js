/* eslint no-eval: 0 */
import React, { Component } from 'react';
import './App.css';

//const MAX_LENGTH = 36;
const NOT_CONCATENABLE = ["+", "-", "x", "/", "."];
const OPERATORS = ["+", "-", "x", "/"];

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
      formula: '',
      resultCalculated: false
    };

    this.calculate = this.calculate.bind(this);
    this.canConcatOperator = this.canConcatOperator.bind(this);
    this.canConcatDecimal = this.canConcatDecimal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getInitialFormula = this.getInitialFormula.bind(this);
  }

  calculate() {
    let display = "";
    let formula = this.state.formula;
    if (!this.canConcatOperator()) {
      formula = formula.slice(0, -1);
    }
    let result = eval(formula.replace("x", "*"));
    formula += "=" + result;
    display = result;
    this.setState({ resultCalculated: true });
    // array has this structure -> [newDisplay, newFormula]
    return [display, formula];
  }

  canConcatOperator() {
    let lastChar = this.state.display[this.state.display.length - 1];
    let canConcatenate = !OPERATORS.includes(lastChar);
    return canConcatenate;
  }

  // returns true if can add decimal point and if it needs to add a zero before it
  canConcatDecimal() {
    let lastOperator = "";
    let addZero = true;
    let formula = this.state.formula;
    console.log(formula.length);
    for (var i = formula.length - 1; i >= 0; i--) {
      if (NOT_CONCATENABLE.includes(formula[i])) {
        if (formula[i] === ".") {
          lastOperator = ".";
          break;
        }
        break;
      } else {
        addZero = false;
      }
    }
    if (formula.length === 0) {
      addZero = false;
    }
    if (lastOperator === ".") {
      return [false, addZero];
    }
    return [true, addZero];
  }


  handleClick(button) {
    let newDisplay = (this.state.display === "0" && isANumber(button)) ? "" : this.state.display;
    let newFormula = this.getInitialFormula(button);
    if (this.state.resultCalculated && button !== EQUALS) {
      this.setState({ resultCalculated: false });
      if (button >= 0) {
        newDisplay = "";
        newFormula = "";
      } else {
        let lastResult = newFormula.split("=")[1];
        newDisplay = lastResult;
        newFormula = lastResult;
      }
    }
    switch(button) {
      case(ADD):
        newDisplay = "+";
        if (this.canConcatOperator()) {
          newFormula += "+";
        } else {
          newFormula = newFormula.slice(0, -1) + "+";
        }
        break;
      case(SUBTRACT):
        newDisplay = "-";
        if (this.canConcatOperator()) {
          newFormula += "-";
        } else {
          newFormula = newFormula.slice(0, -1) + "-";
        }
        break;
      case(MULTIPLY):
        newDisplay = "x";
        if (this.canConcatOperator()) {
          newFormula += "x";
        } else {
          newFormula = newFormula.slice(0, -1) + "x";
        }
        break;
      case(DIVIDE):
        newDisplay = "/";
        if (this.canConcatOperator()) {
          newFormula += "/";
        } else {
          newFormula = newFormula.slice(0, -1) + "/";
        }
        break;
      case(DECIMAL):
        let canConcat = this.canConcatDecimal();
        if (canConcat[0]) {
          let decimalToAdd = "";
          if (canConcat[1]) {
            decimalToAdd = "0.";
            newDisplay = "";
          } else {
            decimalToAdd = ".";
          }
          newDisplay += decimalToAdd;
          newFormula += decimalToAdd;
        }
        break;
      case(EQUALS):
        if (this.state.resultCalculated) break; 
        let result = this.calculate();
        newDisplay = result[0];
        newFormula = result[1];
        break;
      case(CLEAR):
        newDisplay = "0";
        newFormula = "";
        break;
      default:
        this.canConcatOperator() ? newDisplay += button.toString() : newDisplay = button;
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
      return this.state.formula;
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
