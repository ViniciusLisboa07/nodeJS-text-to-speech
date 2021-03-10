const { checkSchema } = require('express-validator');

module.exports = {
    signIn: checkSchema({
        name: {
            trim:true,
            errorMessage: 'Teste'
        }
    })
}