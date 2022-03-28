prototyping [Pyodide](https://github.com/pyodide/pyodide)

### open points
- [x] web worker
- [x] stdout
- [x] specific python version
    - cannot specify the version of python runtime
- [x] inject values from outside
- [x] introspect matplotlib
    - see comment in the [issue](https://github.com/inseri-swiss/inseri/issues/26)


#### inject js values
how to run in custom namespace [link](https://pyodide.org/en/stable/usage/faq.html#how-can-i-execute-code-in-a-custom-namespace)

```js
const my_module = {
    foo: 42,
    bar: [1,2,3,4,5,6]
}

self.pyodide.registerJsModule("my_module", my_module)

const jsObj = new Map([
    ['country', 'Chile'],
    ['name', 'Tom'],
])

self.pyodide.globals.set("moo", self.pyodide.toPy(jsObj))
```

```py
import my_module
print(my_module.foo)

print(moo)
print(type(moo))
```