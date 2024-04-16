const jwt = require('jsonwebtoken');

async function generateToken( options, secretKey, expiresIn ){
    const { name, email, role } = options; 
    return new Promise(( resolve, reject ) => {
        try {
            const token = jwt.sign( { name, role, email }, secretKey, { expiresIn } );
            resolve(token);
        } catch (error){
            reject(error);
        }
    })
};

async function verifyToken( token, secretKey ){
    return new Promise(( resolve, reject ) => {
        jwt.verify( token, secretKey, ( err, user ) => {
            if(err) reject(err);
            resolve(user);
        })
    })
}

module.exports = { generateToken, verifyToken };