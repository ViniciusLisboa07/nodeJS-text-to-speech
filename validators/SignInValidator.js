const { checkSchema } = require('express-validator');

module.exports = {
    signIn: checkSchema({
        name: {
            notEmpty: true,
            trim: true,
            errorMessage: 'Teste'
        }
    })
}