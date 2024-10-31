const usersModel = require("../models/users.model");
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateTokens');
const hashPassowrd = require("../utils/hashPassword");

class UserService {
    async create(userData) {
        const { email } = userData;
        let user = await usersModel.findOne({ email });
        if (user) {
            throw new Error("User Exists")
        }
        try {
            const hashedPassword = await hashPassowrd(userData.password)
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

            return {
                token,
                user: {
                    email
                }
            }
        } catch (error) {
            throw new Error(`Cannot sign in with the provided credentials ${error}`)
        }
    }

    async updateUserInfo(userId, userData) {
        try {
            const hashedPassword = await hashPassowrd(userData.password)
            const updatedUser = await usersModel.findByIdAndUpdate(userId, { ...userData, password: hashedPassword });
            updatedUser.save()
            return updatedUser;

        } catch (error) {
            throw new Error(`Could not update user info ${error}`)
        }
    }

}

module.exports = new UserService(); 