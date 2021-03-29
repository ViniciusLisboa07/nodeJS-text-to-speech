const path =  require('path');

module.exports = {
    entry: {
        home: './src/dev/index.js',
        screen: './src/dev/screen.js',
        eletro: './src/dev/eletro.js',
        medicacao: './src/dev/medicacao.js',
        triagem: './src/dev/triagem.js'
    },
    output: {
        filename:'[name].js',
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