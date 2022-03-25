import logo from './logo.svg';
import './App.css';
import loadPyodide from 'loadPyodide'
import { useState } from 'react';

let pyodide = null

async function initPyodide() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
  });
};

function runPy(code, setOutput){
  if(pyodide){
    setOutput(pyodide.runPython(code))
  } else {
    setOutput("Not loaded")
  }
}
initPyodide();

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <textarea name="Text1" value={code} onChange={event => setCode(event.target.value)} cols="40" rows="5"/>
        <br/>
        <button onClick={()=>runPy(code, setOutput)}>Run Code</button>
        <br/>
        <div>{output}</div>
      </header>
    </div>
  );
}

export default App;
