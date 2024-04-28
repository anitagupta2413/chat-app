const jwt = require('jsonwebtoken');
const secretKey = 'anitagupta2413'

const setJwtToken = ( id , email ) => {
    const payload = { id , email }
    return jwt.sign(payload , secretKey)
}

module.exports = {
    setJwtToken,
}