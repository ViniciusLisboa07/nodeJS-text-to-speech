const path =  require('path');

module.exports = {
    entry:'./src/dev/index.js',
    output: {
        filename:'script.js',
        path:path.resolve(__dirname, 'src/dist/js')        
    },
    mode: 'development',
    resolve: {
        fallback: {
            "child_process": false
        }
    },
    target:"web",
    node: { 
        global     : false,
        __filename : false,
        __dirname  : false,
        // fs: "empty", // if unable to resolve "fs"
    },
    externals: {
        child_process: 'require("child_process")',
        fs: "require('fs')",
        os: "require('os')",
        path: "require('path')"
    },    
}