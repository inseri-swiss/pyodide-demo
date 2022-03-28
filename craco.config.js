const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    webpack: {
        alias: {},
        configure:{
            externals: { 
                loadPyodide: 'loadPyodide'
            },
        }
    },
    devServer: {
        open: false
    },
};