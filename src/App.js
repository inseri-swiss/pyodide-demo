import './App.css';
import { useState } from 'react';

const pyodideWorker = new Worker(new URL('./py-worker.js', import.meta.url));

const runPy = (code) => {
  pyodideWorker.postMessage({
    python: code
  })
}

function App() {
  const [stdout, setStdout] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  pyodideWorker.onmessage = (event) => {
    const { data } = event;
    setOutput(data?.res)
  }

  return (
    <div className="App">
      <header className="App-header">
        <textarea name="Text1" value={code} onChange={event => setCode(event.target.value)} cols="80" rows="5"/>
        <br/>
        <button onClick={()=>runPy(code)}>Run Code</button>
        
        <br/>
        <span>Code Output</span>
        <div style={{border: "solid 1px #fff", height: "100px", width: "50%"}}>{output}</div>
        
        <br/>
        <span>Console</span>
        <div style={{border: "solid 1px #fff", height: "100px", width: "50%"}}>{stdout}</div>
        
      </header>
    </div>
  );
}

export default App;
