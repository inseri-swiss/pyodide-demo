importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.1/full/pyodide.js");

printOnConsole = (msg) => {
    self.postMessage({kind: "LOG", res: msg})
}

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
    stdout: printOnConsole
  });

  await self.pyodide.loadPackage(["matplotlib"])
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