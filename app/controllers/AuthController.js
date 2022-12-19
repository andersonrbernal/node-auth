const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const { handleErrors } = require('../libs/utilities/handleErrors');
const { secret } = require('../helpers/config');

const maxAge = 3 * 24 * 60 * 60; // 3 days

function createToken(id) {
    const opt = {
        expiresIn: maxAge
    };
    
    return jwt.sign({ id }, secret, opt);
}

class AuthController {

    static signup_get(req, res) {
        let variables = {
            title: 'Signup',
        };
        res.render('signup', variables);
    }

    static async signup_post(req, res) {

        const { email, password } = req.body;
        const data = { email, password };

        try {

            const user = await User.create(data);
            const token = createToken(user._id);
            const opt = {
                httpOnly: true,
                maxAge: maxAge * 1000
            };
            
            res.cookie('jwt', token, opt);
            res.status(201).json({ user: user._id });

        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
            
        }
    }

    static login_get(req, res) {
        let variables = {
            title: 'Login',
        };
        res.render('login', variables);
    }

    static async login_post(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);

            const opt = {
                httpOnly: true,
                maxAge: maxAge * 1000
            };

            res.cookie('jwt', token, opt);
            res.status(200).json({ user: user._id });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    static async logout_get(req, res) {
        res.cookie('jwt', "", { maxAge: 1 });
        res.redirect('login');
    }
}

module.exports = { AuthController };