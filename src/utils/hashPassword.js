const bcrypt  =require('bcrypt');

function hashPassowrd(password){
    const saltRound = 10;
    const hashedPassword = bcrypt.hash(password, saltRound);
    return hashedPassword;
}

module.exports = hashPassowrd;