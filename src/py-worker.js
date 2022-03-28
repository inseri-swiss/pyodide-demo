importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.1/full/pyodide.js");

const my_module = {
    foo: 42,
    bar: [1,2,3,4,5,6]
}

printOnConsole = (msg) => {
    self.postMessage({kind: "LOG", res: msg})
}

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
    stdout: printOnConsole
  });

  await self.pyodide.loadPackage(["matplotlib"])
  
  
  self.pyodide.registerJsModule("my_module", my_module)
  
  const jsObj = new Map([
    ['country', 'Chile'],
    ['name', 'Tom'],
  ])
  self.pyodide.globals.set("moo", self.pyodide.toPy(jsObj))
}

let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  await pyodideReadyPromise;
  const { python, ...context } = event.data;

  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }

  try {
    await self.pyodide.loadPackagesFromImports(python);
    let results = await self.pyodide.runPython(python);
    self.postMessage({ kind: "RESULT", res: results });
  } catch (error) {
    self.postMessage({ kind: "ERROR", res: error.message });
  }
};