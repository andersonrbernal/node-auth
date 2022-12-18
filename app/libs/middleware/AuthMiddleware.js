const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const secret = 'secret key';

function requireAuth(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('login');
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect('login');
    }
}

async function checkUser(req, res, next) {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };