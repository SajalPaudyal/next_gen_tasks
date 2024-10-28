const userService = require("../../service/user.service");

class UserController {
    async createUser(req, res) {
        try {
            const {email, password} = req.body;
            const newUser = await userService.create(req.body)
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: newUser
            });
        } catch (error) {
            res.status(500).json({error: error.message});

        }
    }

    async signInUser(req, res) {
        try {

            const {token, user} = await userService.signIn(req.body)
            return res.status(201).json({
                success: true,
                message: 'Sign in successful',
                token,
                user
            })
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


}

module.exports = UserController;