const userService = require("../../service/user.service");

class UserController {
    async createUser(req, res) {
        try {
            const newUser = await userService.create(req.body)
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: newUser,
            });
        } catch (error) {
            throw new Error(`Could not create a user`)

        }
    }

    async signInUser(req, res) {
        try {
            const { token, user } = await userService.signIn(req.body)
            return res.status(201).json({
                success: true,
                message: 'Sign in successful',
                token,
                user
            })
        } catch (error) {
            throw new Error(`Could not sign in the user`)
        }
    }


}

module.exports = UserController;