const { useState } = React
//-------------------------------------------------------------------------
const Buttons = ({result, setResult, resultMemory, setResultMemory}) => {
  //-----------------------------------------------------------------------
  const clearAll = () => {
    setResult("0");
    setResultMemory("");
  }
  //---------------------------------------------------------------------------
  const dlt = () => {
    setResult(prev => prev.slice(0, -1));
    setResultMemory(prev => prev.slice(0, -1));
  }
  //--------------------------------------------------------------------------
  const disNum = (v) => {
    if(/\d/.test(v)){
      if(resultMemory === ""){
        if(v === "0"){
          return;
        }
        setResult(v);
        setResultMemory(v);
        return;
      }
      if(/\*|-|\+|\//.test(result.slice(-1))){
        if(resultMemory.slice(-1) === "-" && !/\d/.test(resultMemory.slice(-2, -1))){
          setResult(prev => prev + v);
          setResultMemory(prev => prev + v);
          return;
        }
        setResult(v);
        setResultMemory(prev => prev + v);
        return;
      }
      if(resultMemory.includes("=")){
        setResultMemory(v);
        setResult(v);
        return;
      }
      setResult(prev => prev + v);
      setResultMemory(prev => prev + v);
    }
  }
  //-------------------------------------------------------------------------
  const disDes = (v) => {
    if(v === "." && !result.includes(".")){
      if(resultMemory === ""){
        setResult("0.");
        setResultMemory("0.");
        return;
      }
      if(/\d/.test(result.slice(-1))){
        setResult(prev => prev + v);
        setResultMemory(prev => prev + v);
      }
      if(/\*|-|\+|\//.test(result.slice(-1))){
        setResult("0.");
        setResultMemory(prev => prev + "0.");
      }
      
      if(resultMemory.includes("=")){
        setResultMemory(result);
        setResult("0.");
      }
    }
  }
  //--------------------------------------------------------------------------
  const disOpe = (v) => {
    if(/\*|-|\+|\//.test(v)){
      if(resultMemory.includes("=")){
        setResultMemory(result);
        setResult(v);
      }
      if(/\*|-|\+|\//.test(resultMemory.slice(-1))){
        if(/\*|-|\+|\//.test(resultMemory.slice(-2,  -1))){           
          setResult(prev => prev.replace(/..$/, v));
          setResultMemory(prev => prev.replace(/..$/, v));
          return;
        }
        if(v === "-"){
          setResult(v);
          setResultMemory(prev => prev + v);
          return;
        }
        if(!/\d/.test(resultMemory.slice(-2,  -1))){
          setResult(prev => prev.replace(/.$/, v));
          setResultMemory(prev => prev.replace(/.$/, v));
          return;
        }
      }
      if(resultMemory === ""){
        if(v === "-"){
          setResult(v);
          setResultMemory(v);
        }
        return;
      }
      if(/\d/.test(result)){
        setResult(v);
        setResultMemory(prev => prev + v);
        return;
      }
      if(result.slice(-1) === "."){
        setResult(v);
        setResultMemory(prev => prev + "0" + v);
        return;
      }
    }
  }
  //--------------------------------------------------------------------------
  const display = (value) => {
    if(/\d/.test(value)){
      disNum(value);
    }
    else if(/\*|-|\+|\//.test(value)){
      disOpe(value);
    }
    if(value === "."){
      disDes(value);
    }
  }
  //----------------------------------------------------------------------
  const calc = () => {
    let eq = eval(resultMemory);
    eq = eq.toString().slice(0, 11);
    setResultMemory(prev => prev + "=" + eq);
    setResult(eq)
  }
  //----------------------------------------------------------------------
  return(
  <>
    <button className="btn clear" id="clear" onClick={() => {clearAll();}}>AC</button>
    <button className="btn clear" id="delete" onClick={() => {dlt();}}>C</button>
    <button className="btn num" id="one" onClick={() => {display("1");}}>1</button>
    <button className="btn num" id="two" onClick={() => {display("2");}}>2</button>
    <button className="btn num" id="three" onClick={() => {display("3");}}>3</button>
    <button className="btn num" id="four" onClick={() => {display("4");}}>4</button>
    <button className="btn num" id="five" onClick={() => {display("5");}}>5</button>
    <button className="btn num" id="six" onClick={() => {display("6");}}>6</button>
    <button className="btn num" id="seven" onClick={() => {display("7");}}>7</button>
    <button className="btn num" id="eight" onClick={() => {display("8");}}>8</button>
    <button className="btn num" id="nine" onClick={() => {display("9");}}>9</button>
    <button className="btn num" id="zero" onClick={() => {display("0");}}>0</button>
    <button className="btn doa" id="divide" onClick={() => {display("/");}}>/</button>
    <button className="btn doa" id="multiply" onClick={() => {display("*");}}>*</button>
    <button className="btn doa" id="subtract" onClick={() => {display("-");}}>-</button>
    <button className="btn doa" id="add" onClick={() => {display("+");}}>+</button>
    <button className="btn equal" id="equals" onClick={() => {calc();}}>=</button>
    <button className="btn num" id="decimal" onClick={() => {display(".");}}>.</button>
  </>
  )
}

const App = () => {
  const [result, setResult] = useState("0");
  const [resultMemory, setResultMemory] = useState("");
  return(
  <>
      <div id="appWrapper">
        <div id="displayWrapper">
          <div id="memoryDisplay">{resultMemory}</div>
          <div id="display">{result}</div>
        </div>
        <Buttons result={result} resultMemory={resultMemory} setResult={setResult} setResultMemory={setResultMemory}/>
      </div>
  </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));