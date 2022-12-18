const User = require('../models/User');
const jwt = require('jsonwebtoken'); 

const maxAge = 3 * 24 * 60 * 60; // 3 days

function handleErrors(err) {
    let errors = { 
        email: "",
        password: ""
    };

    // duplicate error code
    const emailIsNotUnique = err.code === 11000;
    if (emailIsNotUnique) {
        errors.email = 'This e-mail already exists in our database';
        return errors;
    }

    // incorrect email or password
    const emailIsIncorrect = err.message === 'Incorrect Email.';
    if (emailIsIncorrect) {
        errors.email = "That email is not registered."
        return errors;
    }
    const passwordIsIncorrect = err.message === 'Incorrect password.';
    if (passwordIsIncorrect) {
        errors.password = "That password is incorrect.";
        return errors;
    }
    
    // validation errors
    const userValidationFailed = err.message.includes('User validation failed');
    if (userValidationFailed) {
        const valuesOfErrors = Object.values(err.errors);
        valuesOfErrors.forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    } 

    return errors;
}

function createToken(id) {
    const secret = 'Ti5qx6EfQ@z2EWae&3fSOOCu5whCFBgU5Tnmv3$VrRO$yDL*I%';
    const opt = {
        expiresIn: maxAge
    };
    
    return jwt.sign({ id }, secret, opt);
}

class AuthController {

    static signup_get(req, res) {
        res.render('signup');
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
        res.render('login');
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
}

module.exports = { AuthController };