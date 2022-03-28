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
    
    if(data?.kind == "RESULT"){
      setOutput(data?.res)
    }
    else {
      setStdout(`${data?.res}\n${stdout}`)
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <textarea name="Text1" value={code} onChange={event => setCode(event.target.value)} />
        <br/>
        <button onClick={()=>runPy(code)}>Run Code</button>
        
        <br/>
        <span>Code Output</span>
        <div className='code'>{output}</div>
        
        <br/>
        <span>Console</span>
        <div className='code'>{stdout}</div>
        
      </header>
    </div>
  );
}

export default App;
