const usersModel = require("../models/users.model");
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateTokens')

class UserService {
    async create(userData) {
        try {
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRound);
            const user = new usersModel({ ...userData, password: hashedPassword });

            user.save();
            return user;

        } catch (error) {
            throw new Error(`Could not create new user ${error}`)
        }

    }

    async signIn(credentials) {
        try {
            const { email, password } = credentials;

            const user = await usersModel.findOne({ email })
            if (!user) {
                throw new Error(`Could not find the user with the email registered`)
            }
            const userPassword = await bcrypt.compare(password, user.password)
            if (!userPassword) {
                throw new Error(`Password does not match`)
            }
            const token = generateToken(user);

            return{
                user:{
                    email:user.email,
                    name: user.firstname + ' '+ user.lastname
                }
            }
        } catch (error) {
            throw new Error(`Cannot sign in with the provided credentials ${error}`)
        }
    }

}

module.exports = new UserService(); 